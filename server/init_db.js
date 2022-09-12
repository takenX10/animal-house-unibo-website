import DATABASE from './database_schema.js';

// s3cr3t_aldo
var fakeUsers = ["aldo", "giovanni", "giacomo"]
var Pets = [
    {
        ownerid: 1,
        name: "Baloo",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi distinctio adipisci esse possimus, earum odio amet? Blanditiis magni ratione quas assumenda eum corporis quod dolores facilis, enim nam voluptatum porro?",
        weight: 5,
        race: "Dog",
        petid: 1,
        likedBy: [],
        matchedBy:[]
    },
    {
        ownerid: 2,
        name: "Arturo",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi distinctio adipisci esse possimus, earum odio amet? Blanditiis magni ratione quas assumenda eum corporis quod dolores facilis, enim nam voluptatum porro?",
        weight: 3,
        race: "Dog",
        petid: 2,
        likedBy: [],
        matchedBy:[]
    }
]
async function init(){
    let mongoose = await DATABASE.connect();
    console.log("Clearing database...");
    await mongoose.connection.db.dropDatabase(console.log(`${mongoose.connection.db.databaseName}-db has been cleared`));
    console.log("Adding starting elements to database...");
    let i = 1;
    for(let u of fakeUsers){
        await DATABASE.User.create({
            username:u,
            password:`s3cr3t_${u}`,
            id: i,
            isPoster:false
        });
        i++;
    }
    console.log("Adding pets to database...");
    for(let p of Pets){
        await DATABASE.Pet.create(p);
    }
    console.log("done!");
    process.exit();
}
  

init();