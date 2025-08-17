require("dotenv").config();

const os = require("os"); // for getting ip addres to log when start app :)
const express = require("express");
const cors = require("cors"); // access for limited sources
const cookieParser = require("cookie-parser"); // cookies processing

const commentsRoutes = require("./routes/commentsRoutes"); // routes

const authMiddleware = require("./middleware/authMiddleware"); // middlewares
const logMiddleware = require("./middleware/logMiddlware"); // logging

const providedIp = os.networkInterfaces()["wlp1s0"][0].address; // get ip provided by router
const PORT = process.env.PORT || 3000; // define port

const endpoints = ["/", "/comments"]; // endpoints list

const app = express(); // main app

const corsOptions = {
  origin: ["http://localhost:5173", "http://192.168.0.151:5173"],
};
app.use(cors());

app.use(cookieParser());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend!" });
});

app.use(authMiddleware);
app.use("/comments", commentsRoutes);

app.use(logMiddleware);

app.listen(PORT, () => {
  console.log("listen on:", PORT);
  console.log("url:", `http://${providedIp}:${PORT}`);
  console.log("endpoints: ");
  endpoints.forEach((e) => {
    console.log(`http://${providedIp}:${PORT}${e}`);
  });
});
