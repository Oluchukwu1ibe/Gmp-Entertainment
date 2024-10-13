const welcomeTemplate = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to GMPEntertainment</title>
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
          text-align: center;
        }
        .logo {
          width: 60px;
          margin: 20px auto;
        }
        .header {
          background-color: #000;
          padding: 20px;
          color: #fff;
          border-radius: 8px 8px 0 0;
        }
        .header h2 {
          font-size: 28px;
          font-weight: 600;
        }
        .welcome-message {
          margin: 40px 0;
        }
        .welcome-message h3 {
          font-size: 24px;
          font-weight: 600;
          color: #B59410;
        }
        .welcome-message p {
          font-size: 16px;
          color: #666;
          margin-bottom: 20px;
        }
        .action-buttons a {
          display: inline-block;
          padding: 12px 24px;
          margin: 10px;
          font-size: 16px;
          color: #fff;
          background-color: #B59410;
          text-decoration: none;
          border-radius: 4px;
        }
        .action-buttons a:hover {
          background-color: #333;
        }
        .get-app {
          margin: 40px 0;
        }
        .get-app h3 {
          font-size: 20px;
          font-weight: 500;
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
        .footer p {
          font-size: 12px;
          color: #666;
        }
          .footer-socials a {
                margin: 0 10px;
            }
            .footer-socials img {
                width: 30px;
            }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Logo Section -->
<img src="https://res.cloudinary.com/dghrve7zl/image/upload/v1728779486/gmp_logo_h2apua.png" alt="GMP Logo">

        <!-- Header Section -->
        <div class="header">
          <h2>Welcome to GMPEntertainment!</h2>
        </div>

        <!-- Welcome Message Section -->
        <div class="welcome-message">
          <h3>We're thrilled to have you on board!</h3>
          <p>At GMPEntertainment, we bring you the best in music, movies, and interactive entertainment. As a new member, you now have access to our exclusive content, personalized recommendations, and more.</p>
          <p>To get started, explore your dashboard, set up your preferences, and dive into the world of GMPEntertainment.</p>
        </div>

        <!-- Call-to-Action Buttons -->
        <div class="action-buttons">
          <a href="https://gmpentertainment.com/explore" target="_blank">Explore GMP</a>
          <a href="https://gmpentertainment.com/dashboard" target="_blank">Go to Dashboard</a>
        </div>

        <!-- Get App Section -->
        <div class="get-app">
          <h3>Get the GMPEntertainment App!</h3>
          <a href="#"><img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1687788964/xg1xs3cexaebxvabynr8.png" alt="App Store"></a>
          <a href="#"><img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1687788966/qnjqvcftrlqvztl6bqv1.png" alt="Google Play"></a>
          <p>Make the most of your experience by downloading our mobile app. Log in with your email and password to access your account on the go.</p>
        </div>

        <!-- Footer Section -->
        <div class="footer">
        <div class="footer-socials">
                    <a href="#"><img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1688986596/twitterlogo_w6imak.png" alt="Twitter"></a>
                    <a href="#"><img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1688986679/facebooklogo_iyntcg.png" alt="Facebook"></a>
                    <a href="#"><img src="https://res.cloudinary.com/dhekqilcw/image/upload/v1688986662/linkedin_yzexwx.png" alt="LinkedIn"></a>
                </div>
          <p>Copyright &copy; 2024 GMPEntertainment. All Rights Reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default welcomeTemplate;
