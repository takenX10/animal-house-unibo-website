import DATABASE from "./database.js";
import bcrypt, { genSaltSync } from "bcrypt";

// s3cr3t_aldo
var fakeUsers = [
  {
    name: "admin",
    surname: "admin",
    email: "admin@admin.tk",
    contact: "+39 111 111 1111",
    password: bcrypt.hashSync("admin", genSaltSync()),
    isAdmin: true,
    petList: [],
  },
  {
    name: "admin2",
    surname: "admin2",
    email: "admin2@admin.tk",
    contact: "+39 111 111 1111",
    password: bcrypt.hashSync("admin2", genSaltSync()),
    isAdmin: true,
    petList: [],
  },
  {
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
  },
  {
    name: "a",
    surname: "a",
    email: "a@a.a",
    contact: "+39 555 555 5555",
    password: bcrypt.hashSync("a", genSaltSync()),
    isAdmin: true,
    petList: [],
  },
];

var posts = [
  {
    author: "aldo@baglio.tk",
    message: "Non posso ne scendere ne salire, ne scendere ne salire",
    type: "eccoloqua",
  },
  {
    author: "giovanni@storti.tk",
    message:
      "- Ci sono solo due cose che possono salvarci: ordine e re-go-le! - Re-go-le! - Eh, ridiamo, ridiamo, ridevano anche i Maya e...si sono estinti!",
    type: "eccoloqua",
  },
  {
    author: "giacomo@poretti.tk",
    message:
      "Ma hai visto quel cane lì? Gli hanno montato… le tibie al contrario?",
    type: "eccoloqua",
  },
  {
    author: "aldo@baglio.tk",
    message: "Non posso ne scendere ne salire, ne scendere ne salire",
    type: "eccoloqua",
  },
  {
    author: "giovanni@storti.tk",
    message:
      "- Ci sono solo due cose che possono salvarci: ordine e re-go-le! - Re-go-le! - Eh, ridiamo, ridiamo, ridevano anche i Maya e...si sono estinti!",
    type: "eccoloqua",
  },
  {
    author: "giacomo@poretti.tk",
    message:
      "Ma hai visto quel cane lì? Gli hanno montato… le tibie al contrario?",
    type: "eccoloqua",
  },
];
var Pets = [
  {
    name: "Baloo",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi distinctio adipisci esse possimus, earum odio amet? Blanditiis magni ratione quas assumenda eum corporis quod dolores facilis, enim nam voluptatum porro?",
    weight: 5,
    race: "Dog",
    sex: "Male",
    age: 11,
    likedBy: [],
    matchedBy: [],
    imgList: [
      "https://www.cedarcityutah.com/wp-content/uploads/2019/06/cropped-maltese-puppies-STGNews.jpg",
    ],
  },
  {
    name: "Arturo",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi distinctio adipisci esse possimus, earum odio amet? Blanditiis magni ratione quas assumenda eum corporis quod dolores facilis, enim nam voluptatum porro?",
    weight: 3,
    race: "Dog",
    sex: "Male",
    age: 13,
    likedBy: [],
    matchedBy: [],
    imgList: [
      "https://www.cedarcityutah.com/wp-content/uploads/2019/06/cropped-maltese-puppies-STGNews.jpg",
    ],
  },
];

const products = [
  {
    name: "Nika Slim shirt",
    slug: "nika-slim-shirt",
    categories: ["/accessories"],
    poster: "assets/products/p1.jpg",
    images: [],
    price: 120,
    countInStock: 5,
    brand: "Subemelaradjio",
    rating: 0,
    numReviews: 0,
    description: "high quality raccoon",
  },
  {
    name: "Nika Slim Pant",
    slug: "nika-slim-pant",
    categories: ["/accessories/pants"],
    poster: "assets/products/p1.jpg",
    images: [],
    price: 25,
    countInStock: 0,
    brand: "Subemelaradjio",
    rating: 0,
    numReviews: 0,
    description: "high quality raccoon",
  },
  {
    name: "Supreme jacket",
    slug: "supreme-drip",
    categories: ["/accessories/jackets"],
    poster: "assets/products/drip.jpg",
    images: [],
    price: 999999,
    countInStock: 1,
    brand: "drippythangs",
    rating: 0,
    numReviews: 0,
    description: "high quality drip",
  },
  {
    name: "Pink litter box",
    slug: "litter-box",
    categories: ["/sanitary/litter-boxes"],
    poster: "assets/products/litter.jpg",
    images: [],
    price: 30,
    countInStock: 2,
    brand: "catsrus",
    rating: 0,
    numReviews: 0,
    description: "high quality cat litter box",
  },
  {
    name: "Scooby Snacks",
    slug: "scooby-snacks",
    categories: ["/food/snacks"],
    poster: "assets/products/snacks.webp",
    images: [],
    price: 12,
    countInStock: 200,
    brand: "bestdoggos",
    rating: 0,
    numReviews: 0,
    description: "high quality food",
  },
];

const productCategories = [
  {
    name: "accessories",
    parent: "/",
    category: "/accessories",
  },
  {
    name: "jackets",
    parent: "/accessories",
    category: "/accessories/jackets",
  },
  {
    name: "food",
    parent: "/",
    category: "/food",
  },
  {
    name: "snacks",
    parent: "/food",
    category: "/food/snacks",
  },
  {
    name: "sanitary",
    parent: "/",
    category: "/sanitary",
  },
  {
    name: "litter boxes",
    parent: "/sanitary",
    category: "/sanitary/litter-boxes",
  },
];

const services = [
  {
    slug: "vet",
    title: "Veterinary!",
    poster:
      "assets/services/vet_poster.jpg",
    category: "vet",
    isOnline: false,
    availabilities: [
    ],
    hourlyRate: 10,
    description: "Veterinarians care for the health of animals and work to protect public health. They diagnose, treat, and research medical conditions and diseases of pets, livestock, and other animals",
    rating: 0,
    numReviews: 0,
    opts: [
      {
        type: "select",
        name: "animal",
        label: "Animal",
        required: true,
        fields: ["cat", "dog", "dolphin", "other"],
      },
      {
        type: "select",
        name: "gender",
        label: "Gender",
        required: true,
        fields: ["none", "male", "female"],
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
      },
    ],
  },

  {
    slug: "conf-vet",
    title: "Video conf with vet!",
    poster:
      "assets/services/vet_poster.jpg",
    category: "animal-vet",
    isOnline: true,
    availabilities: [
    ],
    images: [
      "assets/services/vet_poster.jpg",
    ],
    hourlyRate: 10,
    description: "Veterinarians care for the health of animals and work to protect public health. They diagnose, treat, and research medical conditions and diseases of pets, livestock, and other animals.",
    rating: 0,
    numReviews: 0,
    opts: [
      {
        type: "select",
        name: "animal",
        label: "Animal",
        required: true,
        fields: ["cat", "dog", "dolphin", "other"],
      },
      {
        type: "text",
        name: "pet_name",
        label: "Pet name",
        required: true,
        description: "So what's your pet name?",
      },
    ],
    bookings: [],
  },

  {
    slug: "home-visit",
    title: "Home visit!",
    poster:
      "assets/services/home_visit_poster.jpg",
    category: "home-visit",
    isOnline: false,
    availabilities: [
    ],
    hourlyRate: 50,
    description: "Is your animal feeling lonely? Our experts could take care of it!",
    rating: 0,
    numReviews: 0,
    opts: [
      {
        type: "select",
        name: "animal",
        label: "Animal",
        required: true,
        fields: ["cat", "dog", "dolphin", "other"],
      },
      {
        type: "checkbox",
        name: "aggressive",
        label: "Aggressiveness",
        required: false,
        labels: ["is it aggressive ?"],
      },
      {
        type: "select",
        name: "gender",
        label: "Gender",
        required: true,
        fields: ["none", "male", "female"],
      },
      {
        type: "select",
        name: "size",
        label: "Size",
        required: true,
        fields: ["small", "medium", "large"],
      },
      {
        type: "text",
        name: "pet_name",
        label: "Pet name",
        required: true,
        description: "So what's your pet name?",
      },
    ],
    bookings: [],
  },

  {
    slug: "groomer",
    title: "Animal groomer!",
    poster:
      "assets/services/groomer_poster.jpg",
    category: "animal-groomer",
    isOnline: false,
    availabilities: [
    ],
    hourlyRate: 25,
    description: "A Pet Groomer is mainly responsible for bathing, conditioning, cutting, drying, and styling dog hair or fur. Furthermore, other responsibilities include trimming the nails, brushing the teeth, cleaning the ears, and other general cosmetic services.",
    rating: 0,
    numReviews: 0,
    opts: [
      {
        type: "checkbox",
        name: "aggressive",
        label: "Aggressiveness",
        required: false,
        labels: ["is it aggressive ?"],
      },
      {
        type: "checkbox",
        name: "nails",
        label: "Nails",
        required: false,
        labels: ["does it have long nails ?"],
      },
      {
        type: "select",
        name: "gender",
        label: "Gender",
        required: true,
        fields: ["none", "male", "female"],
      },
      {
        type: "select",
        name: "size",
        label: "Size",
        required: true,
        fields: ["small", "medium", "large"],
      },
      {
        type: "text",
        name: "pet_name",
        label: "Pet name",
        required: true,
        description: "So what's your pet name?",
      },
    ],
    bookings: [],
  },

  {
    slug: "sitter",
    title: "Animal sitter!",
    poster:
      "assets/services/dog_sitter_poster.jpg",
    category: "animal-sitter",
    isOnline: false,
    availabilities: [
    ],
    hourlyRate: 15,
    description: "Pet sitters care for various pets while their owners are away on vacation or working long hours. They may either stay in pet owners' homes, host pets in their own homes, or perform daily visits to provide pets with food, freshwater, medication, and companionship.",
    rating: 0,
    numReviews: 0,
    opts: [
      {
        type: "checkbox",
        name: "aggressive",
        label: "Aggressiveness",
        required: false,
        labels: ["is it aggressive ?"],
      },
      {
        type: "select",
        name: "gender",
        label: "Gender",
        required: true,
        fields: ["none", "male", "female"],
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
      },
    ],
    bookings: [],
  },

  {
    slug: "psycho",
    title: "Psychologist!",
    poster:
      "assets/services/psycho_poster.jpg",
    category: "vet",
    isOnline: false,
    availabilities: [
    ],
    hourlyRate: 40,
    description: "Psychologists study cognitive, emotional, and social processes and behavior by observing, interpreting, and recording how people relate to one another and to their environments. They use their findings to help improve processes and behaviors.",
    rating: 0,
    numReviews: 0,
    opts: [
      {
        type: "select",
        name: "animal",
        label: "Animal",
        required: true,
        fields: ["cat", "dog", "dolphin", "other"],
      },
      {
        type: "select",
        name: "gender",
        label: "Gender",
        required: true,
        fields: ["none", "male", "female"],
      },
      {
        type: "checkbox",
        name: "sadness",
        label: "Sadness",
        required: false,
        labels: ["is it sad?"],
      },
      {
        type: "text",
        name: "pet_name",
        label: "Pet name",
        required: false,
        description: "So what's your pet name?",
      },
    ],
  },
  {
    slug: "conf-psycho",
    title: "Call with psychologist!",
    poster:
      "assets/services/psycho_poster.jpg",
    category: "conf-psycho",
    isOnline: true,
    availabilities: [
    ],
    hourlyRate: 40,
    description: "Psychologists study cognitive, emotional, and social processes and behavior by observing, interpreting, and recording how people relate to one another and to their environments. They use their findings to help improve processes and behaviors.",
    rating: 0,
    numReviews: 0,
    opts: [
      {
        type: "select",
        name: "animal",
        label: "Animal",
        required: true,
        fields: ["cat", "dog", "dolphin", "other"],
      },
      {
        type: "select",
        name: "gender",
        label: "Gender",
        required: true,
        fields: ["none", "male", "female"],
      },
      {
        type: "checkbox",
        name: "sadness",
        label: "Sadness",
        required: false,
        labels: ["is it sad?"],
      },
      {
        type: "checkbox",
        name: "webcam",
        label: "webcam",
        required: false,
        labels: ["do you have a webcam?"],
      },
      {
        type: "text",
        name: "pet_name",
        label: "Pet name",
        required: false,
        description: "So what's your pet name?",
      },
    ],
  },

];

async function initDB(forced) {
  let mongoose = await DATABASE.connect();
  let users = await DATABASE.User.find();

  console.log("Clearing database...");
  await mongoose.connection.db.dropDatabase(
    console.log(`${mongoose.connection.db.databaseName}-db has been cleared`)
  );
  console.log("Adding starting elements to database...");
  await DATABASE.User.insertMany(fakeUsers);
  console.log("Adding posts to database");
  await DATABASE.Post.insertMany(posts);
  console.log("Adding pets to database...");
  for (let i in Pets) {
    const user = await DATABASE.User.findOne({ email: fakeUsers[i].email });
    Pets[i].ownerid = user.id;
    let matchPet = null;
    if (i % 2) {
      matchPet = await DATABASE.Pet.findOne({ name: Pets[i - 1].name });
      Pets[i].matchedBy = [matchPet.id];
    }
    const pet = await DATABASE.Pet.create(Pets[i]);
    if (i % 2) {
      await DATABASE.Pet.findByIdAndUpdate(matchPet.id, {
        matchedBy: [pet.id],
      });
    }
    await DATABASE.User.findByIdAndUpdate(user.id, {
      petList: [...user.petList, pet.id],
    });
  }
  console.log("Adding products...");
  await DATABASE.Product.insertMany(products);
  console.log("Adding prod categories...");
  await DATABASE.ProductCategory.insertMany(productCategories);
  console.log("Adding face to face services...");
  await DATABASE.Service.insertMany(services);
  console.log("done!");
}

export default initDB;
