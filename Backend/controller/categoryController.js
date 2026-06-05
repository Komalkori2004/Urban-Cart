
const asyncHandler = require("../middleware/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const slugify = require("slugify")
const categoryModel = require("../models/categoryModel")
const streamifier = require("streamifier")
const cloudinary = require("../config/cloudinary")



const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "urbancart_categories"
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

const createCategory = asyncHandler(async (req, res, next) => {

    const { name } = req.body

    if (!name) {
        return next(
            new ErrorHandler(400, "Please Provide Category Name")
        )
    }

    const existCategory = await categoryModel.findOne({ name })

    if (existCategory) {
        return next(
            new ErrorHandler(400, "category alerady exists")
        )
    }

    let categoryImage = {}

    if (req.file) {

        const result = await uploadToCloudinary(
            req.file.buffer
        )

        categoryImage = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }



    const category = await categoryModel.create({
        name,
        slug: slugify(name),
            image: categoryImage
    })

    res.status(200).json({
        success: true,
        message: "category created successfully",
        category
    })

})

const getCategory = asyncHandler(async (req, res, next) => {
    const categories = await categoryModel.find()
    res.status(200).json({
        success: true,
        categories
    })
})


module.exports = {
    createCategory,
    getCategory
}