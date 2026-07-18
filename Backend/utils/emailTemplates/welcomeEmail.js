const emailLayout = require("./emailLayout");

const welcomeEmail = ({ name, shopUrl }) => {
  return emailLayout({
    title: "Welcome to UrbanCart",
    greeting: `Hi ${name},`,
    heading: "Welcome to UrbanCart!",
    message:
      "Your email has been verified successfully. Your account is now active and you're ready to explore our premium collection of fashion and lifestyle products.",
    buttonText: "Start Shopping",
    buttonUrl: shopUrl,
    footerText: "© 2026 UrbanCart. All rights reserved.",
  });
};

module.exports = welcomeEmail;