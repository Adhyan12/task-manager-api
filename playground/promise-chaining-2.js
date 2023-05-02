require("../src/db/mongoose");
const Task = require("../src/models/task");

// id: 6448e99d2a6c531b4c4ecb10

// Task.findByIdAndDelete('6448e99d2a6c531b4c4ecb10').then((tasks)=>{
//     console.log(tasks);
//     return Task.countDocuments({completed: false})
// }).then((count)=>{
//     console.log(count);
// }).catch((error)=>{
//     console.log(error);
// })

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("6448e9c6c76820d8765daf22").then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})