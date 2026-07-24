const emailLayout = require("./emailLayout");

const contactConfirmationTemplate = ({
    name,
    subject,
    email,
    supportUrl
}) => {

    return emailLayout({

        title: "Thank You!",

        greeting: `Hi ${name},`,

        heading: "We've Received Your Message",

        message: `

            <p>
                Thank you for reaching out to
                <strong>UrbanCart</strong>.
                We've successfully received your message and appreciate you taking the time to contact us.
            </p>

            <p>
                Our support team will carefully review your inquiry and get back to you within
                <strong>24–48 business hours.</strong>
            </p>

            <div
                style="
                    margin:30px 0;
                    padding:20px;
                    background:#f8f8f8;
                    border-radius:10px;
                    border:1px solid #e5e5e5;
                "
            >

                <h3
                    style="
                        margin-top:0;
                        color:#d4af37;
                    "
                >
                    📌 Request Summary
                </h3>

                <p>
                    <strong>Subject:</strong>
                    ${subject}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${email}
                </p>

                <p>
                    <strong>Submitted On:</strong>
                    ${new Date().toLocaleDateString("en-IN")}
                </p>

            </div>

            <p>
                If your request is urgent, simply reply to this email and our support team will assist you as quickly as possible.
            </p>

            <p>
                Thank you for choosing
                <strong>UrbanCart ❤️</strong>
            </p>

        `,

        buttonText: "Continue Shopping",

        buttonUrl: supportUrl,

        footerText:
            "Need help? Contact us anytime at support@urbancart.com"

    });

};

module.exports = contactConfirmationTemplate;