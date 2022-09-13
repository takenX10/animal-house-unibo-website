import METHODS from "../../methods.js";
import DATABASE from '../../database.js';
import AUTH from "../../authentication.js";
import bodyParser from 'body-parser';

var jsonParser = bodyParser.json();

let ENDPOINTS = [
    {
        endpoint: "/backoffice/add_like",
        method: METHODS.POST,
        opts: jsonParser,
        function: add_like
    },
    {
        endpoint: "/backoffice/get_new_puppy",
        method: METHODS.POST,
        opts: jsonParser,
        function: get_new_puppy
    }
]

function not_logged_in(res){
    res.json({success: false, message:"You need to be logged in to use this endpoint"});
}

// TODO: Remove matchedBy and likedBy from return array
async function get_new_puppy(req, res){
    if(!AUTH.check_login(req)){
        not_logged_in(res);
        return;
    }
    const db = DATABASE.connect();
    let user = AUTH.get_user(req);
    let pet = await DATABASE.Pet.find({ownerid : {$ne: user.id} });
    res.json(pet[Math.floor(Math.random() * pet.length)]);
}

async function add_like(req, res){
    if(!AUTH.check_login(req)){
        not_logged_in(res);
        return;
    }
    const db = DATABASE.connect();
    let user = AUTH.get_user(req);
    let pet = await DATABASE.Pet.findOne({petid:req.body.id});
    if(user == null || pet == null || pet.ownerid != user.id){
        res.json({success: false, message:"something went wrong!"});
        return;
    }
    let pusharray = {likedBy: pet.id}
    if(pet.likedBy.includes(req.body.likedid)){
        pusharray.matchedBy = pet.id;
        await DATABASE.Pet.update({ownerid:user.id}, {matchedBy:req.body.likedid});
    }
    await DATABASE.Pet.update({petid:req.body.likedid}, {$push : pusharray});
    res.json({success: true, message:"Everything went successfully"});
}

export default { ENDPOINTS };