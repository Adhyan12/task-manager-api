const { MongoClient: mongodb, ObjectId } = require("mongodb");

const connectionURL = "mongodb://localhost:27017";
const databaseName = "task-manager";
const id = new ObjectId();

console.log(id);
console.log(id.getTimestamp());

mongodb
  .connect(connectionURL, { useUnifiedTopology: true })
  .then(async (client) => {
    console.log("Databse service connected successfully!");
    const db = client.db(databaseName);
    // insertBulk(db);

    // const findResult =  await db.collection('users').find({_id: new ObjectId("6447b78eac552296458e95d6")}).toArray();
    // console.log(findResult);
    // console.log(await db.collection('users').countDocuments({name: 'Adi'}));

    //updateOne

    // db.collection('users').updateOne({
    //   _id: new ObjectId('6447b710056368ddf657d404')
    // }, {
    //   $inc:{
    //     age: 1
    //   }
    // }).then((result)=>{
    //   console.log(result);
    // }).catch((error)=>{
    //   console.log(error);
    // })

    //updateMany

    // db.collection("tasks")
    //   .updateMany(
    //     { completed: !false },
    //     {
    //       $set: {
    //         completed: !true,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // deleteOne
    db.collection('tasks').deleteOne({
      task: 'watch movie'
    }).then(({deletedCount})=>{
      console.log(deletedCount);
    }).catch((error)=>{
      console.log(error);
    })
    // deleteMany
    // db.collection('tasks').deleteMany({
    //   task: 'Study',
    //   completed: true
    // }).then((result)=>{
    //   console.log(result);
    // }).catch((error)=>{
    //   console.log(error);
    // })
    
    // db.collection('users').insertOne({
    //     name: 'Aditi',
    //     age: 23
    // }).then((res)=>{
    //   // if(error){
    //   //   return console.log('Unable to insert user');
    //   // }

    //   console.log(res);

    // })
  });

function insertBulk(db) {
  db.collection("tasks").insertMany([
    {
      task: "Go to market",
      completed: true,
    },
    {
      task: "Study",
      completed: true,
    },
    {
      task: "watch movie",
      completed: false,
    },
  ]);
}

// function main(){
//   client.connect();
//   console.log('Connected successfully');
//   const db = client.db(databaseName);

//     db.collection('users').insertOne({
//         name: 'Adhyan',
//         age: 23
//     })
// }

// main()
