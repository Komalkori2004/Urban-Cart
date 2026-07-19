const emailLayout = require("./emailLayout");

const outForDeliveryTemplate = ({
    name,
    orderId,    
    orderDate,
    orderUrl,
}) => {

    return emailLayout({

        title: "Out for Delivery",

        greeting: `Hi ${name},`,

        heading: "Your Order is Out for Delivery!",

        message: `
            Great news! Your UrbanCart order is out for delivery and will arrive soon.

            <br><br>

            <strong>Order Details</strong>

            <br><br>

            <strong>Order ID:</strong> ${orderId}<br>
            <strong>Order Date:</strong> ${orderDate}<br>
            <strong>Order Status:</strong> Out for Delivery

            <br><br>

            Our delivery partner is on the way to your location.

            <br><br>

            Please keep your phone nearby in case the delivery partner needs to contact you.

            <br><br>

            We hope you enjoy your UrbanCart purchase!

        `,

        buttonText: "Track Order",

        buttonUrl: orderUrl,

        footerText:
            "© 2026 UrbanCart. Your order will arrive soon.",

    });

};

module.exports = outForDeliveryTemplate;