import DATABASE from './database_schema.js';

// s3cr3t_aldo
var fakeUsers = ["aldo", "giovanni", "giacomo"]

async function init(){
    let mongoose = await DATABASE.connect();
    console.log("Clearing database...");
    await mongoose.connection.db.dropDatabase(console.log(`${mongoose.connection.db.databaseName}-db has been cleared`));
    console.log("Adding starting elements to database...");
    for(let u of fakeUsers){
        await DATABASE.User.create({
            username:u,
            password:`s3cr3t_${u}`,
            isPoster:false
        });
    }
    console.log("done!");
    process.exit();
}
  

init();