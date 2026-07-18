const emailLayout = require("./emailLayout");

const forgotPassword = ({
    name,
    resetUrl,
}) => {

    return emailLayout({

        title: "Reset Your Password",

        greeting: `Hi ${name},`,

        heading: "Reset Your Password",

        message:
            "We received a request to reset your UrbanCart account password. Click the button below to securely create a new password. If you didn't request this, you can safely ignore this email.",

        buttonText: "Reset Password",

        buttonUrl: resetUrl,

        footerText:
            "© 2026 UrbanCart. All rights reserved.",

    });

};

module.exports = forgotPassword;