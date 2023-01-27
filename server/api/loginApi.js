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
  { endpoint: "/backoffice/get_user", method: METHODS.GET, opts: [jsonParser, isAuth], function: get_user },
  { endpoint: "/backoffice/get_bookings", method: METHODS.GET, opts: [jsonParser, isAuth], function: get_bookings },
  { endpoint: "/backoffice/get_all_bookings", method: METHODS.GET, opts: [jsonParser, isAuth, isAdmin], function: get_all_bookings },
  { endpoint: "/backoffice/delete_booking", method: METHODS.DELETE, opts: [jsonParser, isAuth], function: delete_booking },
  { endpoint: "/backoffice/edit_booking", method: METHODS.PATCH, opts: [jsonParser, isAuth], function: edit_booking },
  { endpoint: "/backoffice/change_password", method: METHODS.PATCH, opts: [jsonParser, isAuth], function: change_password },
  { endpoint: "/backoffice/delete_user", method: METHODS.DELETE, opts: [jsonParser, isAuth], function: delete_user },
  { endpoint: "/backoffice/is_admin", method: METHODS.POST, opts: [jsonParser, isAuth, isAdmin], function: is_admin },
  { endpoint: "/backoffice/become_admin", method: METHODS.GET, opts: [jsonParser, isAuth], function: become_admin },
  { endpoint: "/backoffice/facetoface", method: METHODS.GET, opts: [jsonParser, isAuth, isAdmin], function: showFaceToFace },
  { endpoint: "/backoffice/online", method: METHODS.GET, opts: [jsonParser, isAuth, isAdmin], function: showOnline },
]

async function officeHome(req, res) {
  res.render("../templates/anagrafica", { title: "Anagrafica clienti" });
}

async function showFaceToFace(req, res) {
  // res.render("../templates/facetoface", { title: "Face to face services" });
  res.render("../templates/services", { title: "Face to face", type: "facetoface", isOnline: false });
}
async function showOnline(req, res) {
  res.render("../templates/services", { title: "Online", type: "online", isOnline: true });
}

async function is_admin(req, res) {
  res.json({ success: true });
}

async function become_admin(req, res) {
  const user = await AUTH.get_user(req);
  await DATABASE.User.findOneAndUpdate({ email: user.email }, { isAdmin: true });
  res.json({ success: true });
}

async function delete_user(req, res) {
  const user = await AUTH.get_user(req);
  await DATABASE.User.findByIdAndDelete(user.id);
  res.json({ success: true });
}

async function get_user(req, res) {
  const user = await AUTH.get_user(req);
  res.json({
    name: user.name,
    surname: user.surname,
    email: user.email,
    contact: user.contact,
    petList: user.petList
  });
}

function getAvailabilityInfo(avails, avaId, shiftId, hourId) {
  for (let i = 0; i < avails.length; i++) {
    if (avails[i]._id.toString() == avaId) {
      for (let j = 0; j < avails[i].shifts.length; j++) {
        if (avails[i].shifts[j]._id.toString() == shiftId) {
          for (let k = 0; k < avails[i].shifts[j].hours.length; k++) {
            if (avails[i].shifts[j].hours[k]._id.toString() == hourId) {
              return { "availability": avails[i], "shift": avails[i].shifts[j], "hour": avails[i].shifts[j].hours[k] }
            }
          }
          break;
        }
      }
      break;
    }
  }
}

async function get_bookings(req, res) {
  try {
    const user = await AUTH.get_user(req);
    let bookings = []
    for (let i = 0; i < user.bookings.length; i++) {
      let slug = user.bookings[i].slug;
      let avaId = user.bookings[i].avaId;
      let shiftId = user.bookings[i].shiftId;
      let hourId = user.bookings[i].hourId;
      if (typeof (avaId) !== String)
        avaId = avaId.toString();
      if (typeof (shiftId) !== String)
        shiftId = shiftId.toString();
      if (typeof (hourId) !== String)
        hourId = hourId.toString();
      let serv = await DATABASE.Service.findOne({ slug: slug })
      let { availability, shift, hour } = getAvailabilityInfo(serv.availabilities, avaId, shiftId, hourId);
      availability.shifts = []
      shift.hours = []
      let booking = { slug: slug, availability, shift, hour, title: serv.title, }
      bookings.push(booking);
    }
    res.json({
      success: true,
      bookings
    });
  } catch (e) {
    res.json({
      success: false,
    });
  }
}
async function get_all_bookings(req, res) {
  try {
    const users = await DATABASE.User.find({});
    let bookings = []
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      for (let i = 0; i < user.bookings.length; i++) {
        let slug = user.bookings[i].slug;
        let avaId = user.bookings[i].avaId;
        let shiftId = user.bookings[i].shiftId;
        let hourId = user.bookings[i].hourId;
        let isOnline = user.bookings[i].isOnline;
        if (typeof (avaId) !== String)
          avaId = avaId.toString();
        if (typeof (shiftId) !== String)
          shiftId = shiftId.toString();
        if (typeof (hourId) !== String)
          hourId = hourId.toString();
        let serv = await DATABASE.Service.findOne({ slug: slug })
        let { availability, shift, hour } = getAvailabilityInfo(serv.availabilities, avaId, shiftId, hourId);
        availability.shifts = []
        shift.hours = []
        let booking = { userName: user.name, email: user.email, slug: slug, availability, shift, hour, title: serv.title, isOnline }
        bookings.push(booking);
      }
    }
    res.json({
      success: true,
      bookings
    });
  } catch (e) {
    console.log(e)
    res.json({
      success: false,
    });
  }
}
async function delete_booking(req, res) {
  const user = await AUTH.get_user(req);
  let slug = req?.body?.slug;
  let avaId = req?.body?.avaId;
  let shiftId = req?.body?.shiftId;
  let hourId = req?.body?.hourId;
  if (typeof (avaId) !== String)
    avaId = avaId.toString();
  if (typeof (shiftId) !== String)
    shiftId = shiftId.toString();
  if (typeof (hourId) !== String)
    hourId = hourId.toString();
  for (let i = 0; i < user.bookings.length; i++) {
    if (user.bookings[i].avaId.toString() == avaId && user.bookings[i].shiftId.toString() == shiftId && user.bookings[i].hourId.toString() == hourId) {
      user.bookings.splice(i, 1);
      break;
    }
  }
  let service = await DATABASE.Service.findOne({ slug: slug });
  service = SERVICES.decrementHourById(service, hourId);
  await DATABASE.Service.findByIdAndUpdate(service._id, { availabilities: service.availabilities });
  await DATABASE.User.updateOne({ _id: user._id }, { bookings: user.bookings });
  res.json({
    success: true,
  });
}

async function edit_booking(req, res) {
  const user = await AUTH.get_user(req);
  let slug = req?.body?.slug;
  let avaId = req?.body?.avaId;
  let shiftId = req?.body?.shiftId;
  let hourId = req?.body?.hourId;
  let day = req?.body?.day;
  let begin = req?.body?.begin;
  let end = req?.body?.end;
  let city = req?.body?.city;
  let address = req?.body?.address;
  if (typeof (avaId) !== String)
    avaId = avaId.toString();
  if (typeof (shiftId) !== String)
    shiftId = shiftId.toString();
  if (typeof (hourId) !== String)
    hourId = hourId.toString();
  let service = await DATABASE.Service.findOne({ slug: slug });
  service = SERVICES.editHourById(service, hourId, begin, end);
  service = SERVICES.editShiftById(service, shiftId, day);
  service = SERVICES.editCityAddressById(service, avaId, city, address);
  await DATABASE.Service.findByIdAndUpdate(service._id, { availabilities: service.availabilities });
  await DATABASE.User.updateOne({ _id: user._id }, { bookings: user.bookings });
  res.json({
    success: true,
  });
}


// TODO: check every update for a direct body value inclusion
async function change_password(req, res) {
  const user = await AUTH.get_user(req);
  if (!bcrypt.compareSync(req?.body?.oldpsw, user.password)) {
    res.json({ success: false });
    return
  }
  // unsafe:
  await DATABASE.User.findByIdAndUpdate(user.id, { password: bcrypt.hashSync(req.body.newpsw, genSaltSync()) });
  res.json({ success: true });
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
