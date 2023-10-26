const express = require("express");
const auth = require("./domains/auth/auth.api");
const bodyParser = require("body-parser");
const { isOperationalError } = require("./lib/error/errorHandler");
const logger = require("./logger");
const app = express();

const port = 4202;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the backend of Ambitious Messenger 😎");
});

app.use("/auth", auth);
// if fatal error allow backend to exit gracefully
// process.on("uncaughtException", (error) => {
//   logger.fatal(error);

//   if (!isOperationalError(error)) {
//     process.exit(1);
//   }
// });

app.listen(port, (err) => {
  if (err) {
    console.error(error);
  }
  console.log(`server is running 🏃💨 @ port ${port}`);
});
