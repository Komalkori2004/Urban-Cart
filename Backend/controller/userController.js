

const User = require("../models/userModel");

const asyncHandler = require("../middleware/asyncHandler");

const ErrorHandler = require("../utils/errorHandler");

const bcrypt = require("bcryptjs");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");


const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "urbancart_users",
            },
            (error, result) => {
                if (error) {
                    reject(error)
                }
                else {
                    resolve(result)
                }
            }


        )
        streamifier.createReadStream(fileBuffer).pipe(stream)

    })

}




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



const changePassword = asyncHandler(async (req, res, next) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validate required fields
    if (!currentPassword || !newPassword || !confirmPassword) {
        return next(
            new ErrorHandler(400, "Please fill all fields")
        );
    }

    // Find logged-in user
    const existingUser = await User.findById(req.user.id);

    if (!existingUser) {
        return next(
            new ErrorHandler(404, "User not found")
        );
    }

    // Verify current password
    const isPasswordMatched = await bcrypt.compare(
        currentPassword,
        existingUser.password
    );

    if (!isPasswordMatched) {
        return next(
            new ErrorHandler(400, "Current password is incorrect")
        );
    }

    // Validate new password length
    if (newPassword.length < 6) {
        return next(
            new ErrorHandler(
                400,
                "New password must be at least 6 characters"
            )
        );
    }

    // Confirm password validation
    if (newPassword !== confirmPassword) {
        return next(
            new ErrorHandler(
                400,
                "New password and confirm password do not match"
            )
        );
    }

    // Prevent using the same password
    const isSamePassword = await bcrypt.compare(
        newPassword,
        existingUser.password
    );

    if (isSamePassword) {
        return next(
            new ErrorHandler(
                400,
                "New password cannot be the same as your current password"
            )
        );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    existingUser.password = hashedPassword;

    await existingUser.save();

    res.status(200).json({
        success: true,
        message: "Password changed successfully",
    });
});





const uploadProfileImage = asyncHandler(async (req, res, next) => {

    const existingUser = await User.findById(req.user.id);

    if (!existingUser) {
        return next(
            new ErrorHandler(404, "User not found")
        );
    }

    if (!req.file) {
        return next(
            new ErrorHandler(400, "Please upload a profile image")
        );
    }

    if (existingUser.avatar.public_id) {
        await cloudinary.uploader.destroy(
            existingUser.avatar.public_id
        );
    }

    const result = await uploadToCloudinary(
        req.file.buffer
    );


    existingUser.avatar.public_id = result.public_id;

    existingUser.avatar.url = result.secure_url;



    await existingUser.save();
    existingUser.password = undefined;
    res.status(200).json({
        success: true,
        message: "Profile image uploaded successfully",
        user: existingUser,
    });

});



module.exports = {


    updateProfile,
    changePassword,
    uploadProfileImage
}