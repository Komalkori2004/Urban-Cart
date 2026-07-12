

const User = require("../models/userModel");

const asyncHandler = require("../middleware/asyncHandler");

const ErrorHandler = require("../utils/errorHandler");

const bcrypt = require("bcryptjs");




const updateProfile = asyncHandler(async (req, res, next) => {


    const { name, phone, gender, dateOfBirth, } = req.body
    const existingUser = await User.findById(req.user.id);

    if (!existingUser) {
        return next(
            new ErrorHandler(404, "User not found")
        );
    }

    if (name !== undefined && !name.trim()) {
        return next(
            new ErrorHandler(400, "Name cannot be empty")
        );
    }

if (
    phone !== undefined &&
    phone !== "" &&
    !/^[0-9]{10}$/.test(phone)
) {
    return next(
        new ErrorHandler(400, "Phone number must be 10 digits")
    );
}   
    if (phone !== undefined) {
        existingUser.phone = phone.trim();
    }

    if (name !== undefined) {
        existingUser.name = name.trim();
    }



    if (gender !== undefined) {
        existingUser.gender = gender;
    }

    if (dateOfBirth !== undefined) {
        existingUser.dateOfBirth = dateOfBirth;
    }


    await existingUser.save();
    existingUser.password = undefined;

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: existingUser,
    });


});



module.exports = {
    updateProfile
}