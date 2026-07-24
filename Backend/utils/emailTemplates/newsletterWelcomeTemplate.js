const emailLayout = require("./emailLayout");

const newsletterWelcomeTemplate = ({ email }) => {

    return emailLayout({

        title: "Welcome to UrbanCart!",

        greeting: "Hello,",

        heading: "You're Officially Part of the UrbanCart Circle ✨",

        message: `

            <p>
                Thank you for subscribing to the
                <strong>UrbanCart Newsletter.</strong>
            </p>

            <p>
                We're delighted to have you with us. From today, you'll receive exclusive updates carefully curated for our community.
            </p>

            <div
                style="
                    margin:30px 0;
                    padding:22px;
                    background:#f8f8f8;
                    border:1px solid #e5e5e5;
                    border-radius:10px;
                "
            >

                <h3 style="margin-top:0;color:#d4af37;">
                    Here's What You'll Enjoy
                </h3>

                <ul style="padding-left:20px;line-height:2;">
                    <li>🛍️ Early access to new arrivals</li>
                    <li>🔥 Exclusive discounts & limited-time offers</li>
                    <li>🎁 Members-only collections</li>
                    <li>✨ Seasonal style inspiration</li>
                    <li>💎 Premium shopping experiences</li>
                </ul>

            </div>

            <div
                style="
                    margin:25px 0;
                    padding:18px;
                    background:#fffdf6;
                    border-left:4px solid #d4af37;
                    border-radius:8px;
                "
            >
                <p style="margin:0;">
                    <strong>Subscribed Email</strong><br>
                    ${email}
                </p>
            </div>

            <p>
                Every email is crafted to help you discover premium products, exclusive collections, and exciting offers before everyone else.
            </p>

            <p>
                Welcome aboard—we're excited to have you as part of the UrbanCart family. ❤️
            </p>

        `,

        buttonText: "Explore UrbanCart",

        buttonUrl: process.env.CLIENT_URL,

        footerText:
            "You're receiving this email because you subscribed to the UrbanCart Newsletter. You can unsubscribe anytime from future emails."

    });

};

module.exports = newsletterWelcomeTemplate;