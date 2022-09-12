// Author : Gianmaria Rovelli

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
import jsdom from "jsdom";
import os from "os";
import multer from "multer";
import { FormData } from "formdata-node"; // You can use `File` from fetch-blob >= 3.x
import METHODS from "../methods.js";
import { fileFromSync } from "fetch-blob/from.js";
const { JSDOM } = jsdom;
const upload = multer({ dest: os.tmpdir() });

import CatBreedAI from "./catBreedAI.js";

const IMAGE_DOG_API = "https://dog.ceo/api/breeds/image/random";
const IMAGE_CAT_API = "https://api.thecatapi.com/v1/images/search";
const RANDOM_FACT = "https://fungenerators.com/random/facts/animal/";
const RANDOM_ANIMAL = "https://zoo-animal-api.herokuapp.com";

const ENDPOINTS = [
  { endpoint: "/api/dogimage", method: METHODS.GET, function: getDogImageAPI },
  { endpoint: "/api/catimage", method: METHODS.GET, function: getCatImageAPI },
  {
    endpoint: "/api/randomfact",
    method: METHODS.GET,
    function: getRandomFactAPI,
  },
  {
    endpoint: "/api/randomanimal",
    method: METHODS.GET,
    function: getRandomAnimalAPI,
  },
  {
    endpoint: "/api/catfact",
    method: METHODS.GET,
    function: getRandomCatFactAPI,
  },
  {
    endpoint: "/api/randomimagebase64",
    method: METHODS.GET,
    function: getRandomImageBase64API,
  },
  {
    endpoint: "/api/funnyvideo",
    method: METHODS.GET,
    function: getFunnyVideoAPI,
  },
  {
    endpoint: "/api/scoreboard/:game",
    method: METHODS.GET,
    function: getScoreboardAPI,
  },
  {
    endpoint: "/api/dogbreedrec",
    method: METHODS.POST,
    opts: upload.single("dog"),
    function: getDogBreedAIAPI,
  },
  {
    endpoint: "/api/catbreedrec",
    method: METHODS.POST,
    opts: upload.single("cat"),
    function: getCatBreedAIAPI,
  },
];

async function getDogBreedAIAPI(req, res) {
  try {
    const file = req.file;
    let data = await getDogBreedAI(file.path);
    res.json({ status: "ok", data });
  } catch (e) {
    showError(res);
  }
}

async function getDogBreedAIResponsePage(path) {
  try {
    const form = new FormData();
    const file = fileFromSync(path);
    form.append("image", file);
    let res = await fetch("https://dog-breeds-detector.herokuapp.com/predict", {
      body: form,
      method: "POST",
    });
    let data = await res.text();
    return data;
  } catch (e) {
    throw e;
  }
}

async function getDogBreedAI(path) {
  try {
    let page = await getDogBreedAIResponsePage(path);
    const { document } = new JSDOM(page).window;
    let res = document.querySelectorAll("h4");
    let perc_regex = new RegExp("[0-9]{1,2}.[0-9]{1,2}%");
    let name_regex = new RegExp("is '(.*?)'");
    let percs = [];
    for (let i = 1; i < res.length; i++) {
      let text = res[i].textContent.trim();
      let r = perc_regex.exec(text);
      if (r) {
        let perc = r[0].replace("%", "");
        let name = name_regex.exec(text)[1];
        percs.push({ perc, name });
      }
    }
    return percs;
  } catch (e) {
    throw e;
  }
}

async function getCatBreedAIAPI(req, res) {
  try {
    let file = req.file;
    let data = await CatBreedAI.getCatBreedAI(file.path);
    res.json({ status: "ok", data });
  } catch (e) {
    throw e;
  }
}

async function getScoreboardAPI(req, res) {
  try {
    let game = req.params.game;
    let board = getScoreboard(game);
    res.json(board);
  } catch (e) {
    showError(res);
  }
}

function getScoreboard(game) {
  let board = {
    status: "ok",
    data: [
      { username: "lollo", uuid: "223321323218724", score: "20" },
      { username: "gatto", uuid: "223321323218724", score: "10" },
      { username: "pesce", uuid: "223321323218724", score: "2" },
      { username: "dino", uuid: "223321323218724", score: "0" },
    ],
  };
  return board;
}

async function getRandomImageBase64API(req, res) {
  try {
    let dogdata = await getDogImageData();
    let r = await fetch(dogdata.message);
    const data = await r.buffer();
    let b64 = data.toString("base64");
    b64 = "data:image/jpg;base64," + b64;

    res.json({ status: 200, image: b64 });
  } catch (e) {
    console.log(e);
    showError(res);
  }
}

async function getRandomCatFactAPI(req, res) {
  let facts = getLocalCatFact();

  let fact = facts[Math.floor(Math.random() * facts.length)];

  res.json({ status: 200, text: fact });
}

async function getRandomAnimalAPI(req, res) {
  try {
    let data = await getRandomAnimal();
    res.json(data);
  } catch (e) {
    showError(res);
  }
}

async function getRandomAnimal() {
  try {
    let r = await fetch(RANDOM_ANIMAL);
    let data = await r.json();

    return data;
  } catch (e) {
    throw e;
  }
}

async function getRandomFactAPI(req, res) {
  try {
    let jsonBody = await getRandomFact();
    res.json(jsonBody);
  } catch (e) {
    showError(res);
  }
}

async function getRandomFact() {
  try {
    let r = await fetch(RANDOM_FACT);
    let data = await r.text();
    let reg = /data-wow-delay.*?>(.*?)<span class="text-muted"><small>/;
    let jsonBody = JSON.parse('{"status":404, "text": ""}');
    if (reg.test(data)) {
      let fact = reg.exec(data)[1];
      jsonBody.status = 200;
      jsonBody.text = fact;
    }
    return jsonBody;
  } catch (e) {
    throw e;
  }
}

async function getDogImageAPI(req, res) {
  try {
    let data = await getDogImageData();
    res.json(data);
  } catch (e) {
    showError(res);
  }
}

async function getDogImageData() {
  try {
    let r = await fetch(IMAGE_DOG_API);
    let data = await r.json();
    return data;
  } catch (e) {
    throw e;
  }
}

async function getCatImageAPI(req, res) {
  try {
    let data = await getCatImageData();
    res.json(data);
  } catch (e) {
    showError(res);
  }
}

async function getCatImageData() {
  try {
    let r = await fetch(IMAGE_CAT_API);
    let data = await r.json();

    return data;
  } catch (e) {
    throw e;
  }
}

async function getFunnyVideoAPI(req, res) {
  try {
    let list = getFunnyVideoList();
    let q = 1;
    if (req.query.number) q = req.query.number;
    let urls = [];
    for (let i = 0; i < q; i++) {
      let r = generateRandomInteger(list.length);
      urls.push(list[r]);
    }
    let data = { status: "ok", urls: urls };
    res.json(data);
  } catch (e) {
    showError(res);
  }
}

function showError(res) {
  res.status(500);
  res.redirect("/errore");
}

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

function getFunnyVideoList() {
  return [
    "https://www.youtube.com/embed/O-qqRaHVHiE",
    "https://www.youtube.com/embed/qpZula9aYS0",
    "https://www.youtube.com/embed/NOhyduxTOGo",
  ];
}

function getLocalCatFact() {
  const li = [
    "In 1987 cats overtook dogs as the number one pet in America.",
    "Cats that live together sometimes rub each others heads to show that they have no intention of fighting." +
      " Young cats do this more often, especially when they are excited.",
    "Mother cats teach their kittens to use the litter box.",
    "To unsubscribe from catfacts, reply the following code: tj3G5de$se",
    "You gotta be kitten me! are you sure you want to unsubscribe? send YES or NO",
    "Invalid Command, CatFacts!",
    "The way you treat kittens in the early stages of it's life will render it's personality traits later in life.",
    "Contrary to popular belief, the cat is a social animal. A pet cat will respond and answer to speech , " +
      "and seems to enjoy human companionship.",
    "When well treated, a cat can live twenty or more years but the average life span of a domestic cat is 14 years.",
    "Neutering a cat extends its life span by two or three years.",
    "To unsubscribe from catfacts, reply the following code: tj3G5de$se",
    "You gotta be kitten me! are you sure you want to unsubscribe? send YES or NO",
    "Invalid Command, CatFacts!",
    "Cats, especially older cats, do get cancer. Many times this disease can be treated successfully.",
    "Cats can not taste sweets.",
    "Cats must have fat in their diet because they cannot produce it on their own.",
    "Some common houseplants poisonous to cats include: English Ivy, iris, mistletoe, philodendron, and yew.",
    "Tylenol and chocolate are both poisionous to cats.",
    "Many cats cannot properly digest cows milk. Milk and milk products give them diarrhea.",
    "The average cat food meal is the equivalent to about five mice.",
    "Cats can get tapeworms from eating fleas. These worms live inside the cat forever, or until they are re" +
      "moved with medication. They reproduce by shedding a link from the end of their long bodies. This link c" +
      "rawls out the cat's anus, and sheds hundreds of eggs. These eggs are injested by flea larvae, and the " +
      "cycles continues. Humans may get these tapeworms too, but only if they eat infected fleas. Cats with ta" +
      "peworms should be dewormed by a veterinarian.",
    "Cats can get tapeworms from eating mice. If your cat catches a mouse it is best to take the prize away " +
      "from it.",
    "A form of AIDS exists in cats.",
    "The color of the points in Siamese cats is heat related. Cool areas are darker.",
    "Siamese kittens are born white because of the heat inside the mother's uterus before birth. This heat " +
      "keeps the kittens' hair from darkening on the points.",
    "People who are allergic to cats are actually allergic to cat saliva or to cat dander. If the resident c" +
      "at is bathed regularly the allergic people tolerate it better.",
    "Studies now show that the allergen in cats is related to their scent glands. Cats have scent glands on " +
      "their faces and at the base of their tails. Entire male cats generate the most scent. If this secretion" +
      " from the scent glands is the allergen, allergic people should tolerate spayed female cats the best.",
    "Cats do not think that they are little people. They think that we are big cats. This influences their b" +
      "ehavior in many ways.",
    "Cats are subject to gum disease and to dental caries. They should have their teeth cleaned by the vet o" +
      "r the cat dentist once a year.",
    "Many people fear catching a protozoan disease, Toxoplasmosis, from cats. This disease can cause illness" +
      " in the human, but more seriously, can cause birth defects in the unborn. Toxoplasmosis is a common dis" +
      "ease, sometimes spread through the feces of cats. It is caused most often from eating raw or rare beef." +
      " Pregnant women and people with a depressed immune system should not touch the cat litter box. Other th" +
      "an that, there is no reason that these people have to avoid cats.",
    "The ancestor of all domestic cats is the African Wild Cat which still exists today.",
    "In ancient Egypt, killing a cat was a crime punishable by death.",
    "In ancient Egypt, mummies were made of cats, and embalmed mice were placed with them in their tombs. In" +
      " one ancient city, over 300,000 cat mummies were found.",
    "In the Middle Ages, during the Festival of Saint John, cats were burned alive in town squares.",
    "The first cat show was in 1871 at the Crystal Palace in London.",
    "Today there are about 100 distinct breeds of the domestic cat.",
    "Like birds, cats have a homing ability that uses its biological clock, the angle of the sun, and the Ea" +
      "rth's magnetic field. A cat taken far from its home can return to it. But if a cat's owners move far " +
      "from its home, the cat can't find them.",
    "Cats bury their feces to cover their trails from predators.",
    "Cats sleep 16 to 18 hours per day. When cats are asleep, they are still alert to incoming stimuli. If y" +
      "ou poke the tail of a sleeping cat, it will respond accordingly.",
    "Besides smelling with their nose, cats can smell with an additional organ called the Jacobson's organ," +
      " located in the upper surface of the mouth.",
    "The chlorine in fresh tap water irritates sensitive parts of the cat's nose. Let tap water sit for 24 " +
      "hours before giving it to a cat.",
    "Abraham Lincoln loved cats. He had four of them while he lived in the White House.",
    "Julius Ceasar, Henri II, Charles XI, and Napoleon were all afraid of cats.",
    "Cats have an average of 24 whiskers, arranged in four horizontal rows on each side.",
    'The word "cat" in various languages: French: chat; German: katze; Italian: gatto; Spanish/Portugese: ga' +
      "to; Yiddish: kats; Maltese: qattus; Swedish/Norwegian: katt; Dutch: kat; Icelandic: kottur; Greek: catt" +
      "a; Hindu: katas; Japanese:neko; Polish: kot; Ukranian: kotuk; Hawiian: popoki; Russian: koshka; Latin: " +
      "cattus; Egyptian: mau; Turkish: kedi; Armenian: Gatz; Chinese: mio; Arabic: biss; Indonesian: qitta; Bu" +
      "lgarian: kotka; Malay: kucing; Thai/Vietnamese: meo; Romanian: pisica; Lithuanian: katinas; Czech: kock" +
      "a; Slovak: macka; Armenian: gatz; Basque: catua; Estonian: kass; Finnish: kissa; Swahili: paka.",
    "Statistics indicate that animal lovers in recent years have shown a preference for cats over dogs!",
    "Cats can be taught to walk on a leash, but a lot of time and patience is required to teach them. The yo" +
      "unger the cat is, the easier it will be for them to learn.",
    "Purring not always means happiness. Purring could mean a cat is in terrible pain such as during childbi" +
      "rth. Kitten will purr to their mother to let her know they are getting enough milk while nursing. Purri" +
      "ng is a process of inhaling and exhaling, usually performed while the mouth is closed. But don't worry" +
      ", if your cat is purring while your gently petting her and holding her close to you - that is a happy c" +
      "at!",
    "The catnip plant contains an oil called hepetalactone which does for cats what marijuana does to some p" +
      "eople. Not all cats react to it those that do appear to enter a trancelike state. A positive reaction t" +
      "akes the form of the cat sniffing the catnip, then licking, biting, chewing it, rub & rolling on it rep" +
      "eatedly, purring, meowing & even leaping in the air.",
    "Of all the species of cats, the domestic cat is the only species able to hold its tail vertically while" +
      " walking. All species of wild cats hold their talk horizontally or tucked between their legs while walk" +
      "ing.",
    "A happy cat holds her tail high and steady.",
    "Almost 10% of a cat's bones are in its tail, and the tail is used to maintain balance.",
    "Cat families usually play best in even numbers. Cats and kittens should be aquired in pairs whenever po" +
      "ssible.",
    "Baking chocolate is the most dangerous chocolate to your cat.",
    "You check your cats pulse on the inside of the back thigh, where the leg joins to the body. Normal for " +
      "cats: 110-170 beats per minute.",
    "Jaguars are the only big cats that don't roar.",
    "A cats field of vision is about 185 degrees.",
    "Cats have individual preferences for scratching surfaces and angles. Some are horizontal scratchers whi" +
      "le others exercise their claws vertically.",
    "The Maine Coone is the only native American long haired breed.",
    "The Maine Coon is 4 to 5 times larger than the Singapura, the smallest breed of cat.",
    "Tabby cats are thought to get their name from Attab, a district in Baghdad, now the capital of Iraq.",
    "Retractable claws are a physical phenomenon that sets cats apart from the rest of the animal kingdom. I" +
      "n the cat family, only cheetahs cannot retract their claws.",
    'Not every cat gets "high" from catnip. Whether or not a cat responds to it depends upon a recessive gen' +
      "e: no gene, no joy.",
    "A cat can sprint at about thirty-one miles per hour.",
    "In ancient Egypt, when a family cat died, all family members would shave their eyebrows as a sign of mo" +
      "urning.",
    "Cats have been domesticated for half as long as dogs have been.",
    "A cat's whiskers are thought to be a kind of radar, which helps a cat gauge the space it intends to wa" +
      "lk through.",
    "A cat can spend five or more hours a day grooming himself.",
    "All cats have three sets of long hairs that are sensitive to pressure - whiskers, eyebrows,and the hair" +
      "s between their paw pads.",
    "Both humans and cats have identical regions in the brain responsible for emotion.",
    "To unsubscribe from catfacts, reply the following code: tj3G5de$se",
    "You gotta be kitten me! are you sure you want to unsubscribe? send YES or NO",
    "Invalid Command, CatFacts!",
    "A cat's brain is more similar to a man's brain than that of a dog.",
    "A cat has more bones than a human; humans have 206, and the cat - 230.",
    "Cats have 30 vertebrae--5 more than humans have.",
    "Cats are the most popular pet in the United States: There are 88 million pet cats and 74 million dogs.",
    "Cats have over 20 muscles that control their ears.",
    "A group of cats is called a clowder.",
    "There are cats who have survived falls from over 32 stories (320 meters) onto concrete.",
    "Cats sleep 70% of their lives.",
    "A cat has been mayor of Talkeetna, Alaska, for 15 years. His name is Stubbs.",
    "A cat has ran for mayor of Mexico City in 2013.",
    "In tigers and tabbies, the middle of the tongue is covered in backward-pointing spines, used for breaking off and gripping meat.",
    'When cats grimace, they are usually "taste-scenting." They have an extra organ that, with some breathing control, allows the cats to taste-sense the air.',
    "Cats can not taste sweetness.",
    "Owning a cat can reduce the risk of stroke and heart attack by a third.",
    "Wikipedia has a recording of a cat meowing because why not?",
    "The worlds largest cat measured 48.5 inches long. https://www.youtube.com/watch?v=gc5M0aGc_EI",
    "Evidence suggests domesticated cats have been around since 3600 B.C., 2,000 years before Egypts pharaohs.",
    "A cats purr may be a form of self-healing, as it can be a sign of nervousness as well as contentment.",
    "Similarly, the frequency of a domestic cats purr is the same at which muscles and bones repair themselves.",
    "Adult cats only meow to communicate with humans.",
    "The worlds richest cat is worth $13 million after his human passed away and left her fortune to him.",
    "Your cat recognizes your voice but just acts too cool to care (probably because they are).",
    "Cats are often lactose intolerant, so stop givin them milk!",
  ];
  return li;
}

export default { ENDPOINTS };