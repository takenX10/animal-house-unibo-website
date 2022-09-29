import METHODS from "../methods.js";
import DATABASE from '../database.js';
import AUTH from '../authentication.js';
import bcrypt, { genSaltSync } from 'bcrypt';
import { __dirname, isAuth, jsonParser } from '../utils.js';

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

    const user = await DATABASE.User.findOne({ email: req?.body?.email});
    if (user && bcrypt.compareSync(req?.body?.password, user.password)){
      AUTH.set_cookie(res, AUTH.generate_cookie(req), {sameSite:'None', secure:true})
      res.json({
        _id:user._id,
        name:user.name,
        surname:user.surname,
        isAdmin:user.isAdmin,
      });
    } else {
      res.status(401).send({ message: 'Invalid email or password' });
    }

}

async function officeRegister(req, res) {
    res.sendFile("/templates/register.htm", { root: __dirname });
}

async function officePostRegister(req, res) {
    if (await DATABASE.User.exists({ email: req.body.email }) || req.body.email == "") {
        res.json({ "response": false });
    } else {
        await DATABASE.User.create({
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
            password: bcrypt.hashSync(req.body.password,genSaltSync()),
        });
        AUTH.set_cookie(res, AUTH.generate_cookie(req))
        res.json({
          _id:user._id,
          name:user.name,
          surname:user.surname,
          isAdmin:user.isAdmin,
        });
    }
}

export default { ENDPOINTS };
