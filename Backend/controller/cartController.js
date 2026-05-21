const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");

const addToCart = asyncHandler(async (req, res, next) => {

    const { productId, quantity } = req.body;

    const userId = req.user.id;

    // check product exists
    const product = await Product.findById(productId);

    if (!product) {
        return next(
            new ErrorHandler(404, "Product not found")
        );
    }

    // stock validation
    if (quantity > product.stock) {
        return next(
            new ErrorHandler(400, "Insufficient stock")
        );
    }

    // find cart
    let cart = await Cart.findOne({
        user: userId
    });

    // create cart if not exists
    if (!cart) {

        cart = await Cart.create({
            user: userId,
            items: []
        });

    }

    // check existing item
    const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
    );

    // update quantity
    if (existingItem) {

        const updatedQuantity =
            existingItem.quantity + quantity;

        if (updatedQuantity > product.stock) {
            return next(
                new ErrorHandler(400, "Insufficient stock")
            );
        }

        existingItem.quantity = updatedQuantity;

    } else {

        cart.items.push({
            product: productId,
            quantity
        });

    }

    // save cart
    await cart.save();

    // populate product details
    await cart.populate("items.product");

    res.status(200).json({
        success: true,
        message: "Item added to cart",
        data: cart
    });

});

//  get cart 


const getCart = asyncHandler(async (req, res, next) => {


    const userId = req.user.id

    const cart = await Cart.findOne({ user: userId }).populate("items.product")


    if (!cart) {
        return res.status(200).json({
            success: true,
            data: {
                items: []
            }
        });
    }

    res.status(200).json({
        success: true,
        items: cart.items
    })


})



























module.exports = {
    addToCart, getCart
};