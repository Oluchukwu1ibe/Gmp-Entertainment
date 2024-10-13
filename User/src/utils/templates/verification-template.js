const verificationTemplate = (generateOtp) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email OTP</title>
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
            .otp-section {
                text-align: center;
                margin: 40px 0;
            }
            .otp-section p {
                font-size: 16px;
                color: #333;
            }
            .otp-section .otp {
                font-size: 36px;
                font-weight: bold;
                color: #B59410;
                margin: 20px 0;
            }
            .get-app-section {
                text-align: center;
            }
            .get-app-section hr {
                width: 150px;
                border: 1px solid rgba(0, 0, 0, 0.24);
            }
            h3 {
                font-size: 24px;
                margin-bottom: 16px;
                font-weight: 500;
                color: #000;
            }
            .get-app-section p {
                font-size: 14px;
                color: #000;
                width: 90%;
                max-width: 512px;
                margin: 0 auto 20px;
            }
            .get-app-section img {
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
            @media (max-width: 600px) {
                .container {
                    padding: 10px;
                }
                .otp-section {
                    margin: 20px 0;
                }
                .get-app-section h3 {
                    font-size: 20px;
                }
                .get-app-section img {
                    max-width: 100px;
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

            <!-- OTP Section -->
            <div class="otp-section">
                <p>Please verify your email by entering this pin on the verification page</p>
                <p class="otp">${generateOtp?.toString()}</p>
            </div>
            <!-- Get the App Section -->
            <div class="get-app-section">
                <h3>Get the GMPEntertainment App!</h3>
                <img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1690635292/Group_dvmkgi.png" alt="App Store">
                <img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1690635312/googleplay_ymmdxj.png" alt="Google Play Store">
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
                <p>Copyright &copy; 2024 GMP Entertainment. All Rights Reserved.</p>
            </div>
        </div>
    </body>
    </html>`;
};

export default verificationTemplate;
