const emailLayout = require("./emailLayout");

const orderConfirmationTemplate = ({
    name,
    orderId,
    orderDate,
    paymentMethod,
    paymentStatus,
    orderStatus,
    orderUrl,
}) => {

    return emailLayout({

        title: "Order Confirmed",

        greeting: `Hi ${name},`,

        heading: "Your Order is Confirmed!",

        message: `
            Thank you for shopping with <strong>UrbanCart</strong>.
            We're excited to let you know that your order has been successfully placed and is now being processed.

            <br><br>

            <strong>Order Details</strong>

            <br><br>

            <strong>Order ID:</strong> ${orderId}<br>
            <strong>Order Date:</strong> ${orderDate}<br>
            <strong>Payment Method:</strong> ${paymentMethod}<br>
            <strong>Payment Status:</strong> ${paymentStatus}<br>
            <strong>Order Status:</strong> ${orderStatus}

            <br><br>

            We'll notify you again as soon as your order has been shipped.

            <br><br>

            Thank you for choosing UrbanCart. We truly appreciate your trust and look forward to serving you again.
        `,

        buttonText: "View Order",

        buttonUrl: orderUrl,

        footerText:
            "© 2026 UrbanCart. Thank you for shopping with us.",

    });

};

module.exports = orderConfirmationTemplate;