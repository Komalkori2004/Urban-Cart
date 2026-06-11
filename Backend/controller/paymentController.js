

const asyncHandler = require("../middleware/asyncHandler")
const ErrorHandler = require("../utils/errorHandler")
const rozerpay = require("../config/rozerpay")

const crpto = require("crypto")

const createRozerOrder = asyncHandler(async (req, res, next) => {

    const { amount } = req.body
    console.log("AMOUNT:", amount)

    const options = {
        amount: amount * 100, // paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`
    };
    try {
        console.log("Before Razorpay");

        const order = await rozerpay.orders.create(options);

        console.log("After Razorpay");

        return res.status(200).json({
            success: true,
            order
        });

    } catch (error) {

        console.log("========== RAZORPAY ERROR ==========");
        console.log(error);

        console.log("STATUS:", error.statusCode);
        console.log("MESSAGE:", error.message);
        console.log("DESCRIPTION:", error.error?.description);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

})



const verifyPayment = asyncHandler(async (req, res, next) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body

    const body =
        razorpay_order_id +
        "|" +
        razorpay_payment_id;

    const expectedSignature = crpto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex")


    if (expectedSignature === razorpay_signature) {
        return res.status(200).json({
            success: true,
            message: "Payment verified successfully"
        })
    }
    return next(new ErrorHandler(400, "Payment verification failed"))
})

module.exports = { createRozerOrder, verifyPayment }