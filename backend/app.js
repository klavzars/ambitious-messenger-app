const express = require("express");
const auth = require("./domains/auth/auth.api");
const bodyParser = require("body-parser");
const app = express();

const port = 4202;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the backend of Ambitious Messenger 😎");
});

app.use("/auth", auth);

app.listen(port, (err) => {
  if (err) {
    console.error(error);
  }
  console.log(`server is running 🏃💨 @ port ${port}`);
});
