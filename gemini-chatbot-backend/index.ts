const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
console.log("PORT:", port);

app.use("/", (req, res) => {
  res.send("Server is running.");
});

app.listen(port, console.log("server started on PORT " + port));
