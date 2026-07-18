const transporter = require("../config/mailer");

const sendEmail = async ({
    email,
    subject,
    html,
      attachments = [],
}) => {

    try {

        await transporter.sendMail({

            from: `"UrbanCart" <${process.env.MAIL_USER}>`,

            to: email,

            subject,

            html,
              attachments,

        });

    } catch (error) {

        console.error(
            "Email Error:",
            error
        );

        throw new Error(
            "Failed to send email"
        );

    }

};

module.exports = sendEmail;