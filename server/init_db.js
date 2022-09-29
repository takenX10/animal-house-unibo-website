import DATABASE from './database.js';
import bcrypt, { genSaltSync } from 'bcrypt';

// s3cr3t_aldo
var fakeUsers = [{
    name:"Aldo",
    surname:"Baglio",
    email:"aldo@baglio.tk",
    password:bcrypt.hashSync("aldobaglio",genSaltSync()),
  },
  {
    name:"Giovanni",
    surname:"Storti",
    email:"giovanni@storti.tk",
    password:bcrypt.hashSync("giovannistorti",genSaltSync()),
  }, 
  {
    name:"Giacomo",
    surname:"Poretti",
    email:"giacomo@poretti.tk",
    password:bcrypt.hashSync("giacomoporetti",genSaltSync()),
  },]
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
    matchedBy: [],
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
    matchedBy: [],
    imgList: ["https://www.cedarcityutah.com/wp-content/uploads/2019/06/cropped-maltese-puppies-STGNews.jpg"]
  }
];

const products = [
  {
    name: 'Nika Slim shirt',
    slug: 'nika-slim-shirt',
    category: 'Shirts',
    poster: '/images/p1.jpg',
    images: [],
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
    poster: '/images/p1.jpg',
    images: [],
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
    poster: '/images/p1.jpg',
    images: [],
    price: 999999,
    countInStock: 1,
    brand: 'drippythangs',
    rating: 5.0,
    numReviews: 0,
    description: 'high quality drip'
  },
];

const servicesFaceToFace = [
  {
    slug: "wow-vet",
    userId: 1,
    title: "Vet wow!",
    poster: "https://img.freepik.com/free-photo/close-up-veterinarian-taking-care-cat_23-2149100168.jpg?w=2000",
    category: "vet",
    shifts: [
      {
        day: "Monday",
        begin: "8:00",
        end: "13:00"
      },
      {
        day: "Wednesday",
        begin: "14:00",
        end: "19:00"
      },
    ],
    images: ['https://img.freepik.com/free-photo/close-up-veterinarian-taking-care-cat_23-2149100168.jpg?w=2000'],
    hourlyRate: 10,
    description: "Something idk this should be vet",
    rating: 5,
    numReviews: 10,
    opts: [
      {
        type: "select",
        name: "animal",
        label: "animal",
        required: false,
        fields: [
          "cat",
          "dog",
          "airplane",
          "frog"
        ],
      },
      {
        type: "checkbox",
        name: "properties",
        label: "Properties",
        required: false,
        labels: ["is aggressive"],
      },
      {
        type: "radio",
        name: "gender",
        label: "Gender",
        required: false,
        labels: [
          'male',
          'female',
        ]
      },
      {
        type: "text",
        name: "pet_name",
        label: "Pet name",
        required: false,
        description: "So what's your pet name?",
      },
      {
        type: "text",
        name: "pet_best_friend",
        label: "Pet best friend",
        required: false,
        description: "So what's your pet's best friend name?",
      }
    ]
  },
  {
    slug: "wow-sitter",
    userId: 1,
    title: "Dog sitter wow!",
    poster: "https://www.zooplus.it/magazine/wp-content/uploads/2020/06/dog-sitter.jpeg",
    category: "dog-sitter",
    shifts: [
      {
        day: "Monday",
        begin: "8:00",
        end: "13:00"
      },
      {
        day: "Wednesday",
        begin: "14:00",
        end: "19:00"
      },
    ],
    images: ['https://www.zooplus.it/magazine/wp-content/uploads/2020/06/dog-sitter.jpeg'],
    hourlyRate: 15,
    description: "Something idk this should be dog sitter",
    rating: 5,
    numReviews: 10,
    opts: [
      {
        type: "checkbox",
        name: "properties",
        label: "Properties",
        required: false,
        labels: ["is aggressive", "shit often"],
      },
      {
        type: "radio",
        name: "gender",
        label: "Gender",
        required: true,
        labels: [
          'male',
          'female',
        ]
      },
      {
        type: "text",
        name: "pet_name",
        label: "Pet name",
        required: true,
        description: "So what's your pet name?",
      },
      {
        type: "text",
        name: "pet_best_place_to_shit",
        label: "Pet best place to shit",
        required: true,
        description: "Where does your pet shit?",
      }
    ]
  },
]

async function init() {
  let mongoose = await DATABASE.connect();
  console.log("Clearing database...");
  await mongoose.connection.db.dropDatabase(console.log(`${mongoose.connection.db.databaseName}-db has been cleared`));
  console.log("Adding starting elements to database...");
  for (let u of fakeUsers) {
    await DATABASE.User.create(u);
  }
  console.log("Adding pets to database...");
  await DATABASE.Pet.insertMany(Pets);
  console.log("Adding products...");
  await DATABASE.Product.insertMany(products);
  console.log("Adding face to face services...");
  await DATABASE.ServiceFaceToFace.insertMany(servicesFaceToFace);
  console.log("done!");
  process.exit();
}


init();
