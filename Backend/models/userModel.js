const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters"],
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say"],
      default: "Prefer not to say",
    },

    dateOfBirth: {
      type: Date,
      default: null,
    },

    avatar: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
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
          required: true,
        },

        phone: {
          type: String,
          required: true,
        },

        addressLine1: {
          type: String,
          required: true,
        },

        addressLine2: {
          type: String,
        },

        city: {
          type: String,
          required: true,
        },

        state: {
          type: String,
          required: true,
        },

        pincode: {
          type: String,
          required: true,
        },

        country: {
          type: String,
          default: "India",
        },

        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },

    verifyToken: String,

    verifyTokenExpiry: Date,

    resetPasswordToken: String,

    resetPasswordTokenExpiry: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);