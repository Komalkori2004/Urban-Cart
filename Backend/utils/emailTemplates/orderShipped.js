const emailLayout = require("./emailLayout");

const orderShippedTemplate = ({
    name,
    orderId,
    orderDate,
    orderUrl,
}) => {

    return emailLayout({

        title: "Order Shipped",

        greeting: `Hi ${name},`,

        heading: "Your Order Has Been Shipped!",

        message: `
            Great news! Your UrbanCart order is now on its way.

            <br><br>

            <strong>Order Details</strong>

            <br><br>

            <strong>Order ID:</strong> ${orderId}<br>
            <strong>Order Date:</strong> ${orderDate}<br>
            <strong>Order Status:</strong> Shipped

            <br><br>

            Your package has left our warehouse and is currently in transit.

            <br><br>

            We'll keep you updated with every important milestone until it reaches your doorstep.

            <br><br>

            Thank you for shopping with UrbanCart.
        `,

        buttonText: "Track Order",

        buttonUrl: orderUrl,

        footerText:
            "© 2026 UrbanCart. Your order is on the way.",

    });

};

module.exports = orderShippedTemplate;