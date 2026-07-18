const emailLayout = require("./emailLayout");

const verifyEmail = ({
    name,
    verifyUrl,
}) => {

    return emailLayout({

        title: "Verify Your Email",

        greeting: `Hi ${name},`,

        heading: "Verify Your Email",

        message:
            "Thank you for creating your UrbanCart account. Please verify your email address to activate your account and begin your shopping experience.",

        buttonText: "Verify Email",

        buttonUrl: verifyUrl,

        footerText:
            "© 2026 UrbanCart. All rights reserved.",

    });

};

module.exports = verifyEmail;