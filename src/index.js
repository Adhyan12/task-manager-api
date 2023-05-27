const express = require("express");
require("./db/mongoose");
require("dotenv").config();
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

//test route
app.get("/", (req, res) => {
  res.send("Server status ::: running!");
});
//start the server
app.listen(port, () => {
  console.log("Server listening at port...", port);
});
