const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("./logger");
const { isOperationalError, logErrorMiddleware, returnResponse } = require("./lib/error/errorHandler");

//routes
const authRouter = require("./domains/auth/auth.api");
const chatRouter = require("./domains/chat/chat.api");
const messageRouter = require('./domains/message/message.api');
const userProfileRouter = require('./domains/user/user.api');
const cookieParser = require("cookie-parser");

const port = 4202;
const app = express();

// TODO - this is temporary, just so the frontend can make requests to the server
app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/messages",messageRouter);
app.use("/users",userProfileRouter);
app.use("/allusers",userProfileRouter);
app.use("/auth", authRouter);
app.use("/chat", chatRouter);


app.get("/", (req, res) => {
  res.send("Welcome to the backend of Ambitious Messenger 😎");
});

// allow promise rejections to be thrown as errors
process.on("unhandledRejection", (error) => {
  throw error;
});

// if fatal error allow backend to exit gracefully
process.on("uncaughtException", (error) => {
  logError(error);

  if (!isOperationalError(error)) {
    process.exit(1);
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error(error);
  }
  console.log(`server is running 🏃💨 @ port ${port}`);
});
