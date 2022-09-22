import METHODS from "../methods.js";
import DATABASE from '../database.js';
import AUTH from '../authentication.js'
import path from "path";
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';


var jsonParser = bodyParser.json()

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
    opts: jsonParser,
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
    opts: jsonParser,
    function: officePostRegister
  },
  {
    endpoint: "/backoffice/home",
    method: METHODS.GET,
    function: officeHome
  },
]

function officeHome(req, res) {
  if (AUTH.check_login(req)) {
    res.sendFile("../templates/home.htm", { root: __dirname });
  } else {
    res.redirect("/backoffice/login");
  }
}

function officeLogin(req, res) {
  if (AUTH.check_login(req)) {
    res.redirect("/backoffice/home");
  } else {
    res.sendFile("./login.htm", { root: __dirname });
  }
}

async function officePostLogin(req, res) {
  // Really really really vulnerable way of doing this, TODO: fix
  if (await DATABASE.User.exists(req.body) != null) {
    AUTH.set_cookie(res, AUTH.generate_cookie(req))
    res.json({ response: true });
  } else {
    res.json({ response: false });
  }
}

function officeRegister(req, res) {
  if (AUTH.check_login(req)) {
    res.redirect("/backoffice/home");
  } else {
    res.sendFile("./register.htm", { root: __dirname });
  }
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
