const wishlistModel = require("../models/wishlistModel")
const productModel = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const asyncHandler = require("../middleware/asyncHandler")



const addToWishlist = asyncHandler(async (req, res, next) => {


    const { productId } = req.body
    let wishlist = await wishlistModel.findOne({ user: req.user.id })

    if (!wishlist) {
        wishlist = await wishlistModel.create({
            user: req.user.id,
            products: [productId]
        })
        
       return res.status(201).json({
            success: true,
            message: "Wishlist created",
            wishlist
        });
    }

    // return res.status(200).json({
    //     sucess: true,
    //     message: "Product added to wishlist",
    //     wishlist
    // })

    const alreadyExists = wishlist.products.some(
        (id) => id.toString() === productId
    );

    if (alreadyExists) {
        return next(
            new ErrorHandler(
                400, "Product already exists in wishlist"
               
            )
        );
    }

    wishlist.products.push(productId)
    await wishlist.save()

    return res.status(200).json({
        sucess: true,
        message: "Product added to wishlist",
        wishlist
    })


})






module.exports = { addToWishlist }