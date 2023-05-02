const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if(req.method === 'GET') res.send('GEt requests are disabled')
//   else next()
// });

// app.use((req, res, next) => {
//   res.status(503).send("Site under maintenance. Check back soom");
// });

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
exports.app = functions.https.onRequest(app);

const Task = require("./models/task");
const User = require("./models/user");

// const main = async () => {
//   // const task = await Task.findById("644f8e34a1d9f819c33d4c9a");
//   // await task.populate("owner");
//   // console.log(task.owner);

//   const user = await User.findById("644f8a0a8cef1f2270702af9");
//   await user.populate("tasks");
//   console.log(user.tasks);
// };

// main();
