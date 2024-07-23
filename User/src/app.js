import 'dotenv/config'
import express from "express";
import connectDB from "./config/database.js";
import  authRoute from "./routes/authRoute.js";
import voteRoute from "./routes/voteRoute.js";
import contestantRoute from "./routes/contestantRoute.js";
import commentRoute from "./routes/commentRoute.js";
import  http from "http";
import axios from "axios";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const corsOptions = { 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
};

app.use(cors(corsOptions));
app.use("/api", authRoute);
app.use("/api/vote",voteRoute);
app.use("/api/contestant",contestantRoute);
app.use("/api/comment",commentRoute);

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
  console.log(`Server is running on http://localhost:${PORT}`);
});
