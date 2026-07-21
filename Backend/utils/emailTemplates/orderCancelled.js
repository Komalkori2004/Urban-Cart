const emailLayout = require("./emailLayout");

const orderCancelledTemplate = ({
    name,
    orderId,
    orderDate,
    shopUrl,
}) => {

    return emailLayout({

        title: "Order Cancelled",

        greeting: `Hi ${name},`,

        heading: "Your Order Has Been Cancelled",

        message: `
            Your order has been cancelled successfully.

            <br><br>

            <strong>Order Details</strong>

            <br><br>

            <strong>Order ID:</strong> ${orderId}<br>
            <strong>Order Date:</strong> ${orderDate}<br>
            <strong>Order Status:</strong> Cancelled

            <br><br>

            If you made an online payment, any eligible refund will be processed according to our refund policy.

            <br><br>

            If you have any questions, our support team is always here to help.

            <br><br>

            We hope to see you again soon!
        `,

        buttonText: "Continue Shopping",

        buttonUrl: shopUrl,

        footerText:
            "© 2026 UrbanCart. Thank you for choosing us.",

    });

};

module.exports = orderCancelledTemplate;