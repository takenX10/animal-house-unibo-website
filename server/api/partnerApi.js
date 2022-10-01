import METHODS from "../methods.js";
import DATABASE from '../database.js';
import AUTH from "../authentication.js";
import { isAuth, jsonParser } from "../utils.js";

let ENDPOINTS = [
    { endpoint: "/backoffice/add_like", method: METHODS.POST, opts: [jsonParser, isAuth], function: add_like },
    { endpoint: "/backoffice/get_new_puppy", method: METHODS.POST, opts: [jsonParser, isAuth], function: get_new_puppy },
    { endpoint: "/backoffice/get_a_puppy", method: METHODS.POST, opts: [jsonParser, isAuth], function: get_a_puppy },
    { endpoint: "/backoffice/get_matches", method: METHODS.POST, opts: [jsonParser, isAuth], function: get_matches },
    { endpoint: "/backoffice/get_my_puppies", method: METHODS.POST, opts: [jsonParser, isAuth], function: get_my_puppies },

]

async function get_matches(req, res) {
    const user = await AUTH.get_user(req);
    const pets = user.petList;
    let matches = [];
    for (let p of pets){
        const currentpet = await DATABASE.Pet.findById(p);
        for(let m of currentpet.matchedBy){
            const currentm = await DATABASE.Pet.findById(m);
            const contact = (await DATABASE.User.findById(currentm.ownerid)).contact;
            const newmatch = { name:currentm.name, contact:contact, id:m }
            matches = [...matches, newmatch];
        }
    }
    res.json({matches:matches});
}

async function get_my_puppies(req, res){
    const user = await AUTH.get_user(req);
    let petlist = [];
    for(let p of user.petList){
        let currentpet = await DATABASE.Pet.findById(p);
        petlist = [...petlist, {id:currentpet.id, name:currentpet.name}];
    }
    res.json({pets:petlist});
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
