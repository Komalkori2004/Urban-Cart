const emailLayout = require("./emailLayout");

const membershipCancellationTemplate = ({
    name,
    planName,
    cancellationDate,
    expiryDate,
    membershipUrl
}) => {

    return emailLayout({

        title: "Membership Cancelled",

        greeting: `Hi ${name},`,

        heading: "Your Premium Membership Has Been Cancelled",

        message: `
            <p>Your membership has been cancelled successfully.</p>

            <table style="width:100%; border-collapse:collapse; margin:20px 0;">

                <tr>
                    <td><strong>Plan</strong></td>
                    <td>${planName}</td>
                </tr>

                <tr>
                    <td><strong>Cancellation Date</strong></td>
                    <td>${cancellationDate}</td>
                </tr>

                <tr>
                    <td><strong>Valid Until</strong></td>
                    <td>${expiryDate}</td>
                </tr>

            </table>

            <p>
                We'd love to welcome you back anytime. Upgrade again to continue enjoying Premium benefits.
            </p>
        `,

        buttonText: "Explore Membership Plans",

        buttonUrl: membershipUrl,

        footerText:
            "© 2026 UrbanCart. Thank you for being a Premium Member."

    });

};

module.exports = membershipCancellationTemplate;