

const mongoose = require("mongoose")

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    discountType: {
        type: String,
        enum: ["percentage", "fixed"],
        required: true
    },
    discountValue: {
        type: Number,
        required: true
    },
    minimumOrderAmount: {
        type: Number,
        default: 0
    },
    maximumDiscountAmount: {
        type: Number,
        default: 0
    },
    startDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    }
    ,
    usageLimit: {
        type: Number,
        default: 1
    },
    usedCount: {
        type: Number,
        default: 0
    },
    applicableFor: {
        type: String,
        enum: ["all", "first_order"],
        default: "all"

    },
   usedBy:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
],
    isActive:{
        type:Boolean,
        default:true
    }

},{timestamps:true})


module.exports = mongoose.model("Coupon", couponSchema)