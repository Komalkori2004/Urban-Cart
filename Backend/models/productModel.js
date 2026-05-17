

    const mongoose = require("mongoose")

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
                type: String
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