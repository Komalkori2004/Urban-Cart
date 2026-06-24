
const slugify = require("slugify")
const productModel = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const asyncHandler = require("../middleware/asyncHandler");
const streamifier = require("streamifier")
const cloudinary = require("../config/cloudinary")
const userModel = require("../models/userModel")


// clondinary setting

const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "urbancart_products",
            },
            (error, result) => {
                if (error) {
                    reject(error)
                }
                else {
                    resolve(result)
                }
            }


        )
        streamifier.createReadStream(fileBuffer).pipe(stream)

    })

}

const createProduct = asyncHandler(async (req, res, next) => {
    const { name,
        description,
        price,
        category,
        brand,
        stock,
        shipping
    } = req.body


    if (!name || !description || !price || !category) {
        return next(
            new ErrorHandler(400, "please Provide all Required Fileds")
        )
    }

    const slug = slugify(name, {
        lower: true
    })

    const existingProduct = await productModel.findOne({ slug })

    if (existingProduct) {
        return next(
            new ErrorHandler(400, "Product Already Exists")
        )
    }
    // upload image

    const uploadedImages = []
    if (req.files && req.files.length > 0) {
        for (const file of req.files) {
            const result = await uploadToCloudinary(file.buffer)
            uploadedImages.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
    }
    const product = await productModel.create({
        name,
        slug,
        description,
        price,
        category,
        brand,
        stock,
        shipping,
        images: uploadedImages,
        createdBy: req.user._id

    })

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
    })
})

//   all product 

const getAllProduct = asyncHandler(async (req, res, next) => {
    const products = await productModel.find()

    res.status(200).json({
        success: true,
        products

    })

})
const getSingleProduct = asyncHandler(async (req, res, next) => {
    const product = await productModel.findOne({ slug: req.params.slug })

    if (!product) {
        return next(
            new ErrorHandler(404, "Product not Found")
        )
    }

    res.status(200).json({
        success: true,
        product
    })
})



// update products


const updateProducts = asyncHandler(async (req, res, next) => {
    const product = await productModel.findById(req.params.id)

    if (!product) {
        return next(
            new ErrorHandler(404, "Product not found")
        )
    }
    const { name, description, price, category, brand, stock, shipping } = req.body

    product.name = name || product.name
    product.description = description || product.description
    product.price = price || product.price
    product.category = category || product.category
    product.brand = brand || product.brand
    product.stock = stock || product.stock
    product.shipping = shipping || product.shipping

    if (name) {
        const newSlug = slugify(name, {
            lower: true
        })
        // check existing product with same slug
        const existingProduct = await productModel.findOne({
            slug: newSlug,
            _id: { $ne: product._id }
        })

        if (existingProduct) {
            return next(
                new ErrorHandler(400, "Product with this name already exists")
            )
        }

        product.slug = newSlug
    }

    if (req.files && req.files.length > 0) {
        // delete old images
        if (product.images && product.images.length > 0) {

            for (const image of product.images) {
                await cloudinary.uploader.destroy(image.public_id)
            }

        }

        const uploadedImages = []
        for (const file of req.files) {
            const result = await uploadToCloudinary(file.buffer)
            uploadedImages.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        product.images = uploadedImages
    }

    const updatedProduct = await product.save()
    res.status(200).json({
        success: true,
        message: "Product Updated Successfully",
        data: updatedProduct
    })
})

// delete product
const deleteProduct = asyncHandler(async (req, res, next) => {

    const product = await productModel.findById(req.params.id)

    if (!product) {
        return next(
            new ErrorHandler(404, "Product not found ")
        )
    }

    if (product.images && product.images.length > 0) {

        for (const image of product.images) {

            const deleteResult = await cloudinary.uploader.destroy(
                image.public_id
            )

            console.log(deleteResult)

        }
    }
    await product.deleteOne()
    res.status(200).json({
        success: true,
        message: "product deleted successfully"
    })
})



const getSingleProductById =
    asyncHandler(async (req, res, next) => {

        const product =
            await productModel.findById(
                req.params.id
            );



        if (!product) {

            return next(
                new ErrorHandler(
                    404,
                    "Product not found"
                )
            );
        }



        res.status(200).json({

            success: true,

            product
        });
    });



const CreateReview = asyncHandler(async (req, res, next) => {
    const { rating, comment } = req.body

    const product = await productModel.findById(req.params.id)
    const currentUser = await userModel.findById(
        req.user.id
    )

    if (!product) {
        return next(new ErrorHandler(404, "Product not found"))
    }

    const review = {
        user: currentUser._id,
        name: currentUser.name,
        rating: Number(rating),
        comment
    }

    const alreadyReviewed = product.reviews.find(
        (rev) => rev.user.toString() === currentUser._id.toString()
    )

    if (alreadyReviewed) {
        alreadyReviewed.rating = Number(rating)
        alreadyReviewed.comment = comment
    }
    else {
        product.reviews.push(review)
        product.numReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length
    await product.save()
    res.status(200).json({
        success: true,
        message: "Review added successfully"

    })
})





// 

const searchProducts = asyncHandler(async (req, res, next) => {
    const keyword = req.query.keyword || ""

    const product = await productModel.find({
        name: {
            $regex: keyword,
            $options: "i"
        }

    }).select("name images price").limit(10)
    res.status(200).json({
        success: true,
        product
    })
})

module.exports = { createProduct, getAllProduct, getSingleProduct, updateProducts, deleteProduct, getSingleProductById, CreateReview ,searchProducts}