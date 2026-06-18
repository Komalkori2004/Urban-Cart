

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




const getSubscribers = asyncHandler(async (req, res, next) => {
    const subscribers = await Newsletter.find()
        .select("-__v")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: subscribers.length,
        subscribers
    })
})

module.exports = {
    subscribeNewsletter,
    getSubscribers
}