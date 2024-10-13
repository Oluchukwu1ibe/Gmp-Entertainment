const fgPasswordTemplate = (resetLink) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Anek+Gurmukhi:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: 'Anek Gurmukhi', sans-serif;
                background-color: #f9f9f9;
                color: #333;
                box-sizing: border-box;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
            }
            .header {
                background-color: #000;
                padding: 20px;
                text-align: center;
                color: #fff;
                border-radius: 8px 8px 0 0;
            }
            .header img {
                width: 50px;
                height: 50px;
                border-radius: 8px;
                margin-right: 10px;
            }
            .header h2 {
                font-size: 22px;
                margin: 0;
                font-weight: 600;
            }
            .reset {
                text-align: center;
                margin: 40px 0;
            }
            .reset p {
                font-size: 16px;
                color: #333;
                margin-bottom: 30px;
            }
            .reset a {
                display: inline-block;
                background-color: #B59410;
                color: #fff;
                text-decoration: none;
                padding: 12px 24px;
                font-size: 18px;
                font-weight: 600;
                border-radius: 4px;
            }
            .get-app hr {
                width: 125px;
                margin: 0 auto;
                border: 1px solid rgba(0, 0, 0, 0.24);
                margin-bottom: 16px;
            }
            h3 {
                font-weight: 400;
                font-size: 24px;
                line-height: 32px;
                margin-bottom: 16px;
                text-align: center;
            }
            .get-app {
                text-align: center;
            }
            .get-app p {
                font-size: 14px;
                color: #000;
                width: 90%;
                max-width: 512px;
                margin: 0 auto 20px;
            }
            .get-app img {
                max-width: 120px;
                margin: 10px;
                cursor: pointer;
            }
            
            .footer {
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center;
                border-radius: 0 0 8px 8px;
            }
            .footer img {
                width: 60px;
                margin-bottom: 10px;
            }
            .footer-socials a {
                margin: 0 10px;
            }
            .footer-socials img {
                width: 30px;
            }
            .footer p {
                font-size: 12px;
                color: #666;
                margin: 10px 0 0;
            }
            @media screen and (max-width: 640px) {
                .reset {
                    width: 90%;
                }
                .reset button {
                    width: 100%;
                }
                .get-app p {
                    width: 90%;
                }
                .get-app h3 {
                    font-size: 20px;
                }
                .get-app img {
                    max-width: 100px;
                }
            }
            @media screen and (max-width: 1024px) {
                .reset {
                    width: 70%;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
        <!-- Header Section -->
            <div class="header">
                <img src="https://res.cloudinary.com/dghrve7zl/image/upload/v1728779486/gmp_logo_h2apua.png" alt="GMP Logo">
                <h2>GMP Entertainment</h2>
            </div>
            <div class="reset">
                <p>You’re receiving this email because you’ve requested to reset your password. To proceed with the password reset, please click the link below within the next 10 minutes. If you did not request this, you can safely ignore this email.</p>
                <a href="${resetLink}" target="_blank">Reset Password</a>
            </div>
                <div class="get-app">
                <h3>Get the GMPEntertainment App!</h3>
                <img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1690635292/Group_dvmkgi.png" alt="App Store">
                <img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1690635312/googleplay_ymmdxj.png" alt="Google Play Store">
                <p>Make the most of your experience by downloading our mobile app. Log in with your email and password to access your account on the go.</p>
            </div>
            <div class="footer">
                <img src="https://res.cloudinary.com/dghrve7zl/image/upload/v1728779486/gmp_logo_h2apua.png" alt="GMP Logo">
                <div class="footer-socials">
                    <a href="#"><img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1688986596/twitterlogo_w6imak.png" alt="Twitter"></a>
                    <a href="#"><img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1688986679/facebooklogo_iyntcg.png" alt="Facebook"></a>
                    <a href="#"><img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1688986662/linkedin_yzexwx.png" alt="LinkedIn"></a>
                </div>
                <p>Copyright &copy; 2024 GMP Entertainment. All Rights Reserved.</p>
            </div>
        </div> 
    </body>
    </html>`;
};

export default fgPasswordTemplate;
