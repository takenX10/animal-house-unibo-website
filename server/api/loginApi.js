import METHODS from "../methods.js";
import DATABASE from '../database.js';
import AUTH from '../authentication.js';
import { __dirname, isAuth } from '../utils.js';
import bodyParser from 'body-parser';


var jsonParser = bodyParser.json()

let ENDPOINTS = [
  //{ endpoint: "/backoffice/login", method: METHODS.GET,opts: [jsonParser, isAuth], function: officeLogin },
  { endpoint: "/backoffice/login", method: METHODS.POST, opts: [jsonParser], function: officePostLogin },
  //{ endpoint: "/backoffice/register", method: METHODS.GET, opts: [jsonParser, isAuth], function: officeRegister },
  { endpoint: "/backoffice/register", method: METHODS.POST, opts: [jsonParser, isAuth], function: officePostRegister },
  { endpoint: "/backoffice/home", method: METHODS.GET, opts: [jsonParser, isAuth], function: officeHome },
]

async function officeHome(req, res) {
    res.sendFile("/templates/home.htm", { root: __dirname });
}

async function officeLogin(req, res) {
    res.sendFile("/templates/login.htm", { root: __dirname });
}

async function officePostLogin(req, res) {
  // Really really really vulnerable way of doing this, TODO: fix
  if (req.body && req.body.username && req.body.password && await DATABASE.User.exists({username:req.body.username,password:req.body.password}) != null) {
        AUTH.set_cookie(res, AUTH.generate_cookie(req))
        res.json({ response: true });
    } else {
        res.json({ response: false });
  }
}

async function officeRegister(req, res) {
    res.sendFile("/templates/register.htm", { root: __dirname });
}

async function officePostRegister(req, res) {
  if (await DATABASE.User.exists({ username: req.body.username }) || req.body.username == "") {
    res.json({ "response": false });
  } else {
    // Really really really vulnerable way of doing this, TODO: fix
    await DATABASE.User.create({
      username: req.body.username,
      password: req.body.password,
      isPoster: false
    });
    AUTH.set_cookie(res, AUTH.generate_cookie(req))
    res.json({ "response": true });
  }
}

export default { ENDPOINTS };
