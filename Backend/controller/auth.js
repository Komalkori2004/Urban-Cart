

const user = require("../models/userModel")
const ErrorHandler = require("../utils/errorHandler")

const bcrypt = require("bcryptjs")


const registerUser = async (req, res, next) => {

    try {

        // request come form frontend
        const { name, email, password } = req.body



        // check all filed must have required
        if (!name || !email || !password) {
            return next(new ErrorHandler("please enter all fields", 400))
        }

        // database check if email already exist

        const userExists = await user.findOne({ email })

        if (userExists) {
            return next(new ErrorHandler("User already exists", 400))
        }

        const hasshedPassword = await bcrypt.hash(password, 10)
        // create user

        const User = await user.create({
            name, email, password: hasshedPassword
        })
        res.status(200).json({
            success: true,
            message: "user created successfully",
            user
        })



    } catch (error) {
        next(error)
    }


}




// login user
const LoginUser = async (req, res, next) => {

    try {

        const { email, password } = req.body
        if (!email || !password) {
            return next(new ErrorHandler("please enter email or password ", 400))
        }
        const existingUser = await user.findOne({ email })

        if (!existingUser) {
            return next(new ErrorHandler("user not found", 401))
        }

        const isMatch = await bcrypt.compare(password, existingUser.password)
        if (!isMatch) {
            return next(new ErrorHandler("invalid password", 401))
        }

        res.status(200).json({
            success: true,
            message: "User Login seccessfully",
            user: existingUser
        })


    } catch (err) {
        next(err)
    }

}


module.exports = { registerUser, LoginUser }