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
]

function officeLogin(req, res){
    res.sendFile("./backoffice/login.htm", { root : __dirname });
}

async function officePostLogin(req, res){
    let db = DATABASE.connect();
    // Really really really vulnerable way of doing this, TODO: fix
    res.json({"response": (await DATABASE.User.exists(req.body) != null ? true : false)});
}

export default { ENDPOINTS };