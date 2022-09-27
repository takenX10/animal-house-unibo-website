import METHODS from "../methods.js";
import DATABASE from '../database.js';
import AUTH from "../authentication.js";
import { isAuth } from "../utils.js";
import bodyParser from 'body-parser';

var jsonParser = bodyParser.json();

let ENDPOINTS = [
    {
        endpoint: "/backoffice/add_like",
        method: METHODS.POST,
        opts: [jsonParser, isAuth],
        function: add_like
    },
    {
        endpoint: "/backoffice/get_new_puppy",
        method: METHODS.POST,
        opts: [jsonParser, isAuth],
        function: get_new_puppy
    },
    {
        endpoint: "/backoffice/get_a_puppy",
        method: METHODS.POST,
        opts: [jsonParser, isAuth],
        function: get_a_puppy
    },
]

async function get_a_puppy(req, res){
    const user = AUTH.get_user(req);
    const pet = await DATABASE.Pet.findOne({petid:req.body.puppyId});
    let flag = false;
    for(let p of user.petList){
        if(pet.matchedBy.includes(p)){
            flag = true;
        }
    }
    // TODO: Remove elements from the pet json (matchedBy and stuff like that)
    if(pet.ownerid == user.id || flag){
        res.json(pet);
    }

}

// TODO: Remove matchedBy and likedBy from return array
async function get_new_puppy(req, res) {
  const user = AUTH.get_user(req);
  const pet = await DATABASE.Pet.find({ ownerid: { $ne: user.id } });
  res.json(pet[Math.floor(Math.random() * pet.length)]);
}

async function add_like(req, res) {
  const user = AUTH.get_user(req);
  const pet = await DATABASE.Pet.findOne({ petid: req.body.id });
  if (user == null || pet == null || pet.ownerid != user.id) {
    res.json({ success: false, message: "something went wrong!" });
    return;
  }
  let pusharray = { likedBy: pet.id }
  if (pet.likedBy.includes(req.body.likedid)) {
    pusharray.matchedBy = pet.id;
    await DATABASE.Pet.update({ ownerid: user.id }, { matchedBy: req.body.likedid });
  }
  await DATABASE.Pet.update({ petid: req.body.likedid }, { $push: pusharray });
  res.json({ success: true, message: "Everything went successfully" });
}

export default { ENDPOINTS };
