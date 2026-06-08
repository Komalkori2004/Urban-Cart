

const mongoose = require("mongoose")


const reviewSchema = new mongoose.Schema({
    
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
    },
    name:{
        type:String,
        required:true
    },
    rating:{
         type: Number,
            required: true,
            min: 1,
            max: 5
    },
    comment:{
        type:String,
        required:true
    }


},{timestamps:true})




const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, "description is required"]

    },
    price: {
        type: Number,
        required: [true, "price is required"],
        min: [0, "price must be greater than zero"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    brand: {
        type: String,
        default: "UrbanCart"
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"],
        default: 1,
        min: [0, "Stock cannot be negative"],
    },


    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    ratings: {
        type: Number,
        default: 0
    },

   

    numReviews: {
        type: Number,
        default: 0
    },
     reviews: [reviewSchema],

    shipping: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)