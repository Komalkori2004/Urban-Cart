
const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "email is requires"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters"]
  },
  role: {
    type: String,
    default: "user"
  },
membership: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserMembership",
    default: null,
},

  addresses: [
    {
      fullName: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      addressLine1: {
        type: String,
        required: true
      },
      addressLine2: {
        type: String
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      pincode: {
        type: String,
        required: true
      },
      country: {
        type: String,
        default: "India"
      },
      isDefault: {
        type: Boolean,
        default: false
      }
    }
  ],
  isVerified: {
    type: Boolean,
    default: false
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
  resetPasswordToken: String,
  resetPasswordTokenExpiry: Date,


}, {
  timestamps: true,
})

module.exports = mongoose.model("User", userSchema)
