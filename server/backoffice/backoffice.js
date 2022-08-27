import METHODS from "../methods.js";
import path from "path";
import DATABASE from '../database_schema.js';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const JWT_SECRET_KEY = "idkman_something_not_real"

let ENDPOINTS = [
    {
        endpoint: "/backoffice/login",
        method: METHODS.GET,
        function: officeLogin
    },
    {
        endpoint: "/backoffice/login",
        method: METHODS.POST,
        opts:  jsonParser,
        function: officePostLogin
    },
    {
        endpoint: "/backoffice/register",
        method: METHODS.GET,
        function: officeRegister
    },
    {
        endpoint: "/backoffice/register",
        method: METHODS.POST,
        opts:  jsonParser,
        function: officePostRegister
    },
    {
        endpoint: "/backoffice/home",
        method: METHODS.GET,
        function: officeHome
    },
]

function officeHome(req, res){
    if(req.cookies != null && req.cookies.AUTHSESSION != null && jwt.verify(req.cookies.AUTHSESSION, JWT_SECRET_KEY)){
        res.sendFile("./home.htm", { root : __dirname });
    }else{
        res.redirect("/backoffice/login");
    }
}

function officeLogin(req, res){
    if(req.cookies != null && req.cookies.AUTHSESSION != null && jwt.verify(req.cookies.AUTHSESSION, JWT_SECRET_KEY)){
        res.redirect("/backoffice/home");
    }else{
        res.sendFile("./login.htm", { root : __dirname });
    }
}

async function officePostLogin(req, res){
    const db = DATABASE.connect();
    // Really really really vulnerable way of doing this, TODO: fix
    if(await DATABASE.User.exists(req.body) != null){
        const token = jwt.sign({username:req.body.username, isPoster:false}, JWT_SECRET_KEY);
        res.cookie('AUTHSESSION', token);
        res.json({"response": true});
    }else{
        res.json({"response": false});
    }
    
}

function officeRegister(req, res){
    if(req.cookies != null && req.cookies.AUTHSESSION != null && jwt.verify(req.cookies.AUTHSESSION, JWT_SECRET_KEY)){
        res.redirect("/backoffice/home");
    }else{
        res.sendFile("./register.htm", {root: __dirname});
    }
}

async function officePostRegister(req, res){
    const db = DATABASE.connect();
    if(await DATABASE.User.exists({username:req.body.username}) || req.body.username == ""){
        res.json({"response":false});
    }else{
        // Really really really vulnerable way of doing this, TODO: fix
        await DATABASE.User.create({
            username: req.body.username,
            password: req.body.password,
            isPoster: false
        });
        const token = jwt.sign({username:req.body.username, isPoster:false}, JWT_SECRET_KEY);
        res.cookie('AUTHSESSION', token);
        res.json({"response":true});
    }
}

export default { ENDPOINTS };