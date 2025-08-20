require("dotenv").config();

const fs = require("fs");
const express = require("express");
const cors = require("cors"); // access for limited sources
const cookieParser = require("cookie-parser"); // cookies processing

const commentsRoutes = require("./routes/commentsRoutes"); // routes
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const signRoutes = require("./routes/signRoutes");

const authMiddleware = require("./middleware/authMiddleware"); // middlewares
const logMiddleware = require("./middleware/logMiddlware"); // logging
const requestLogMiddleware = require("./middleware/requestLogMiddleware");
const { postUserService, getUserService } = require("./services/usersService");
const { postCommentService, getCommentService } = require("./services/commentsService");
const { getComment } = require("./controllers/commentsController");

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

app.get("/genUsers", async (req, res) => {
  let data = await fetch('https://randomuser.me/api/?inc=email,login&&results=1000');
  data = await data.json();

  const users = data.results.map(({email, login: {username}}) => ({email, username}));

  for (const user of users) {
    try {
      await postUserService(user);
      console.log(`added: ${user.username}, ${user.email}`);
    }
    catch (err) {
      console.log(err);
    }
  }

  res.json({message: "users generated."});
})

app.get("/genComments", async (req, res) => {
  const count = 10000;
  const textTemplate = "lorem ipsum dolor sit amet consectetur adipisicing elit. praesentium debitis dolore ea eum! animi consequuntur minima eum accusan tium, laboriosam molestias neque autem totam suscipit natus nemo labore, ut tenetur exercitationem.";

    // userId: "user_id",
    // text: "text",
    // replyTo: "reply_to",

  for (let i = 0; i < count; i++ ){
    const comment = {
      userId: '',
      text: textTemplate,
    };

    const user = await getUserService()
    comment.userId = user.userId;
    if(Math.random() < 0.75) {
      const replyTo = await getCommentService();
      if(replyTo.commentId) {
       comment.replyTo =  replyTo.commentId;
      }
    }

    await postCommentService(comment);

    // if()
    // await postCommentService
  }

  res.json({message: "generated"});
});

app.get("/randomComment", getComment)

app.use("/auth", authRoutes);

// app.use(authMiddleware);
app.use("/", signRoutes);
app.use("/users", usersRoutes);
app.use("/comments", commentsRoutes);

app.use(logMiddleware);

// app.listen(PORT, '0.0.0.0', () => {
app.listen(PORT, "127.0.0.1", () => {
  console.log("listen on:", PORT);
  console.log(endpoints);
});
