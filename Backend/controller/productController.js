
const slugify = require("slugify")
const productModel = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const asyncHandler = require("../middleware/asyncHandler");
const streamifier = require("streamifier")
const cloudinary = require("../config/cloudinary")


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
        product,
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


module.exports = { createProduct, getAllProduct, getSingleProduct }