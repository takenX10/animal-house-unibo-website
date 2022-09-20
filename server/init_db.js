import DATABASE from './database.js';

// s3cr3t_aldo
var fakeUsers = ["aldo", "giovanni", "giacomo"]
var Pets = [
    {
        ownerid: 1,
        name: "Baloo",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi distinctio adipisci esse possimus, earum odio amet? Blanditiis magni ratione quas assumenda eum corporis quod dolores facilis, enim nam voluptatum porro?",
        weight: 5,
        race: "Dog",
        sex: "Male",
        age: 11,
        petid: 1,
        likedBy: [],
        matchedBy:[],
        imgList: ["https://www.cedarcityutah.com/wp-content/uploads/2019/06/cropped-maltese-puppies-STGNews.jpg"]
    },
    {
        ownerid: 2,
        name: "Arturo",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi distinctio adipisci esse possimus, earum odio amet? Blanditiis magni ratione quas assumenda eum corporis quod dolores facilis, enim nam voluptatum porro?",
        weight: 3,
        race: "Dog",
        sex: "Male",
        age: 13,
        petid: 2,
        likedBy: [],
        matchedBy:[],
        imgList: ["https://www.cedarcityutah.com/wp-content/uploads/2019/06/cropped-maltese-puppies-STGNews.jpg"]
    }
];

const products=[
    {
      name: 'Nika Slim shirt',
      slug: 'nika-slim-shirt',
      category: 'Shirts',
      image: '/images/p1.jpg',
      price: 120,
      countInStock: 5,
      brand: 'Subemelaradjio',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality raccoon'
    },
    {
      name: 'Nika Slim Pant',
      slug: 'nika-slim-pant',
      category: 'Pants',
      image: '/images/p1.jpg',
      price: 25,
      countInStock: 0,
      brand: 'Subemelaradjio',
      rating: 3.5,
      numReviews: 42,
      description: 'high quality raccoon'
    },
    {
      name: 'Supreme jacket',
      slug: 'supreme-drip',
      category: 'Jackets',
      image: '/images/drip.jpg',
      price: 999999,
      countInStock: 1,
      brand: 'drippythangs',
      rating: 5.0,
      numReviews: 0,
      description: 'high quality drip'
    },
];

async function init(){
    let mongoose = await DATABASE.connect();
    console.log("Clearing database...");
    await mongoose.connection.db.dropDatabase(console.log(`${mongoose.connection.db.databaseName}-db has been cleared`));
    console.log("Adding starting elements to database...");
    let i = 1;
    for(let u of fakeUsers){
        await DATABASE.User.create({
            username:u,
            password:`secret_${u}`,
            id: i,
            isPoster:false
        });
        i++;
    }
    console.log("Adding pets to database...");
    await DATABASE.Pet.insertMany(Pets);
    console.log("Adding products...");
    await DATABASE.Product.insertMany(products);
    console.log("done!");
    process.exit();
}
  

init();