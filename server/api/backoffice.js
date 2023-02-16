import METHODS from "../methods.js";
import DATABASE from "../database.js";
import AUTH from "../authentication.js";
import SERVICES from "./services.js";
import bcrypt, { genSaltSync } from "bcrypt";
import { CLIENT_URL } from "../utils.js";

import { isAdmin, isAuth, jsonParser } from "../utils.js";

let ENDPOINTS = [
  {
    endpoint: "/api/backoffice/get_user",
    method: METHODS.GET,
    opts: [jsonParser, isAuth],
    function: get_user,
  },
  {
    endpoint: "/api/backoffice/get_bookings",
    method: METHODS.GET,
    opts: [jsonParser, isAuth],
    function: get_bookings,
  },
  {
    endpoint: "/api/backoffice/get_all_bookings",
    method: METHODS.GET,
    opts: [jsonParser, isAuth, isAdmin],
    function: get_all_bookings,
  },
  {
    endpoint: "/api/backoffice/delete_booking",
    method: METHODS.DELETE,
    opts: [jsonParser, isAuth],
    function: delete_booking,
  },
  {
    endpoint: "/api/backoffice/edit_booking",
    method: METHODS.PATCH,
    opts: [jsonParser, isAuth],
    function: edit_booking,
  },
  {
    endpoint: "/api/backoffice/change_password",
    method: METHODS.PATCH,
    opts: [jsonParser, isAuth],
    function: change_password,
  },
  {
    endpoint: "/api/backoffice/delete_user",
    method: METHODS.DELETE,
    opts: [jsonParser, isAuth],
    function: delete_user,
  },
  {
    endpoint: "/api/backoffice/delete_user_by_id",
    method: METHODS.DELETE,
    opts: [jsonParser, isAuth, isAdmin],
    function: delete_user_by_id,
  },
  {
    endpoint: "/api/backoffice/edit_user_by_id",
    method: METHODS.PATCH,
    opts: [jsonParser, isAuth, isAdmin],
    function: update_user_by_id,
  },
  {
    endpoint: "/api/backoffice/is_admin",
    method: METHODS.POST,
    opts: [jsonParser, isAuth, isAdmin],
    function: is_admin,
  },
  {
    endpoint: "/api/backoffice/become_admin",
    method: METHODS.GET,
    opts: [jsonParser, isAuth],
    function: become_admin,
  },
  {
    endpoint: "/backoffice/facetoface",
    method: METHODS.GET,
    opts: [jsonParser, isAuth, isAdmin],
    function: showFaceToFace,
  },
  {
    endpoint: "/backoffice/online",
    method: METHODS.GET,
    opts: [jsonParser, isAuth, isAdmin],
    function: showOnline,
  },
  {
    endpoint: "/backoffice/shop",
    method: METHODS.GET,
    opts: [jsonParser, isAuth, isAdmin],
    function: showShop,
  },
  {
    endpoint: "/backoffice/games",
    method: METHODS.GET,
    opts: [jsonParser, isAuth, isAdmin],
    function: showGames,
  },
  {
    endpoint: "/api/backoffice/add_category",
    method: METHODS.PUT,
    opts: [jsonParser, isAuth],
    function: add_category,
  },
  {
    endpoint: "/api/backoffice/add_product",
    method: METHODS.PUT,
    opts: [jsonParser, isAuth],
    function: add_product,
  },
  {
    endpoint: "/api/backoffice/edit_product",
    method: METHODS.PATCH,
    opts: [jsonParser, isAuth],
    function: edit_product,
  },
  {
    endpoint: "/api/backoffice/delete_product",
    method: METHODS.DELETE,
    opts: [jsonParser, isAuth],
    function: delete_product,
  },
  {
    endpoint: "/api/backoffice/games/delete_score",
    method: METHODS.DELETE,
    opts: [jsonParser, isAuth],
    function: delete_score,
  },
];

async function showFaceToFace(req, res) {
  res.render("../templates/services", {
    clientUrl: CLIENT_URL,
    title: "Face to face",
    type: "facetoface",
    isOnline: false,
  });
}
async function showOnline(req, res) {
  res.render("../templates/services", {
    clientUrl: CLIENT_URL,
    title: "Online",
    type: "online",
    isOnline: true,
  });
}

async function showShop(req, res) {
  res.render("../templates/shop", {
    title: "Shop",
    type: "online",
    clientUrl: CLIENT_URL,
  });
}

async function showGames(req, res) {
  res.render("../templates/games", { title: "Games", clientUrl: CLIENT_URL });
}

async function is_admin(req, res) {
  res.json({ success: true });
}

async function become_admin(req, res) {
  const user = await AUTH.get_user(req);
  await DATABASE.User.findOneAndUpdate(
    { email: user.email },
    { isAdmin: true }
  );
  res.json({ success: true });
}

async function delete_user(req, res) {
  const user = await AUTH.get_user(req);
  await DATABASE.User.findByIdAndDelete(user.id);
  res.json({ success: true });
}
async function delete_user_by_id(req, res) {
  if (!req?.body?.id == null) {
    res.status(400).json({ success: false, message: "missing id field" });
  }
  const user = await DATABASE.User.findByIdAndDelete(req.body.id);
  await DATABASE.User.findByIdAndDelete(user.id);
  res.json({ success: true });
}

async function update_user_by_id(req, res) {
  if (
    !req?.body?.id == null ||
    !req.body?.name ||
    !req.body?.surname ||
    !req.body?.password ||
    !req.body?.contact
  ) {
    res.status(400).json({ success: false, message: "missing fields" });
    return;
  }
  const thisuser = await DATABASE.User.findById(req.body.id);
  const user = await DATABASE.User.findByIdAndUpdate(req.body.id, {
    $set: {
      name: req.body.name,
      surname: req.body.surname,
      password:
        req.body.password == thisuser.password
          ? thisuser.password
          : bcrypt.hashSync(req.body.password, genSaltSync()),
      contact: req.body.contact,
    },
  });
  res.json({ success: true });
}

async function get_user(req, res) {
  const user = await AUTH.get_user(req);
  res.json({
    name: user.name,
    surname: user.surname,
    email: user.email,
    contact: user.contact,
    petList: user.petList,
  });
}

function getAvailabilityInfo(avails, avaId, shiftId, hourId) {
  for (let i = 0; i < avails.length; i++) {
    if (avails[i]._id.toString() == avaId) {
      for (let j = 0; j < avails[i].shifts.length; j++) {
        if (avails[i].shifts[j]._id.toString() == shiftId) {
          for (let k = 0; k < avails[i].shifts[j].hours.length; k++) {
            if (avails[i].shifts[j].hours[k]._id.toString() == hourId) {
              return {
                availability: avails[i],
                shift: avails[i].shifts[j],
                hour: avails[i].shifts[j].hours[k],
              };
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
    let bookings = [];
    for (let i = 0; i < user.bookings.length; i++) {
      let slug = user.bookings[i].slug;
      let avaId = user.bookings[i].avaId;
      let shiftId = user.bookings[i].shiftId;
      let hourId = user.bookings[i].hourId;
      if (typeof avaId !== String) avaId = avaId.toString();
      if (typeof shiftId !== String) shiftId = shiftId.toString();
      if (typeof hourId !== String) hourId = hourId.toString();
      let serv = await DATABASE.Service.findOne({ slug: slug });
      // delete user.bookings[i].opts['id']
      let { availability, shift, hour } = getAvailabilityInfo(
        serv.availabilities,
        avaId,
        shiftId,
        hourId
      );
      availability.shifts = [];
      shift.hours = [];
      delete user.bookings[i].opts['id']
      let booking = {
        slug: slug,
        availability,
        shift,
        hour,
        title: serv.title,
        opts: user.bookings[i].opts,
      };
      bookings.push(booking);
    }
    res.json({
      success: true,
      bookings,
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
    let bookings = [];
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      for (let i = 0; i < user.bookings.length; i++) {
        let slug = user.bookings[i].slug;
        let avaId = user.bookings[i].avaId;
        let shiftId = user.bookings[i].shiftId;
        let hourId = user.bookings[i].hourId;
        let isOnline = user.bookings[i].isOnline;
        if (typeof avaId !== String) avaId = avaId.toString();
        if (typeof shiftId !== String) shiftId = shiftId.toString();
        if (typeof hourId !== String) hourId = hourId.toString();
        let serv = await DATABASE.Service.findOne({ slug: slug });
        let { availability, shift, hour } = getAvailabilityInfo(
          serv.availabilities,
          avaId,
          shiftId,
          hourId
        );
        availability.shifts = [];
        shift.hours = [];
        delete user.bookings[i].opts['id']
        let booking = {
          userName: user.name,
          email: user.email,
          slug: slug,
          availability,
          shift,
          hour,
          title: serv.title,
          isOnline,
          opts: user.bookings[i].opts,
        };
        bookings.push(booking);
      }
    }
    res.json({
      success: true,
      bookings,
    });
  } catch (e) {
    console.log(e);
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
  if (typeof avaId !== String) avaId = avaId.toString();
  if (typeof shiftId !== String) shiftId = shiftId.toString();
  if (typeof hourId !== String) hourId = hourId.toString();
  for (let i = 0; i < user.bookings.length; i++) {
    if (
      user.bookings[i].avaId.toString() == avaId &&
      user.bookings[i].shiftId.toString() == shiftId &&
      user.bookings[i].hourId.toString() == hourId
    ) {
      user.bookings.splice(i, 1);
      break;
    }
  }
  let service = await DATABASE.Service.findOne({ slug: slug });
  service = SERVICES.decrementHourById(service, hourId);
  await DATABASE.Service.findByIdAndUpdate(service._id, {
    availabilities: service.availabilities,
  });
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
  if (typeof avaId !== String) avaId = avaId.toString();
  if (typeof shiftId !== String) shiftId = shiftId.toString();
  if (typeof hourId !== String) hourId = hourId.toString();
  let service = await DATABASE.Service.findOne({ slug: slug });
  service = SERVICES.editHourById(service, hourId, begin, end);
  service = SERVICES.editShiftById(service, shiftId, day);
  service = SERVICES.editCityAddressById(service, avaId, city, address);
  await DATABASE.Service.findByIdAndUpdate(service._id, {
    availabilities: service.availabilities,
  });
  await DATABASE.User.updateOne({ _id: user._id }, { bookings: user.bookings });
  res.json({
    success: true,
  });
}
async function add_category(req, res) {
  let name = req?.body?.name;
  let parent = req?.body?.parentCategory;
  let category = `${parent}/${name.replace(/\s+/g, "-").toLowerCase()}`;
  parent ||= "/";
  const newCat = new DATABASE.ProductCategory({
    name,
    parent,
    category,
  });
  await newCat.save();
  res.json({
    success: true,
  });
}

async function add_product(req, res) {
  let slug = req?.body?.slug;
  let name = req?.body?.name;
  let poster = req?.body?.poster;
  let images = req?.body?.images;
  let brand = req?.body?.brand;
  let categories = req?.body?.cat;
  let description = req?.body?.desc;
  let price = req?.body?.price;
  let countInStock = req?.body?.count;
  const newProd = new DATABASE.Product({
    name,
    slug,
    poster,
    images,
    brand,
    categories,
    description,
    price,
    countInStock,
    rating: 0,
    numReviews: 0,
  });
  await newProd.save();
  res.json({
    success: true,
  });
}

async function edit_product(req, res) {
  let slug = req?.body?.slug;
  let name = req?.body?.name;
  let desc = req?.body?.desc;
  let price = req?.body?.price;
  let count = req?.body?.count;
  let categories = req?.body?.categories;
  let prod = await DATABASE.Product.findOne({ slug: slug });
  prod.name = name;
  prod.desc = desc;
  prod.price = price;
  prod.countInStock = count;
  prod.categories = categories;
  await prod.save();
  res.json({
    success: true,
  });
}

async function delete_product(req, res) {
  let slug = req?.body?.slug;
  await DATABASE.Product.deleteOne({ slug: slug });
  res.json({
    success: true,
  });
}

async function delete_score(req, res) {
  let id = req?.body?.id;
  await DATABASE.Score.deleteOne({ _id: id });
  res.json({
    success: true,
  });
}

// TODO: check every update for a direct body value inclusion
async function change_password(req, res) {
  const user = await AUTH.get_user(req);
  if (!bcrypt.compareSync(req?.body?.oldpsw, user.password)) {
    res.json({ success: false });
    return;
  }
  // unsafe:
  await DATABASE.User.findByIdAndUpdate(user.id, {
    password: bcrypt.hashSync(req.body.newpsw, genSaltSync()),
  });
  res.json({ success: true });
}

export default { ENDPOINTS };
