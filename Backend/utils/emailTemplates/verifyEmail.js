const emailLayout = require("./emailLayout");

const verifyEmail = ({
    name,
    verifyUrl,
}) => {

    return emailLayout({

        title: "Verify Your Email",

        greeting: `Hi ${name},`,

        heading: "Welcome to UrbanCart",

        message:
            "Thank you for creating your UrbanCart account. Please verify your email address to activate your account and enjoy a premium shopping experience.",

        buttonText: "Verify Email",

        buttonUrl: verifyUrl,

        footerText:
            "If you didn't create this account, you can safely ignore this email."

    });
    

};

module.exports = verifyEmail;