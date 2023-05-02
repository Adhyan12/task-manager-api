const mongoose = require("mongoose");
// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')
console.log("file loaded");
mongoose
  .connect(
    "mongodb+srv://adhyangupta1999:0Ctpsl6uiooroFDy@cluster0.iem16td.mongodb.net/task-manager-api?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((e) => {
    console.log(e);
  });
