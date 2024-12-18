require('dotenv/config');
const express = require('express');
const connectDB = require('./config/database.js');
const authRoute = require('./routes/authRoute.js');
const voteRoute = require('./routes/voteRoute.js');
const contestantRoute = require('./routes/contestantRoute.js');
const commentRoute = require('./routes/commentRoute.js');
const logger = require('./utils/log/log.js');
const http = require('http');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()), 
    },
  })
);

const corsOptions = { 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use("/api", authRoute);
app.use("/api/vote", voteRoute);
app.use("/api/contestant", contestantRoute);
app.use("/api/comment", commentRoute);

app.get("/", (req, res) => {
  res.send("Welcome to our streaming Platform");
});

// Endpoint to fetch and return stream details
app.get('/stream', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:2025/stream');
    const streamDetails = response.data;
    res.json(streamDetails);
  } catch (error) {
    console.error('Error fetching stream details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

server.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
