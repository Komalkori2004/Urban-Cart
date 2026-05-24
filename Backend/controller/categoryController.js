
const asyncHandler = require("../middleware/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const slugify = require("slugify")
const categoryModel = require("../models/categoryModel")




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

    const category = await categoryModel.create({
        name,
        slug: slugify(name)
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