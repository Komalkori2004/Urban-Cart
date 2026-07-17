const emailLayout = ({
    title,
    greeting,
    heading,
    message,
    buttonText,
    buttonUrl,
    footerText,
}) => {

    return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
/>

<title>${title}</title>

</head>

<body
    style="
        margin:0;
        padding:0;
        background:#0B0B0B;
        font-family:Arial,sans-serif;
    "
>

    <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="
            background:#0B0B0B;
            padding:40px 20px;
        "
    >

        <tr>

            <td align="center">

                <table
                    width="650"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                        background:#151515;
                        border:1px solid #2a2a2a;
                        border-radius:20px;
                        overflow:hidden;
                    "
                >

                    <!-- Header -->

                    <tr>

                        <td
                            align="center"
                            style="
                                padding:40px 30px 20px;
                            "
                        >

                            <img
                                src="https://via.placeholder.com/180x60?text=UrbanCart"
                                alt="UrbanCart"
                                width="180"
                            />

                        </td>

                    </tr>

                    <!-- Body -->

                    <tr>

                        <td
                            style="
                                padding:20px 50px;
                                color:#ffffff;
                            "
                        >

                            <p
                                style="
                                    font-size:18px;
                                    margin:0 0 20px;
                                "
                            >
                                ${greeting}
                            </p>

                            <h1
                                style="
                                    color:#D4AF37;
                                    margin:0 0 20px;
                                    font-size:36px;
                                "
                            >
                                ${heading}
                            </h1>

                            <p
                                style="
                                    color:#cccccc;
                                    line-height:1.8;
                                    font-size:16px;
                                "
                            >
                                ${message}
                            </p>

                            <div
                                style="
                                    text-align:center;
                                    margin:40px 0;
                                "
                            >

                                <a
                                    href="${buttonUrl}"
                                    style="
                                        background:#D4AF37;
                                        color:#111111;
                                        text-decoration:none;
                                        padding:16px 40px;
                                        border-radius:50px;
                                        display:inline-block;
                                        font-weight:bold;
                                    "
                                >
                                    ${buttonText}
                                </a>

                            </div>

                        </td>

                    </tr>

                    <!-- Footer -->

                    <tr>

                        <td
                            align="center"
                            style="
                                padding:30px;
                                border-top:1px solid #2a2a2a;
                            "
                        >

                            <p
                                style="
                                    color:#999999;
                                    font-size:14px;
                                    margin:0;
                                "
                            >
                                ${footerText}
                            </p>

                            <p
                                style="
                                    color:#666666;
                                    font-size:12px;
                                    margin-top:20px;
                                "
                            >
                                © 2026 UrbanCart • Luxury Fashion & Beauty
                            </p>

                        </td>

                    </tr>

                </table>

            </td>

        </tr>

    </table>

</body>

</html>

`;

};

module.exports = emailLayout;


