
const cart = require("../models/cartModel")
const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const asyncHandler = require("../middleware/asyncHandler")
const ErrorHandler = require("../utils/errorHandler")

const placeOrder = asyncHandler(async (req, res, next) => {
    const userID = req.user.id

    const { shippingAddress, paymentMethod } = req.body

    const cartItems = await cart.findOne({ user: userID }).populate("items.product")

    if (!cartItems) {
        return next(new ErrorHandler(404, "Cart not found"))

    }

    if (!cartItems || cartItems.items.length === 0) {
        return next(new ErrorHandler(400, "Cart is empty"))
    }



    for (const item of cartItems.items) {
        const product = await Product.findById(item.product._id)

        if (!product) {
            return next(new ErrorHandler(404, `Product ${item.product._id} not found`))

        }

        if (item.quantity > product.stock) {
            return next(new ErrorHandler(400, `Product ${product.name} is out of stock`))

        }
    }



    const orderItems = cartItems.items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        image: item.product.images?.[0]?.url || "",
        price: item.product.price,
        quantity: item.quantity,
    }))



    const totalAmount = cartItems.items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity
    }, 0)


    const newOrder = await Order.create({
        user: userID,
        items: orderItems,
        shippingAddress,
        paymentMethod,
        totalAmount
    })


    for (const item of cartItems.items) {
        const product = await Product.findById(item.product._id)
        product.stock -= item.quantity
        await product.save()
    }

    cartItems.items = []
    await cartItems.save()
    res.status(200).json({
        success: true,
        message: "Order placed successfully",
        data: newOrder
    })

})

const getMyOrder = asyncHandler(async (req, res, next) => {
    const userID = req.user.id

    const orders = await Order.find({ user: userID }).sort({ createdAt: -1 })


    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
    })


})

const getOrderbyId = asyncHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id)

    if (!order) {
        next(new ErrorHandler(404, "Order not found"))
    }

    if (order.user.toString() !== req.user.id && req.user.role !== admin) {
        return next(new ErrorHandler(401, "not authorized to view this order"))

    }

    res.status(200).json({
        success: true,
        data: order
    })
})







module.exports = { placeOrder, getMyOrder, getOrderbyId }

