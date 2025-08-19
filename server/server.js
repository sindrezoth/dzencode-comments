require("dotenv").config();

const fs = require("fs");
const express = require("express");
const cors = require("cors"); // access for limited sources
const cookieParser = require("cookie-parser"); // cookies processing

const commentsRoutes = require("./routes/commentsRoutes"); // routes
const authRoutes = require("./routes/authRoutes");
const signRoutes = require("./routes/signRoutes");

const authMiddleware = require("./middleware/authMiddleware"); // middlewares
const logMiddleware = require("./middleware/logMiddlware"); // logging
const requestLogMiddleware = require("./middleware/requestLogMiddleware");

const PORT = process.env.PORT || 3000; // define port

const endpoints = ["/", "/comments"]; // endpoints list

const app = express(); // main app

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: [
    "https://stafeelacock.local",
    // "http://localhost:5173",
    // "http://192.168.0.151:5173",
    // "http://192.168.0.7:5173",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "authorization"],
};
app.use(cors(corsOptions));

app.use(requestLogMiddleware);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend!" });
});

app.use("/auth", authRoutes);

// app.use(authMiddleware);
app.use("/", signRoutes);
app.use("/comments", commentsRoutes);

app.use(logMiddleware);

// app.listen(PORT, '0.0.0.0', () => {
app.listen(PORT, "127.0.0.1", () => {
  console.log("listen on:", PORT);
  console.log(endpoints);
});
