const emailLayout = require("./emailLayout");

const orderConfirmationTemplate = ({
  name,
  orderId,
  orderDate,
  amount,
  paymentMethod,
  paymentStatus,
  orderStatus,
  orderUrl,
}) => {
  const isCOD = paymentMethod === "COD";

  return emailLayout({
    title: "Order Confirmed",

    greeting: `Hi ${name},`,

    heading: "🎉 Your Order Has Been Confirmed!",

    message: `
      <table
        role="presentation"
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
          width:100%;
          border-collapse:collapse;
        "
      >

        <tr>
          <td
            style="
              color:#D1D5DB;
              font-size:16px;
              line-height:28px;
              padding-bottom:25px;
            "
          >
            Thank you for shopping with
            <strong style="color:#FACC15;">
              UrbanCart
            </strong>.
            <br><br>
            Your order has been placed successfully and is now being processed.
            We'll notify you as your order moves through each stage.
          </td>
        </tr>

        <tr>
          <td>

            <table
              role="presentation"
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                width:100%;
                background:#1A1A1A;
                border:1px solid #303030;
                border-radius:14px;
              "
            >

              <tr>
                <td
                  style="
                    padding:24px;
                  "
                >

                  <table
                    role="presentation"
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    style="width:100%;"
                  >

                    <tr>
                      <td
                        colspan="2"
                        style="
                          color:#FACC15;
                          font-size:22px;
                          font-weight:bold;
                          padding-bottom:20px;
                        "
                      >
                        📦 Order Details
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          color:#9CA3AF;
                          font-size:15px;
                          padding:12px 0;
                          border-bottom:1px solid #2D2D2D;
                        "
                      >
                        Order ID
                      </td>

                      <td
                        align="right"
                        style="
                          color:#FFFFFF;
                          font-size:15px;
                          font-weight:600;
                          padding:12px 0;
                          border-bottom:1px solid #2D2D2D;
                          word-break:break-word;
                        "
                      >
                        ${orderId}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          color:#9CA3AF;
                          font-size:15px;
                          padding:12px 0;
                          border-bottom:1px solid #2D2D2D;
                        "
                      >
                        Order Date
                      </td>

                      <td
                        align="right"
                        style="
                          color:#FFFFFF;
                          font-size:15px;
                          padding:12px 0;
                          border-bottom:1px solid #2D2D2D;
                        "
                      >
                        ${orderDate}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          color:#9CA3AF;
                          font-size:15px;
                          padding:12px 0;
                          border-bottom:1px solid #2D2D2D;
                        "
                      >
                        Total Amount
                      </td>

                      <td
                        align="right"
                        style="
                          color:#FACC15;
                          font-size:19px;
                          font-weight:bold;
                          padding:12px 0;
                          border-bottom:1px solid #2D2D2D;
                        "
                      >
                        ₹${Number(amount).toLocaleString("en-IN")}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          color:#9CA3AF;
                          font-size:15px;
                          padding:12px 0;
                          border-bottom:1px solid #2D2D2D;
                        "
                      >
                        Payment Method
                      </td>

                      <td
                        align="right"
                        style="
                          color:#FFFFFF;
                          font-size:15px;
                          padding:12px 0;
                          border-bottom:1px solid #2D2D2D;
                        "
                      >
                        ${
                          isCOD
                            ? "Cash on Delivery"
                            : "Razorpay"
                        }
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          color:#9CA3AF;
                          font-size:15px;
                          padding:12px 0;
                          border-bottom:1px solid #2D2D2D;
                        "
                      >
                        Payment Status
                      </td>

                      <td
                        align="right"
                        style="
                          padding:12px 0;
                          border-bottom:1px solid #2D2D2D;
                        "
                      >

                        ${
                          isCOD
                            ? `
                            <span
                              style="
                                display:inline-block;
                                background:#7C4A03;
                                color:#FFD166;
                                padding:7px 14px;
                                border-radius:20px;
                                font-size:12px;
                                font-weight:bold;
                              "
                            >
                              PENDING
                            </span>
                            `
                            : `
                            <span
                              style="
                                display:inline-block;
                                background:#064E3B;
                                color:#A7F3D0;
                                padding:7px 14px;
                                border-radius:20px;
                                font-size:12px;
                                font-weight:bold;
                              "
                            >
                              ${paymentStatus || "PAID"}
                            </span>
                            `
                        }

                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          color:#9CA3AF;
                          font-size:15px;
                          padding:12px 0 0;
                        "
                      >
                        Order Status
                      </td>

                      <td
                        align="right"
                        style="
                          color:#FFFFFF;
                          font-size:15px;
                          font-weight:bold;
                          padding:12px 0 0;
                        "
                      >
                        ${orderStatus}
                      </td>
                    </tr>

                  </table>

                </td>
              </tr>

            </table>

          </td>
        </tr>

                <tr>
          <td style="padding-top:24px;">

            ${
              isCOD
                ? `
                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    width:100%;
                    background:#3A2C00;
                    border-left:5px solid #FACC15;
                    border-radius:10px;
                  "
                >
                  <tr>
                    <td style="padding:20px;">

                      <div
                        style="
                          color:#FACC15;
                          font-size:18px;
                          font-weight:bold;
                          padding-bottom:10px;
                        "
                      >
                        💵 Cash on Delivery
                      </div>

                      <div
                        style="
                          color:#F8FAFC;
                          font-size:15px;
                          line-height:28px;
                        "
                      >
                        Your order has been confirmed successfully.
                        Please keep the payable amount ready at the
                        time of delivery.
                      </div>

                    </td>
                  </tr>
                </table>
                `
                : `
                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    width:100%;
                    background:#052E16;
                    border-left:5px solid #22C55E;
                    border-radius:10px;
                  "
                >
                  <tr>
                    <td style="padding:20px;">

                      <div
                        style="
                          color:#4ADE80;
                          font-size:18px;
                          font-weight:bold;
                          padding-bottom:10px;
                        "
                      >
                        ✅ Payment Successful
                      </div>

                      <div
                        style="
                          color:#DCFCE7;
                          font-size:15px;
                          line-height:28px;
                        "
                      >
                        We've received your payment successfully.
                        Your order is now confirmed and will be
                        processed shortly.
                      </div>

                    </td>
                  </tr>
                </table>
                `
            }

          </td>
        </tr>

        <tr>
          <td
            style="
              padding-top:30px;
              color:#D1D5DB;
              font-size:15px;
              line-height:28px;
            "
          >
            We'll keep you updated at every stage of your order —
            from confirmation to shipping and final delivery.
          </td>
        </tr>

        <tr>
          <td style="padding-top:15px;">

            <table
              role="presentation"
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
            >
              <tr>
                <td align="center">

                  <a
                    href="${orderUrl}"
                    style="
                      background:#FACC15;
                      color:#111111;
                      text-decoration:none;
                      display:inline-block;
                      padding:15px 34px;
                      border-radius:8px;
                      font-size:16px;
                      font-weight:bold;
                    "
                  >
                    View My Order
                  </a>

                </td>
              </tr>
            </table>

          </td>
        </tr>

        <tr>
          <td
            style="
              padding-top:35px;
              border-top:1px solid #303030;
            "
          >

            <table
              role="presentation"
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
            >

              <tr>
                <td
                  style="
                    color:#FFFFFF;
                    font-size:17px;
                    font-weight:bold;
                    padding-bottom:12px;
                  "
                >
                  Thank You ❤️
                </td>
              </tr>

              <tr>
                <td
                  style="
                    color:#9CA3AF;
                    font-size:15px;
                    line-height:28px;
                  "
                >
                  Thank you for choosing
                  <span
                    style="
                      color:#FACC15;
                      font-weight:bold;
                    "
                  >
                    UrbanCart
                  </span>.
                  We truly appreciate your trust and look forward
                  to serving you again.
                </td>
              </tr>

            </table>

          </td>
        </tr>

      </table>
    `,

    buttonText: "View My Order",

    buttonUrl: orderUrl,

    footerText:
      "© 2026 UrbanCart. All Rights Reserved.",

  });
};

module.exports = orderConfirmationTemplate;



