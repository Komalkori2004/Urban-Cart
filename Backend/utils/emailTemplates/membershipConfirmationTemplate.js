
const emailLayout = require("./emailLayout");

const membershipConfirmationTemplate = ({
    name,
    planName,
    amount,
    purchaseDate,
    expiryDate,
    paymentMethod,
    paymentStatus,
    membershipUrl
}) => {

    return emailLayout({

        title: "Membership Activated",

        greeting: `Hi ${name},`,

        heading: "🎉 Your Premium Membership is Now Active!",

        message: `
            <!-- Membership Details -->
        `,

        buttonText: "View Membership",

        buttonUrl: membershipUrl,

        footerText:
        "© 2026 UrbanCart. Enjoy your Premium Membership."

    });

}

module.exports = membershipConfirmationTemplate;