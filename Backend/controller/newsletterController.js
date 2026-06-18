

const Newsletter = require("../models/newsletterModel")
const ErrorHandler = require("../utils/errorhandler")
const asyncHandler = require("../middleware/asyncHandler")


const subscribeNewsletter = asyncHandler(async (req, res, next) => {


    const { email } = req.body

    if (!email) {
        return next(new ErrorHandler(400, "Email is required"))
    }

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return next(new ErrorHandler(400, "Please enter a valid email"))
    }

    const existSubscriber = await Newsletter.findOne({ email: email.toLowerCase() })

    if (existSubscriber) {
        return next(new ErrorHandler(400, "You are already subscribed"))
    }


    await Newsletter.create({
        email: email.toLowerCase()
    })



    res.status(201).json({
        success: true,
        message: "You have successfully subscribed to our newsletter"
    })



})



module.exports = {
  subscribeNewsletter
}