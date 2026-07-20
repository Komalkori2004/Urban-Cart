const emailLayout = require("./emailLayout");

const orderDeliveredTemplate = ({
    name,
    orderId,
    orderDate,
    orderUrl,
}) => {

    return emailLayout({

        title: "Order Delivered",

        greeting: `Hi ${name},`,

        heading: "Your Order Has Been Delivered!",

        message: `
            Thank you for shopping with UrbanCart!

            <br><br>

            <strong>Order Details</strong>

            <br><br>

            <strong>Order ID:</strong> ${orderId}<br>
            <strong>Order Date:</strong> ${orderDate}<br>
            <strong>Order Status:</strong> Delivered

            <br><br>

            Your order has been successfully delivered.

            <br><br>

            We hope you love your purchase. Thank you for choosing UrbanCart.

            <br><br>

            We look forward to serving you again!
        `,

        buttonText: "View Order",

        buttonUrl: orderUrl,

        footerText:
            "© 2026 UrbanCart. Thank you for shopping with us.",

    });

};

module.exports = orderDeliveredTemplate;