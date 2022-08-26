import mongoose from 'mongoose';
import DATABASE from './database_schema.js';
const DBNAME = "animalhouse";
const url = `mongodb://localhost:27017/${DBNAME}`;

var fakeUsers = ["aldo", "giovanni", "giacomo"]

async function init(){
    console.log("Clearing database...");
    await mongoose.connect(url);
    console.log("connected...");
    await mongoose.connection.db.dropDatabase(console.log(`${mongoose.connection.db.databaseName} e' stato pulito`));
    for(let u of fakeUsers){
        console.log(u)
        var u = await DATABASE.User.create({
            username:u,
            password:`s3cr3t${u}`,
            isPoster:false
        });
    }
    process.exit();
}
  

init();