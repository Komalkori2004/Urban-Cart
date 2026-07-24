const emailLayout = require("./emailLayout");

const adminContactNotificationTemplate = ({
    name,
    email,
    phone,
    subject,
    message
}) => {

    return emailLayout({

        title: "New Contact Request",

        greeting: "Hello Admin,",

        heading: "A New Contact Request Has Been Received",

        message: `

            <p>
                A customer has submitted a new contact request on UrbanCart.
            </p>

            <div
                style="
                    margin:30px 0;
                    padding:20px;
                    background:#f8f8f8;
                    border:1px solid #e5e5e5;
                    border-radius:10px;
                "
            >

                <h3 style="margin-top:0;color:#d4af37;">
                    Customer Details
                </h3>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Phone:</strong> ${phone}</p>

                <p><strong>Subject:</strong> ${subject}</p>

                <p><strong>Message:</strong></p>

                <p>${message}</p>

                <p>
                    <strong>Submitted On:</strong>
                    ${new Date().toLocaleDateString("en-IN")}
                </p>

            </div>

            <p>
                Please review this inquiry and respond to the customer as soon as possible.
            </p>

        `,

        buttonText: "Open Admin Dashboard",

        buttonUrl: `${process.env.CLIENT_URL}/admin/contact`,

        footerText:
            "UrbanCart Admin Notification"

    });

};

module.exports = adminContactNotificationTemplate;