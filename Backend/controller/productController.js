
const slugify = require("slugify")
const productModel = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const asyncHandler = require("../middleware/asyncHandler");
const { create } = require("../models/userModel");



const createProduct = asyncHandler(async (req, res, next) => {
    const { name,
        description,
        price,
        category,
        brand,
        stock,
        shipping,
        images, } = req.body


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
    const product = await productModel.create({
        name,
        slug,
        description,
        price,
        category,
        brand,
        stock, shipping, images, createdBy: req.user._id

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


module.exports = { createProduct, getAllProduct , getSingleProduct}