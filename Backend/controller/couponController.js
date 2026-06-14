
const asyncHandler = require("../middleware/asyncHandler")
const ErrorHandler = require("../utils/errorHandler")
const Coupon = require("../models/couponModel")

const Cart = require("../models/cartModel")
const Order = require("../models/orderModel")

const createCoupon = asyncHandler(async (req, res, next) => {


    const {
        code,
        discountType,
        discountValue,
        minimumOrderAmount,
        maximumDiscountAmount,
        startDate,
        expiryDate,
        usageLimit,
        applicableFor
    } = req.body;

    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() })

    if (existingCoupon) {
        return next(new ErrorHandler(400, "Coupon already exists"))
    }
    if (
        new Date(startDate) >=
        new Date(expiryDate)
    ) {
        return next(
            new ErrorHandler(
                400,
                "Expiry date must be after start date"
            )
        )
    }
    if (discountValue <= 0) {
        return next(
            new ErrorHandler(
                400,
                "Invalid discount value"
            )
        )
    }


    const coupon = await Coupon.create({
        code,
        discountType,
        discountValue,
        minimumOrderAmount,
        maximumDiscountAmount,
        startDate,
        expiryDate,
        usageLimit,
        applicableFor
    })
    res.status(201).json({
        success: true,
        message: "Coupon created successfully",
        coupon
    })
})



const updateCoupon = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const coupon = await Coupon.findById(id)
    if (!coupon) {
        return next(new ErrorHandler(404, "Coupon not found"))
    }
    const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.status(200).json({
        success: true,
        message: "Coupon updated successfully",
        updatedCoupon
    })
})


// 
const getAllCoupons = asyncHandler(async (req, res, next) => {


    const coupons = await Coupon.find().sort({ createdAt: -1 })
    res.status(200).json({
        success: true,
        count: coupons.length,
        coupons
    })
})



const deleteCoupon = asyncHandler(async (req, res, next) => {
    const coupon = await Coupon.findById(req.params.id)

    if (!coupon) {
        return next(new ErrorHandler(404, "Coupon not found"))
    }


    await coupon.deleteOne()
    res.status(200).json({
        success: true,
        message: "Coupon deleted successfully"

    })


})




const applyCoupon = asyncHandler(async (req, res, next) => {

    const { couponCode } = req.body


    if (!couponCode) {
        return next(new ErrorHandler(400, "Coupon code is required"))
    }

    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product")

    if (!cart || cart.items.length === 0) {
        return next(new ErrorHandler(400, "Cart is empty"))

    }

    const cartTotal = cart.items.reduce((total, item) => {
        return total + (
            item.product.price * item.quantity

        )

    }, 0)

    const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() })

    if (!coupon) {
        return next(new ErrorHandler(404, "Invalid coupon code"))
    }

    if (!coupon.isActive) {
        return next(new ErrorHandler(400, "Coupon is not active"))
    }

    const now = new Date()

 if(now < coupon.startDate){
    return next(
        new ErrorHandler(
            400,
            "Coupon is not active yet"
        )
    )
}

  if(now > coupon.expiryDate){
    return next(
        new ErrorHandler(
            400,
            "Coupon has expired"
        )
    )
}

    if(coupon.usedCount >= coupon.usageLimit){
        return next(new ErrorHandler(400, "Coupon usage limit exceeded"))
    }


    const alreadyUsed= coupon.usedBy.some((userId)=>
        userId.toString() === req.user.id)


    if(alreadyUsed){
        return next(new ErrorHandler(400, "You have already used this coupon"))
    
    }   
    

    if (
    coupon.applicableFor ===
    "first_order"
) {

    const totalOrders =
        await Order.countDocuments({
            user: req.user.id
        });

    if (totalOrders > 0) {
        return next(
            new ErrorHandler(
                400,
                "Coupon valid only for first order"
            )
        );
    }
}

if (
    cartTotal <
    coupon.minimumOrderAmount
) {
    return next(
        new ErrorHandler(
            400,
            `Minimum order amount should be ₹${coupon.minimumOrderAmount}`
        )
    );
}

return res.status(200).json({
    success: true,
    message: "Coupon validation passed"
})


})

module.exports = { createCoupon, getAllCoupons, updateCoupon, deleteCoupon, applyCoupon }