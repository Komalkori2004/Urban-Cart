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




const removeCart = asyncHandler(async (req, res, next) => {

    const userId = req.user.id

    const { productId } = req.params;
    const cart = await Cart.findOne({ user: userId })

    if (!cart) {
        return next(new ErrorHandler(404, "cart not found"))
    }


    cart.items = cart.items.filter(
        (item) =>
            item.product.toString() !== productId
    );

    await cart.save()

    await cart.populate("items.product")

    res.status(200).json({
        success: true,
        message: "Item removed from cart",
        data: cart
    })

})





const updateCart = asyncHandler(async (req, res, next) => {

    const { productId, action } = req.body

    const userId = req.user.id

    if (action !== "increase" && action !== "decrease") {
        return next(new ErrorHandler(400, "Invalid action"))
    }


    const cart = await Cart.findOne({ user: userId })

    if (!cart) {
        return next(new ErrorHandler(404, "Cart not found"))
    }


    const cartItem = cart.items.find((item) => item.product.toString() === productId)

    if (!cartItem) {
        return next(new ErrorHandler(404, "Cart item not found"))
    }

    const product = await Product.findById(productId)

    if (!product) {
        return next(new ErrorHandler(404, "Product not found"))
    }

    if (action === "increase") {
        if (cartItem.quantity >= product.stock) {
            return next(new ErrorHandler(400, "Insufficient stock"))
        }

        cartItem.quantity += 1
    }


    if (action === "decrease") {
        if (cartItem.quantity <= 1) {
            return next(new ErrorHandler(400, "Quantity cannot be less than 1"))
        }
        cartItem.quantity -= 1


    }

    await cart.save()
    await cart.populate("items.product")

    res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        data: cart
    })
})




module.exports = {
    addToCart, getCart, removeCart, updateCart
};