import DATABASE from './database.js';
import bcrypt, { genSaltSync } from 'bcrypt';

// s3cr3t_aldo
var fakeUsers = [{
  name: "Aldo",
  surname: "Baglio",
  email: "aldo@baglio.tk",
  contact: "+39 111 111 1111",
  password: bcrypt.hashSync("aldobaglio", genSaltSync()),
  petList: [],
},
{
  name: "Giovanni",
  surname: "Storti",
  email: "giovanni@storti.tk",
  contact: "+39 444 444 4444",
  password: bcrypt.hashSync("giovannistorti", genSaltSync()),
  petList: [],
},
{
  name: "Giacomo",
  surname: "Poretti",
  email: "giacomo@poretti.tk",
  contact: "+39 555 555 5555",
  password: bcrypt.hashSync("giacomoporetti", genSaltSync()),
  isAdmin: true,
  petList: [],
},];

var posts = [
  { author: "aldo@baglio.tk", message: "Non posso ne scendere ne salire, ne scendere ne salire", type: "eccoloqua" },
  { author: "giovanni@storti.tk", message: "- Ci sono solo due cose che possono salvarci: ordine e re-go-le! - Re-go-le! - Eh, ridiamo, ridiamo, ridevano anche i Maya e...si sono estinti!", type: "eccoloqua" },
  { author: "giacomo@poretti.tk", message: "Ma hai visto quel cane lì? Gli hanno montato… le tibie al contrario?", type: "eccoloqua" },
  { author: "aldo@baglio.tk", message: "Non posso ne scendere ne salire, ne scendere ne salire", type: "eccoloqua" },
  { author: "giovanni@storti.tk", message: "- Ci sono solo due cose che possono salvarci: ordine e re-go-le! - Re-go-le! - Eh, ridiamo, ridiamo, ridevano anche i Maya e...si sono estinti!", type: "eccoloqua" },
  { author: "giacomo@poretti.tk", message: "Ma hai visto quel cane lì? Gli hanno montato… le tibie al contrario?", type: "eccoloqua" },
]
var Pets = [
  {
    name: "Baloo",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi distinctio adipisci esse possimus, earum odio amet? Blanditiis magni ratione quas assumenda eum corporis quod dolores facilis, enim nam voluptatum porro?",
    weight: 5,
    race: "Dog",
    sex: "Male",
    age: 11,
    likedBy: [],
    matchedBy: [],
    imgList: ["https://www.cedarcityutah.com/wp-content/uploads/2019/06/cropped-maltese-puppies-STGNews.jpg"]
  },
  {
    name: "Arturo",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi distinctio adipisci esse possimus, earum odio amet? Blanditiis magni ratione quas assumenda eum corporis quod dolores facilis, enim nam voluptatum porro?",
    weight: 3,
    race: "Dog",
    sex: "Male",
    age: 13,
    likedBy: [],
    matchedBy: [],
    imgList: ["https://www.cedarcityutah.com/wp-content/uploads/2019/06/cropped-maltese-puppies-STGNews.jpg"]
  }
];

const products = [
  {
    name: 'Nika Slim shirt',
    slug: 'nika-slim-shirt',
    categories: ['/accessories'],
    poster: '/assets/products/p1.jpg',
    images: ['/assets/products/p1.jpg'],
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
    categories: ['/accessories/pants'],
    poster: '/assets/products/p1.jpg',
    images: [ '/assets/products/p1.jpg'],
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
    categories: ['/accessories/jackets'],
    poster: '/assets/products/drip.jpg',
    images: ['/assets/products/drip.jpg'],
    price: 999999,
    countInStock: 1,
    brand: 'drippythangs',
    rating: 5.0,
    numReviews: 0,
    description: 'high quality drip'
  },
  {
    name: 'Pink litter box',
    slug: 'litter-box',
    categories: ['/sanitary/litter-boxes'],
    poster: '/assets/products/litter.jpg',
    images: ['/assets/products/litter.jpg'],
    price: 30,
    countInStock: 2,
    brand: 'catsrus',
    rating: 2.9,
    numReviews: 2,
    description: 'high quality cat litter box'
  },
  {
    name: 'Scooby Snacks',
    slug: 'scooby-snacks',
    categories: ['/food/snacks'],
    poster: '/assets/products/snacks.webp',
    images: ['/assets/products/snacks.webp'],
    price: 12,
    countInStock: 200,
    brand: 'bestdoggos',
    rating: 4.9,
    numReviews: 10,
    description: 'high quality food'
  },
];

const productCategories = [
  {
    name:"accessories",
    parent:"/",
    category:"/accessories"
  },
  {
    name:"jackets",
    parent:"/accessories",
    category:"/accessories/jackets`"
  },
  {
    name:"food",
    parent:"/",
    category:"/food",
  },
  {
    name:"snacks",
    parent:"/food",
    category:"/food/snacks",
  },
  {
    name:"sanitary",
    parent:"/",
    category:"/sanitary"
  },
  {
    name:"litter boxes",
    parent:"/sanitary",
    category:"/sanitary/litter-boxes"
  }

]

const servicesFaceToFace = [
  {
    slug: "wow-vet",
    title: "Vet wow!",
    poster: "https://img.freepik.com/free-photo/close-up-veterinarian-taking-care-cat_23-2149100168.jpg?w=2000",
    category: "vet",
    availabilities: [
      {
        city: "Bologna",
        address: "via non lo so 23",
        shifts: [
          {
            day: "Monday",
            hours: [
              {
                begin: "8:00",
                end: "13:00",
                maxClients: 3,
                currentClients: 3
              }
            ]
          },
          {
            day: "Wednesday",
            hours: [
              {
                begin: "14:00",
                end: "19:00",
                maxClients: 3,
                currentClients: 0
              },
              {
                begin: "16:00",
                end: "17:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
        ]
      },
      {
        city: "Rimini",
        address: "via non lo so 23",
        shifts: [
          {
            day: "Tuesday",
            hours: [
              {
                begin: "8:00",
                end: "13:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
          {
            day: "Thursday",
            hours: [
              {
                begin: "14:00",
                end: "19:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
        ]
      }
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
    title: "Dog sitter wow!",
    poster: "https://www.zooplus.it/magazine/wp-content/uploads/2020/06/dog-sitter.jpeg",
    category: "animal-sitter",
    availabilities: [
      {
        city: "Bologna",
        address: "via non lo so 23",
        shifts: [
          {
            day: "Monday",
            hours: [
              {
                begin: "8:00",
                end: "13:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
          {
            day: "Wednesday",
            hours: [
              {
                begin: "14:00",
                end: "19:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
        ]
      },
      {
        city: "Rimini",
        address: "via non lo so 23",
        shifts: [
          {
            day: "Tuesday",
            hours: [
              {
                begin: "8:00",
                end: "13:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
          {
            day: "Thursday",
            hours: [
              {
                begin: "14:00",
                end: "19:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
        ]
      },
      {
        city: "Naples",
        address: "via non lo so 23",
        shifts: [
          {
            day: "Saturday",
            hours: [
              {
                begin: "8:00",
                end: "13:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
          {
            day: "Friday",
            hours: [
              {
                begin: "14:00",
                end: "19:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
        ]
      }
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
    ],
    bookings: []
  },
  {
    slug: "wow-grooming",
    title: "Grooming wow!",
    poster: "https://dogsbestlife.com/wp-content/uploads/2020/05/Groomer-bathes-corgi-scaled.jpeg",
    category: "animal-groomer",
    availabilities: [
      {
        city: "Bologna",
        address: "via non lo so 23",
        shifts: [
          {
            day: "Monday",
            hours: [
              {
                begin: "8:00",
                end: "13:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
          {
            day: "Wednesday",
            hours: [
              {
                begin: "14:00",
                end: "19:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
        ]
      },
      {
        city: "Rimini",
        address: "via non lo so 23",
        shifts: [
          {
            day: "Tuesday",
            hours: [
              {
                begin: "8:00",
                end: "13:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
          {
            day: "Thursday",
            hours: [
              {
                begin: "14:00",
                end: "19:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
        ]
      },
      {
        city: "Naples",
        address: "via non lo so 23",
        shifts: [
          {
            day: "Saturday",
            hours: [
              {
                begin: "8:00",
                end: "13:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
          {
            day: "Friday",
            hours: [
              {
                begin: "14:00",
                end: "19:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
        ]
      }
    ],
    images: ['https://dogsbestlife.com/wp-content/uploads/2020/05/Groomer-bathes-corgi-scaled.jpeg'],
    hourlyRate: 15,
    description: "Something idk this should be an animal groomer",
    rating: 5,
    numReviews: 10,
    opts: [
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
    ],
    bookings: []
  },
  {
    slug: "wow-summer-pension",
    title: "Summer pension wow!",
    poster: "https://images.unsplash.com/photo-1516222338250-863216ce01ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VtbWVyJTIwZG9nfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    category: "animal-summer-pension",
    availabilities: [
      {
        city: "Bologna",
        address: "via non lo so 23",
        shifts: [
          {
            day: "June",
            hours: [
              {
                begin: "01",
                end: "31",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
          {
            day: "July",
            hours: [
              {
                begin: "01",
                end: "31",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
          {
            day: "August",
            hours: [
              {
                begin: "01",
                end: "31",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
        ]
      },
      {
        city: "San Benedetto",
        address: "via non lo so 23",
        shifts: [
          {
            day: "June",
            hours: [
              {
                begin: "01",
                end: "31",
                maxClients: 4,
                currentClients: 0
              }
            ]
          },
          {
            day: "July",
            hours: [
              {
                begin: "01",
                end: "31",
                maxClients: 8,
                currentClients: 0
              }
            ]
          },
          {
            day: "August",
            hours: [
              {
                begin: "01",
                end: "31",
                maxClients: 9,
                currentClients: 0
              }
            ]
          },
          {
            day: "September",
            hours: [
              {
                begin: "01",
                end: "31",
                maxClients: 9,
                currentClients: 0
              }
            ]
          },
        ]
      },
    ],
    images: ['https://images.unsplash.com/photo-1516222338250-863216ce01ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VtbWVyJTIwZG9nfGVufDB8fDB8fA%3D%3D&w=1000&q=80'],
    hourlyRate: 15,
    description: "Something idk this should be an animal summer pension",
    rating: 5,
    numReviews: 10,
    opts: [
      {
        type: "checkbox",
        name: "properties",
        label: "Properties",
        required: false,
        labels: ["is aggressive"],
      },
      {
        type: "radio",
        name: "animal",
        label: "Animal",
        required: true,
        labels: [
          'dog',
          'cat',
          'bird',
          'fish',
          'racoon',
        ]
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
    ],
    bookings: []
  },
  {
    slug: "wow-psychologist",
    title: "Psychologist wow!",
    poster: "https://i.kym-cdn.com/photos/images/original/000/932/928/bcc.jpg",
    category: "animal-psychologist",
    availabilities: [
      {
        city: "Bologna",
        address: "via non lo so 23",
        shifts: [
          {
            day: "Monday",
            hours: [
              {
                begin: "8:00",
                end: "13:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
          {
            day: "Wednesday",
            hours: [
              {
                begin: "14:00",
                end: "19:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
        ]
      },
      {
        city: "Rimini",
        address: "via non lo so 23",
        shifts: [
          {
            day: "Tuesday",
            hours: [
              {
                begin: "8:00",
                end: "13:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
          {
            day: "Thursday",
            hours: [
              {
                begin: "14:00",
                end: "19:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
        ]
      },
      {
        city: "Naples",
        address: "via non lo so 23",
        shifts: [
          {
            day: "Saturday",
            hours: [
              {
                begin: "8:00",
                end: "13:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
          {
            day: "Friday",
            hours: [
              {
                begin: "14:00",
                end: "19:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
        ]
      }
    ],
    images: ['https://i.kym-cdn.com/photos/images/original/000/932/928/bcc.jpg'],
    hourlyRate: 15,
    description: "Something idk this should be an animal psychologist",
    rating: 5,
    numReviews: 10,
    opts: [
      {
        type: "checkbox",
        name: "properties",
        label: "Properties",
        required: false,
        labels: ["is aggressive", "is depressed"],
      },
      {
        type: "radio",
        name: "animal",
        label: "Animal",
        required: true,
        labels: [
          'dog',
          'cat',
          'bird',
          'fish',
          'racoon',
        ]
      },
      {
        type: "radio",
        name: "first_time",
        label: "Is it the first time?",
        required: true,
        labels: [
          'yes',
          'no',
        ]
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
    ],
    bookings: []
  },
  {
    slug: "wow-home-visit",
    title: "Home visit for lonely animals wow!",
    poster: "https://cdn-prd.content.metamorphosis.com/wp-content/uploads/sites/2/2020/06/shutterstock_180058235-1.jpg",
    category: "animal-home-visit",
    availabilities: [
      {
        city: "Bologna",
        address: "via non lo so 23",
        shifts: [
          {
            day: "Monday",
            hours: [
              {
                begin: "8:00",
                end: "13:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
          {
            day: "Wednesday",
            hours: [
              {
                begin: "14:00",
                end: "19:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
        ]
      },
      {
        city: "Rimini",
        address: "via non lo so 23",
        shifts: [
          {
            day: "Tuesday",
            hours: [
              {
                begin: "8:00",
                end: "13:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
          {
            day: "Thursday",
            hours: [
              {
                begin: "14:00",
                end: "19:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
        ]
      },
      {
        city: "Naples",
        address: "via non lo so 23",
        shifts: [
          {
            day: "Saturday",
            hours: [
              {
                begin: "8:00",
                end: "13:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
          {
            day: "Friday",
            hours: [
              {
                begin: "14:00",
                end: "19:00",
                maxClients: 3,
                currentClients: 0
              }
            ]
          },
        ]
      }
    ],
    images: ['https://cdn-prd.content.metamorphosis.com/wp-content/uploads/sites/2/2020/06/shutterstock_180058235-1.jpg'],
    hourlyRate: 35,
    description: "Something idk this should be an animal home visit when they're lonely",
    rating: 5,
    numReviews: 10,
    opts: [
      {
        type: "checkbox",
        name: "properties",
        label: "Properties",
        required: false,
        labels: ["like watching movies", "like biscuits", "like cuddles", "sometimes cries"],
      },
      {
        type: "radio",
        name: "animal",
        label: "Animal",
        required: true,
        labels: [
          'dog',
          'cat',
          'bird',
          'fish',
          'racoon',
        ]
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
    ],
    bookings: []
  },
]

async function init() {
  let mongoose = await DATABASE.connect();
  console.log("Clearing database...");
  await mongoose.connection.db.dropDatabase(console.log(`${mongoose.connection.db.databaseName}-db has been cleared`));
  console.log("Adding starting elements to database...");
  await DATABASE.User.insertMany(fakeUsers);
  console.log("Adding posts to database");
  await DATABASE.Post.insertMany(posts);
  console.log("Adding pets to database...");
  for (let i in Pets) {
    const user = await DATABASE.User.findOne({ email: fakeUsers[i].email });
    Pets[i].ownerid = user.id
    let matchPet = null;
    if (i % 2) {
      matchPet = await DATABASE.Pet.findOne({ name: Pets[i - 1].name });
      Pets[i].matchedBy = [matchPet.id];
    }
    const pet = await DATABASE.Pet.create(Pets[i]);
    if (i % 2) {
      await DATABASE.Pet.findByIdAndUpdate(matchPet.id, { matchedBy: [pet.id] });
    }
    await DATABASE.User.findByIdAndUpdate(user.id, {
      petList: [...user.petList, pet.id]
    });
  }
  console.log("Adding products...");
  await DATABASE.Product.insertMany(products);
  console.log("Adding prod categories...");
  await DATABASE.ProductCategory.insertMany(productCategories);
  console.log("Adding face to face services...");
  await DATABASE.ServiceFaceToFace.insertMany(servicesFaceToFace);
  console.log("done!");
  process.exit();
}


init();
