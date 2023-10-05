const express = require("express");
const app = express();
const port = 4202;

app.get("/", (req, res) => {
  res.send("Welcome to the backend of Ambitious Messenger 😎");
});

app.listen(port, (err) => {
  if (err) {
    console.error(error);
  }
  console.log(`server is running 🏃💨 @ port ${port}`);
});
