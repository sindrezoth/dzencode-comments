require("dotenv").config();

const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser"); // cookies processing
const helmet = require("helmet");

const commentsRoutes = require("./routes/commentsRoutes"); // routes
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const signRoutes = require("./routes/signRoutes");
const generateRoutes = require("./routes/generateRoutes");
const filesRoutes = require("./routes/filesRoutes");

const logMiddleware = require("./middleware/logMiddlware"); // logging
const requestLogMiddleware = require("./middleware/requestLogMiddleware");

const PORT = process.env.BACKEND_PORT || 3000; // define port

const app = express(); // main app

app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(requestLogMiddleware);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend!" });
});
app.use("/", signRoutes);

app.use("/auth", authRoutes);

app.use("/users", usersRoutes);
app.use("/comments", commentsRoutes);

app.use("/generate", generateRoutes);

app.use("/files", filesRoutes);

app.use(logMiddleware);

app.listen(PORT, "0.0.0.0", () => {
  console.log("listen on:", PORT);
});
