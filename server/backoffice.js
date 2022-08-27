import METHODS from "./methods.js";
import path from "path";
import DATABASE from './database_schema.js';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
]

function officeLogin(req, res){
    res.sendFile("./backoffice/login.htm", { root : __dirname });
}

async function officePostLogin(req, res){
    const db = DATABASE.connect();
    // Really really really vulnerable way of doing this, TODO: fix
    res.json({"response": (await DATABASE.User.exists(req.body) != null ? true : false)});
}

function officeRegister(req, res){
    res.sendFile("./backoffice/register.htm", {root: __dirname});
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
        res.json({"response":true});
    }
}

export default { ENDPOINTS };