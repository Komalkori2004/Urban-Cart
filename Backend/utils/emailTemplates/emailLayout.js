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
background:#0D0D0D;
font-family:Arial,Helvetica,sans-serif;
"
>

<table
width="100%"
cellpadding="0"
cellspacing="0"
border="0"
>

<tr>

<td align="center">

<table
width="100%"
cellpadding="0"
cellspacing="0"
border="0"
style="
max-width:620px;
width:100%;
background:#131313;
border:1px solid rgba(212,175,55,.18);
border-radius:24px;
overflow:hidden;
"
>

<!-- Brand -->

<tr>

<td
align="center"
style="
padding:55px 40px 35px;
"
>

<h1
style="
margin:0;
font-size:36px;

font-family:Georgia,'Times New Roman',serif;
font-weight:600;
color:#F5E6C8;
letter-spacing:1px;
"
>

UrbanCart

</h1>

<p
style="
margin-top:14px;
font-size:15px;
letter-spacing:1.5px;
font-weight:500;
color:#D4AF37
"
>

Luxury Fashion • Beauty

</p>
<p
style="
margin-top:22px;
font-size:14px;
color:#999999;
font-style:italic;
"
>

Crafted for timeless elegance.

</p>


</td>

</tr>

<tr>

<td>

<div
style="
height:1px;
background:rgba(212,175,55,.18);
"
></div>

</td>

</tr>

<!-- Content -->

<tr>

<td
style="
padding:30px 20px;
"
>

<p
style="
margin:0;
font-size:18px;
color:#FFFFFF;
"
>

${greeting}

</p>

<h2
style="
margin:30px 0 20px;
font-size:30px;
line-height:38px;
word-break:break-word;
font-family:Georgia,'Times New Roman',serif;
font-weight:600;

color:#F5E6C8;
"
>

${heading}

</h2>
<div
style="
width:70px;
height:2px;
background:#D4AF37;
margin:24px 0 28px;
"
></div>


<table
cellpadding="0"
cellspacing="0"
border="0"
style="
margin-top:45px;
"
>

<tr>

<td
style="
border:1px solid #D4AF37;
border-radius:10px;
"
>

<a
href="${buttonUrl}"
target="_blank"
style="
display:inline-block;
padding:14px 34px;
font-size:15px;
font-weight:500;
letter-spacing:1.5px;

text-decoration:none;
color:#D4AF37;
"
>

${buttonText} →

</a>

</td>

</tr>

</table>




<!-- Closing Note -->

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
margin-top:55px;
"
>

<tr>

<td>

<div
style="
height:1px;
background:rgba(212,175,55,.12);
margin-bottom:35px;
"
></div>

<p
style="
margin:0;
max-width:430px;
font-size:15px;
line-height:28px;
color:#8F8F8F;
"
>

If you didn't request this email, you can safely ignore it.
No further action is required.

</p>

</td>

</tr>

</table>




</td>

</tr>

<tr>

<td
align="center"
style="
padding:35px 45px;
border-top:1px solid rgba(212,175,55,.12);
"
>

<p
style="
margin:0;
font-size:15px;
color:#F5E6C8;
font-family:Georgia,serif;
"
>

UrbanCart

</p>

<p
style="
margin:10px 0 0;
font-size:14px;
color:#999999;
"
>

support@urbancart.com

</p>

<p
style="
margin:25px 0 0;
font-size:13px;
color:#666666;
"
>

${footerText || "© 2026 UrbanCart. All Rights Reserved."}

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


