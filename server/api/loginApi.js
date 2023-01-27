import METHODS from "../methods.js";
import DATABASE from '../database.js';
import AUTH from '../authentication.js';
import SERVICES from './services.js'
import bcrypt, { genSaltSync } from 'bcrypt';

import { isAdmin, isAuth, jsonParser } from '../utils.js';

let ENDPOINTS = [
  { endpoint: "/backoffice/login", method: METHODS.POST, opts: [jsonParser], function: officePostLogin },
  { endpoint: "/backoffice/register", method: METHODS.POST, opts: [jsonParser], function: officePostRegister },
  { endpoint: "/backoffice/home", method: METHODS.GET, opts: [jsonParser, isAdmin], function: officeHome },
]

async function officeHome(req, res) {
  res.render("../templates/anagrafica", { title: "Anagrafica clienti" });
}



async function officePostLogin(req, res) {
  const user = await DATABASE.User.findOne({ email: req?.body?.email });
  if (user && bcrypt.compareSync(req?.body?.password, user.password)) {
    AUTH.set_cookie(res, AUTH.generate_cookie(req), { sameSite: 'None', secure: true })

    res.json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }

}

async function officePostRegister(req, res) {
  if (!req?.body?.email || await DATABASE.User.exists({ email: req.body.email })) {
    res.json({ success: false, message: "user already exist" });
  } else if (!req?.body?.name || !req?.body?.surname || !req?.body?.contact || !req?.body?.password) {
    res.json({ success: false, message: "Some fields are missing" });
  } else {
    await DATABASE.User.create({
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      contact: req.body.contact,
      password: bcrypt.hashSync(req.body.password, genSaltSync()),
    });
    AUTH.set_cookie(res, AUTH.generate_cookie(req))
    res.json({ success: true });
  }
}

export default { ENDPOINTS };
