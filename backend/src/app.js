const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const playerRoutes = require("./routes/playerRoutes");
const teamRoutes = require("./routes/teamRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const matchRoutes = require("./routes/matchRoutes");

const adminRoutes = require("./routes/adminRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://dreamcup.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);

      // Check if it is in our list of allowed origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Check process.env.ALLOWED_ORIGINS (comma-separated list)
      if (process.env.ALLOWED_ORIGINS) {
        const customOrigins = process.env.ALLOWED_ORIGINS.split(",").map(o => o.trim());
        if (customOrigins.includes(origin)) {
          return callback(null, true);
        }
      }

      // Check process.env.FRONTEND_URL
      if (process.env.FRONTEND_URL && process.env.FRONTEND_URL === origin) {
        return callback(null, true);
      }

      // Allow localhost with any port and Vercel previews/branches
      const isLocalhost = /^http:\/\/localhost(:\d+)?$/.test(origin);
      const isVercelPreview = /^https:\/\/dreamcup-.*\.vercel\.app$/.test(origin);

      if (isLocalhost || isVercelPreview) {
        return callback(null, true);
      }

      // Reject other origins
      console.warn(`CORS blocked origin: ${origin}`);
      const corsError = new Error(`Origin ${origin} not allowed by CORS`);
      corsError.status = 403;
      return callback(corsError);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/matches", matchRoutes);

app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "DreamCup API Running 🚀",
  });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Only return stack trace in development
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

module.exports = app;