const resetPasswordTemplate = () => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Changed</title>
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
            .password {
                text-align: center;
                margin: 40px 0;
            }
            .password h2 {
                font-size: 36px;
                line-height: 44px;
                font-weight: 600;
                color: #333;
                margin-bottom: 24px;
            }
            .password p {
                font-size: 16px;
                color: #333;
                margin-bottom: 16px;
                line-height: 1.6;
            }
            .password a {
                color: #B59410;
                text-decoration: none;
                font-weight: bold;
            }
            .get-app {
                text-align: center;
                margin: 40px 0;
            }
            .get-app h3 {
                font-size: 24px;
                margin-bottom: 16px;
            }
            .get-app {
                text-align: center;
            }
            .get-app p {
                font-size: 16px;
                color: #666;
                max-width: 512px;
                margin: 0 auto 24px;
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
            .footer img.logo {
                width: 60px;
                margin-bottom: 10px;
            }
            .footer-socials img {
                width: 30px;
                margin: 0 10px;
                cursor: pointer;
            }
            .footer p {
                font-size: 12px;
                color: #666;
            }
            @media screen and (max-width: 640px) {
                .password h2 {
                    font-size: 28px;
                    line-height: 36px;
                }
                .get-app p {
                    width: 90%;
                }
                .get-app img {
                    flex-direction: column;
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

            <!-- Password Changed Confirmation -->
            <div class="password">
                <h2>You’ve Just Changed Your Password</h2>
                <p>We just wanted to confirm that you’ve successfully changed your password. If you did not initiate this change, please <a href="mailto:support@getsavey.com">Contact Us</a> right away.</p>
                <p>It’s important to let us know so we can help protect your GMP account from unauthorized access.</p>
            </div>

            <!-- App Promotion Section -->
            <div class="get-app">
                <h3>Get the GMPEntertainment App!</h3>
                <a href="#"><img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1687788964/xg1xs3cexaebxvabynr8.png" alt="App Store Logo"></a>
                <a href="#"><img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1687788966/qnjqvcftrlqvztl6bqv1.png" alt="Google Play Store Logo"></a>
                <p>Make the most of your experience by downloading our mobile app. Log in with your email and password to access your account on the go.</p>
            </div>

            <!-- Footer Section -->
            <div class="footer">
                <img src="https://res.cloudinary.com/dghrve7zl/image/upload/v1728779486/gmp_logo_h2apua.png" alt="GMP Logo">
                <div class="footer-socials">
                    <a href="#"><img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1688986596/twitterlogo_w6imak.png" alt="Twitter"></a>
                    <a href="#"><img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1688986679/facebooklogo_iyntcg.png" alt="Facebook"></a>
                    <a href="#"><img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1688986662/linkedin_yzexwx.png" alt="LinkedIn"></a>
                </div>
                <p>&copy; 2024 GMP Entertainment. All Rights Reserved.</p>
            </div>
        </div>
    </body>
    </html>`;
};

export default resetPasswordTemplate;
