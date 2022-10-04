import METHODS from "../methods.js";
import DATABASE from '../database.js';
import AUTH from '../authentication.js';
import bcrypt, { genSaltSync } from 'bcrypt';

import { __dirname, isAdmin, isAuth, jsonParser } from '../utils.js';

let ENDPOINTS = [
    //{ endpoint: "/backoffice/login", method: METHODS.GET,opts: [jsonParser, isAuth], function: officeLogin },
    { endpoint: "/backoffice/login", method: METHODS.POST, opts: [jsonParser], function: officePostLogin },
    { endpoint: "/backoffice/register", method: METHODS.POST, opts: [jsonParser], function: officePostRegister },
    { endpoint: "/backoffice/home", method: METHODS.GET, opts: [jsonParser, isAuth], function: officeHome },
    { endpoint: "/backoffice/get_user", method: METHODS.POST, opts:[jsonParser, isAuth], function: get_user},
    { endpoint: "/backoffice/change_password", method: METHODS.POST, opts:[jsonParser, isAuth], function: change_password},
    { endpoint: "/backoffice/delete_user", method: METHODS.POST, opts:[jsonParser, isAuth], function: delete_user},
    { endpoint: "/backoffice/is_admin", method: METHODS.POST, opts:[jsonParser, isAuth, isAdmin], function: is_admin},
]


async function is_admin(req, res){
    res.json({success:true});
}

async function delete_user(req, res){
    const usr = await AUTH.get_user(req);
    await DATABASE.User.findByIdAndDelete(usr.id);
    res.json({success:true});
}

async function get_user(req, res){
    const usr = await AUTH.get_user(req);
    res.json({
        name: usr.name,
        surname: usr.surname,
        email: usr.email,
        contact:usr.contact,
        petList:usr.petList
    });
}

// TODO: check every update for a direct body value inclusion
async function change_password(req, res){
    const usr = await AUTH.get_user(req);
    if(!bcrypt.compareSync(req?.body?.oldpsw, usr.password)){
        res.json({success:false});
        return
    }
    // unsafe:
    await DATABASE.User.findByIdAndUpdate(usr.id, {password: bcrypt.hashSync(req.body.newpsw, genSaltSync())});
    res.json({success:true});
}

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
    if (!req?.body?.email || await DATABASE.User.exists({ email: req.body.email })) {
        res.json({ success: false, message:"user already exist" });
    } else if( !req?.body?.name || !req?.body?.surname || !req?.body?.contact || !req?.body?.password){
        res.json({success:false, message:"Some fields are missing"});
    } else{
        await DATABASE.User.create({
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
            contact: req.body.contact,
            password: bcrypt.hashSync(req.body.password,genSaltSync()),
        });
        AUTH.set_cookie(res, AUTH.generate_cookie(req))
        res.json({success:true});
    }
}

export default { ENDPOINTS };
