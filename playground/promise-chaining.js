require("../src/db/mongoose");
const User = require("../src/models/user");

//6448edfc028c720ba849fce7

// User.findByIdAndUpdate("6448ef98a088a0defae9767c", { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count
};


updateAgeAndCount('6448ef98a088a0defae9767c', 2).then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})