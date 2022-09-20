import METHODS from "./methods.js";
import DATABASE from './database.js';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = "idkman_something_not_real";
var jsonParser = bodyParser.json();

let ENDPOINTS = [
    {
        endpoint: "/backoffice/get_my_id",
        method: METHODS.GET,
        function: get_my_id
    },
    {
        endpoint: "/backoffice/is_logged_in",
        method: METHODS.POST,
        function: loggedin
    },
]

async function loggedin(req, res){
    return (check_login(req) ? {success:true}: {success:false});
}

async function get_my_id(req, res){
    if(!check_login(req)){
        res.json({success:false, error: "you are not logged in"});
        return
    }
    let usr = await get_user(cookie);
    res.json({success:true, id:usr.id});
}

async function get_user(req){
    const db = await DATABASE.connect();
    if(!req.cookie || !req.cookie.AUTHSESSION){
        return null;
    }
    const decrypted_cookie = jwt.verify(req.cookie.AUTHSESSION, JWT_SECRET_KEY);
    return await DATABASE.User.findOne({username:decrypted_cookie.username});
}

function generate_cookie(req){
    return jwt.sign({username:req.body.username, isPoster:false}, JWT_SECRET_KEY);
}

// true -> correctly logged in, false otherwise
async function check_login(req){
    return ((await get_user(req)) ? true : false);
}

function set_cookie(res, token){
    res.cookie('AUTHSESSION', token);
}

export default { ENDPOINTS, check_login, generate_cookie, get_user, set_cookie };