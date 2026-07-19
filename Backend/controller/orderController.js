
const cart = require("../models/cartModel")
const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const Coupon = require("../models/couponModel")
const asyncHandler = require("../middleware/asyncHandler")
const ErrorHandler = require("../utils/errorHandler")
const user = require("../models/userModel");


const orderConfirmationTemplate = require("../utils/emailTemplates/orderConfirmation");
const orderShippedTemplate = require("../utils/emailTemplates/orderShipped");
const outForDeliveryTemplate = require("../utils/emailTemplates/outForDelivery");
const sendEmail = require("../utils/sendEmail");


const placeOrder = asyncHandler(async (req, res, next) => {
    const userID = req.user.id

    const { shippingAddress, paymentMethod, couponCode } = req.body

    const cartItems = await cart.findOne({ user: userID }).populate("items.product")

    if (!cartItems) {
        return next(new ErrorHandler(404, "Cart not found"))

    }

    if (!cartItems || cartItems.items.length === 0) {
        return next(new ErrorHandler(400, "Cart is empty"))
    }

    for (const item of cartItems.items) {
        const product = await Product.findById(item.product._id)

        if (!product) {
            return next(new ErrorHandler(404, `Product ${item.product._id} not found`))

        }

        if (item.quantity > product.stock) {
            return next(new ErrorHandler(400, `Product ${product.name} is out of stock`))

        }
    }
    const orderItems = cartItems.items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        image: item.product.images?.[0]?.url || "",
        price: item.product.price,
        quantity: item.quantity,
    }))



    const totalAmount = cartItems.items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity
    }, 0)
    const shippingCharge =
        totalAmount >= 5000 ? 0 : 100;

    let discountAmount = 0;
    let finalAmount = totalAmount;

    let coupon = null;

    if (couponCode) {

        coupon = await Coupon.findOne({
            code: couponCode.toUpperCase()
        });

        if (!coupon) {
            return next(
                new ErrorHandler(
                    404,
                    "Invalid coupon code"
                )
            );
        }


        if (!coupon.isActive) {
            return next(
                new ErrorHandler(
                    400,
                    "Coupon is not active"
                )
            );
        } const now = new Date();

        if (now < coupon.startDate) {
            return next(
                new ErrorHandler(
                    400,
                    "Coupon is not active yet"
                )
            );
        }

        if (now > coupon.expiryDate) {
            return next(
                new ErrorHandler(
                    400,
                    "Coupon has expired"
                )
            );
        } if (
            coupon.usedCount >=
            coupon.usageLimit
        ) {
            return next(
                new ErrorHandler(
                    400,
                    "Coupon usage limit exceeded"
                )
            );
        } const alreadyUsed =
            coupon.usedBy.some(
                (userId) =>
                    userId.toString() === userID
            );

        if (alreadyUsed) {
            return next(
                new ErrorHandler(
                    400,
                    "You have already used this coupon"
                )
            );
        }
        if (
            coupon.applicableFor ===
            "first_order"
        ) {

            const totalOrders =
                await Order.countDocuments({
                    user: userID
                });

            if (totalOrders > 0) {
                return next(
                    new ErrorHandler(
                        400,
                        "Coupon valid only for first order"
                    )
                );
            }
        }
        if (
            totalAmount <
            coupon.minimumOrderAmount
        ) {
            return next(
                new ErrorHandler(
                    400,
                    `Minimum order amount should be ₹${coupon.minimumOrderAmount}`
                )
            );
        }
        if (coupon.discountType === "percentage") {

            discountAmount =
                (totalAmount * coupon.discountValue) / 100;

            if (coupon.maximumDiscountAmount > 0) {

                discountAmount = Math.min(
                    discountAmount,
                    coupon.maximumDiscountAmount
                );
            }

        } else {

            discountAmount =
                coupon.discountValue;
        }

        finalAmount =
            totalAmount - discountAmount;

    }

    const orderData = {
        user: userID,
        items: orderItems,
        shippingAddress,
        paymentMethod,

        originalAmount: totalAmount, // before discount


        shippingCharge,
        discountAmount,
        totalAmount: finalAmount + shippingCharge,  // after discount

        couponCode: couponCode || null,


    };
    if (paymentMethod === "RAZORPAY") {
        orderData.paymentStatus = "Paid";
        orderData.isPaid = true;
        orderData.paidAt = new Date();
    }

    const newOrder = await Order.create(orderData);


    try {
        const existingUser = await user.findById(userID);

        const html = orderConfirmationTemplate({
            name: existingUser.name,
            orderId: newOrder._id,
            orderDate: newOrder.createdAt.toLocaleDateString("en-IN"),
            paymentMethod: newOrder.paymentMethod,
            paymentStatus: newOrder.paymentStatus,
            orderStatus: newOrder.orderStatus,
            orderUrl: `${process.env.FRONTEND_URL}/my-orders/${newOrder._id}`,
        });

        await sendEmail({
            email: existingUser.email,
            subject: "Your Order has been Confirmed",
            html,
        });
    } catch (error) {
        console.error("Order email failed:", error.message);
    }

    if (coupon) {

        coupon.usedCount += 1;

        coupon.usedBy.push(userID);

        await coupon.save();
    }

    for (const item of cartItems.items) {
        const product = await Product.findById(item.product._id)
        product.stock -= item.quantity
        await product.save()
    }

    cartItems.items = []
    await cartItems.save()
    res.status(200).json({
        success: true,
        message: "Order placed successfully",
        data: newOrder
    })

})



const getMyOrder = asyncHandler(async (req, res, next) => {
    const userID = req.user.id

    const orders = await Order.find({ user: userID }).sort({ createdAt: -1 })


    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
    })


})

const getOrderbyId = asyncHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id)

    if (!order) {
        next(new ErrorHandler(404, "Order not found"))
    }

    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
        return next(new ErrorHandler(401, "not authorized to view this order"))

    }

    res.status(200).json({
        success: true,
        data: order
    })
})


const orderStatus = asyncHandler(async (req, res, next) => {

    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(404, "Order not found"));
    }

    order.orderStatus = orderStatus;

    await order.save();

    // ✅ Send email only when order is shipped
    if (orderStatus === "Shipped") {

        try {

            const existingUser = await user.findById(order.user);

            const html = orderShippedTemplate({
                name: existingUser.name,
                orderId: order._id,
                orderDate: order.createdAt.toLocaleDateString("en-IN"),
                orderUrl: `${process.env.FRONTEND_URL}/my-orders/${order._id}`,
            });

            await sendEmail({
                email: existingUser.email,
                subject: "Your Order Has Been Shipped",
                html,
            });

        } catch (error) {
            console.error("Shipped email failed:", error.message);
        }

    }


    if (orderStatus === "Out for Delivery") {

        try {

            const existingUser = await user.findById(order.user);

            const html = outForDeliveryTemplate({
                name: existingUser.name,
                orderId: order._id,
                orderDate: order.createdAt.toLocaleDateString("en-IN"),
                orderUrl: `${process.env.FRONTEND_URL}/my-orders/${order._id}`,
            });

            await sendEmail({
                email: existingUser.email,
                subject: "Your Order is Out for Delivery",
                html,
            });

        } catch (error) {
            console.error("Out for delivery email failed:", error.message);
        }

    }



    res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: order,
    });

});



// cancle order

const cancleOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler(404, "Order not found "))

    }
    if (
        order.user.toString() !== req.user.id &&
        req.user.role !== "admin"
    ) {
        return next(
            new ErrorHandler(
                401,
                "Not authorized to cancel this order"
            )
        );
    }

    if (order.orderStatus === "Cancelled") {
        return next(new ErrorHandler(400, "Order already cancelled"))

    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler(400, "Delivered order cannot be cancelled"))
    }

    for (const item of order.items) {
        const product = await Product.findById(item.product)
        product.stock += item.quantity
        await product.save()
    }
    order.orderStatus = "Cancelled"
    await order.save()
    res.status(200).json({
        success: true,
        message: "Order cancelled successfully",
        data: order
    })
})


// get all orders for admin

const getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find().sort({ createdAt: -1 })

    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
    })
})




module.exports = { placeOrder, getMyOrder, getOrderbyId, orderStatus, cancleOrder, getAllOrders }

