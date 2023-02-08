import METHODS from "../methods.js";
import DATABASE from '../database.js';
import AUTH from "../authentication.js";
import { isAuth, isAdmin, jsonParser } from "../utils.js";

let ENDPOINTS = [
  { endpoint: "/backoffice/add_like", method: METHODS.POST, opts: [jsonParser, isAuth], function: add_like },
  { endpoint: "/api/backoffice/get_new_puppy", method: METHODS.POST, opts: [jsonParser, isAuth], function: get_new_puppy },
  { endpoint: "/api/backoffice/get_a_puppy", method: METHODS.POST, opts: [jsonParser, isAuth], function: get_a_puppy },
  { endpoint: "/backoffice/get_matches", method: METHODS.POST, opts: [jsonParser, isAuth], function: get_matches },
  { endpoint: "/api/backoffice/get_my_puppies", method: METHODS.POST, opts: [jsonParser, isAuth], function: get_my_puppies },
  { endpoint: "/backoffice/pets", method: METHODS.GET, opts: [jsonParser, isAuth], function: officePets },
  { endpoint: "/backoffice/unmatch", method: METHODS.POST, opts: [jsonParser, isAuth], function: unmatch },
  { endpoint: "/backoffice/petadd", method: METHODS.POST, opts: [jsonParser, isAuth], function: addpet },
  { endpoint: "/backoffice/update_pet_by_id", method: METHODS.PATCH, opts: [jsonParser, isAdmin], function: update_pet_by_id },
  { endpoint: "/backoffice/removepet", method: METHODS.POST, opts: [jsonParser, isAuth], function: removepet },
  { endpoint: "/backoffice/removepetadmin", method: METHODS.DELETE, opts: [jsonParser, isAdmin], function: removepetadmin },
  { endpoint: "/backoffice/getpets", method: METHODS.POST, opts: [jsonParser, isAuth], function: getpets },
  { endpoint: "/backoffice/getallpets", method: METHODS.POST, opts: [jsonParser, isAdmin], function: get_all_pets },
]

async function officePets(req, res) {
  res.render("../templates/pets", { title: "Pets" });
}

async function get_all_pets(req, res) {
  let pets = await DATABASE.Pet.find({});
  console.log(pets);
  res.json({ success: true, petList: pets });
}

async function update_pet_by_id(req, res) {
  if (!req?.body?.id ||
    !req.body?.name ||
    !req.body?.race ||
    !req.body?.age ||
    !req.body?.sex ||
    !req.body?.weight ||
    !req.body?.description
  ) {
    res.status(400).json({ success: false, message: "missing fields" });
    return;
  }
  const pet = await DATABASE.Pet.findByIdAndUpdate(req.body.id, {
    $set: {
      name : req.body.name,
      race : req.body.race,
      age : req.body.age,
      sex : req.body.sex,
      weight : req.body.weight,
      description : req.body.description,
    }
  });
  res.json({ success: true });
}

async function addpet(req, res) {
  const user = await AUTH.get_user(req);
  if (!req?.body?.name || !req.body?.race || !req.body?.description || !req.body?.age || !req.body?.weight || !req.body?.sex) {
    res.status(404).json({ success: false, message: "Some fields are missing" });
  } else {
    const p = await DATABASE.Pet.create({
      "name": req.body.name,
      "race": req.body.race,
      "description": req.body.description,
      "age": req.body.age,
      "weight": req.body.weight,
      "sex": req.body.sex,
      "ownerid": user.id,
    });
    console.log(p);
    await DATABASE.User.updateOne({ _id: user.id }, { petList: [p.id, ...user.petList] });
    console.log(user.petList);
    res.status(200).json({ success: true });
  }
}

async function removepet(req, res) {
  const user = await AUTH.get_user(req);
  if (!req.body?.id) {
    res.status(404).json({ success: false, message: "Missing id on request" });
  } else {
    user.petList.splice(user.petList.indexOf(req.body.id), 1);
    await DATABASE.User.updateOne({ _id: user._id }, { petList: user.petList })
    let p = await DATABASE.Pet.findByIdAndDelete(req.body.id);
    console.log(p);
    res.json({ success: true });
  }
}

async function removepetadmin(req, res) {
  if (!req.body?.id) {
    res.status(404).json({ success: false, message: "Missing id on request" });
    return;
  }
  const pet = await DATABASE.Pet.findById(req.body.id);
  const user = await DATABASE.User.findById(pet.ownerid);
  user.petList.splice(user.petList.indexOf(req.body.id), 1);
  await DATABASE.User.updateOne({ _id: user._id }, { petList: user.petList })
  let p = await DATABASE.Pet.findByIdAndDelete(req.body.id);
  console.log(p);
  res.json({ success: true });
}

async function getpets(req, res) {
  const user = await AUTH.get_user(req);
  let petlist = [];
  console.log(user.petList);
  for (let p of user.petList) {
    let newpet = await DATABASE.Pet.findById(p);
    // TODO: remove matchlist and other useless data from json
    petlist.push(newpet);
  }
  res.json({ success: true, petlist: petlist });
}

async function unmatch(req, res) {
  const user = await AUTH.get_user(req);
  const unmatchpet = await DATABASE.Pet.findById(req.body.id);
  for (let p of user.petList) {
    const currentpet = await DATABASE.Pet.findById(p);
    if (currentpet.matchedBy.includes(req.body.id)) {
      currentpet.matchedBy.splice(currentpet.matchedBy.indexOf(req.body.id), 1);
      await DATABASE.Pet.findByIdAndUpdate(currentpet.id, {
        matchedBy: currentpet.matchedBy
      });
      unmatchpet.matchedBy.splice(unmatchpet.matchedBy.indexOf(p), 1);
      await DATABASE.Pet.findByIdAndUpdate(unmatchpet.id, {
        matchedBy: unmatchpet.matchedBy
      });
    }
  }
  res.json({ success: true });
}


async function get_matches(req, res) {
  const user = await AUTH.get_user(req);
  let matches = [];
  for (let p of user.petList) {
    const currentpet = await DATABASE.Pet.findById(p);
    for (let m of currentpet.matchedBy) {
      const currentm = await DATABASE.Pet.findById(m);
      const contact = (await DATABASE.User.findById(currentm.ownerid)).contact;
      const newmatch = { name: currentm.name, contact: contact, id: m }
      matches = [...matches, newmatch];
    }
  }
  res.json({ matches: matches });
}

async function get_my_puppies(req, res) {
  const user = await AUTH.get_user(req);
  let petlist = [];
  for (let p of user.petList) {
    let currentpet = await DATABASE.Pet.findById(p);
    petlist = [...petlist, { id: currentpet.id, name: currentpet.name }];
  }
  res.json({ pets: petlist });
}


async function get_a_puppy(req, res) {
  const user = await AUTH.get_user(req);
  const pet = await DATABASE.Pet.findById(req.body.id);
  let flag = false;
  for (let p of user.petList) {
    if (pet.matchedBy.includes(p)) {
      flag = true;
    }
  }
  // TODO: Remove elements from the pet json (matchedBy and stuff like that)
  if (pet.ownerid == user.id || flag) {
    res.json(pet);
  }

}

// TODO: Remove matchedBy and likedBy from return array
async function get_new_puppy(req, res) {
  const user = await AUTH.get_user(req);
  const pet = await DATABASE.Pet.find({ ownerid: { $ne: user.id } });
  res.json(pet[Math.floor(Math.random() * pet.length)]);
}

async function add_like(req, res) {
  const user = AUTH.get_user(req);
  const pet = await DATABASE.Pet.findOne({ id: req.body.id });
  if (user == null || pet == null || pet.ownerid != user.id) {
    res.json({ success: false, message: "something went wrong!" });
    return;
  }
  let pusharray = { likedBy: pet.id }
  if (pet.likedBy.includes(req.body.likedid)) {
    pusharray.matchedBy = pet.id;
    await DATABASE.Pet.updateOne({ ownerid: user.id }, { matchedBy: req.body.likedid });
  }
  await DATABASE.Pet.updateOne({ id: req.body.likedid }, { $push: pusharray });
  res.json({ success: true, message: "Everything went successfully" });
}

export default { ENDPOINTS };
