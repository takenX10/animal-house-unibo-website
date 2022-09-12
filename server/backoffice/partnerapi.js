import METHODS from "../methods.js";
import DATABASE from '../database_schema.js';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

var jsonParser = bodyParser.json()
const JWT_SECRET_KEY = "idkman_something_not_real"

let ENDPOINTS = [
    {
        endpoint: "/backoffice/add_like",
        method: METHODS.POST,
        opts: jsonParser,
        function: add_like
    }
]

async function add_like(req, res){
    const db = DATABASE.connect();
    if(!req.cookies || !req.cookies.AUTHSESSION) {
        res.json({success: false, message:"You need to be logged in to use this endpoint"});
        return;
    }
    var decoded = jwt.verify(req.cookies.AUTHSESSION, JWT_SECRET_KEY);
    let user = await DATABASE.User.findOne({username: decoded.username});
    console.log(req.body);
    let pet = await DATABASE.Pet.findOne({petid:req.body.id});
    console.log(pet);
    if(user == null || pet == null || pet.ownerid != user.id){
        res.json({success: false, message:"something went wrong!"});
        return;
    }
    console.log(pet, user);
    let pusharray = {likedBy: pet.id}
    if(pet.likedBy.includes(req.body.likedid)){
        pusharray.matchedBy = pet.id;
        await DATABASE.Pet.update({ownerid:user.id}, {matchedBy:req.body.likedid});
    }
    await DATABASE.Pet.update({petid:req.body.likedid}, {$push : pusharray});
    res.json({success: true, message:"Everything went successfully"});
}

export default { ENDPOINTS };