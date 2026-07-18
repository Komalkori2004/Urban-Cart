const emailLayout = require("./emailLayout");

const passwordResetSuccess = ({
    name,
    loginUrl,
}) => {

    return emailLayout({

        title: "Password Changed Successfully",

        greeting: `Hi ${name},`,

        heading: "Password Updated Successfully",

        message:
            "Your UrbanCart account password has been changed successfully. If you made this change, no further action is required. If you didn't change your password, please contact our support team immediately to secure your account.",

        buttonText: "Login Now",

        buttonUrl: loginUrl,

        footerText:
            "© 2026 UrbanCart. All rights reserved.",

    });

};

module.exports = passwordResetSuccess;