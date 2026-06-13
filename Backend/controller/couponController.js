
const asyncHandler = require("../middleware/asyncHandler")
const ErrorHandler = require("../utils/errorHandler")
const Coupon = require("../models/couponModel")


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

    const existingCoupon=await Coupon.findOne({code:code.toUpperCase()})

    if(existingCoupon){
        return next(new ErrorHandler(400,"Coupon already exists"))
    }
    if(
    new Date(startDate) >=
    new Date(expiryDate)
){
    return next(
        new ErrorHandler(
            400,
            "Expiry date must be after start date"
        )
    )
}
if(discountValue <= 0){
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



// 
const getAllCoupons=asyncHandler(async(req,res,next)=>{


    const coupons=await Coupon.find().sort({createdAt:-1})
    res.status(200).json({
        success:true,
        coupons
    })
})

module.exports = { createCoupon,getAllCoupons }