import mongoose from 'mongoose';
import METHODS from "../methods.js";
import DATABASE from '../database.js';
import AUTH from "../authentication.js";
import { isAdmin, isAuth, jsonParser } from '../utils.js';

const ENDPOINTS = [
  { endpoint: "/api/services/facetoface/slug/:slug", method: METHODS.GET, function: serviceFaceToFaceBySlug },
  { endpoint: "/api/services/back/facetoface/slug/:slug/add", method: METHODS.PUT, opts: [jsonParser, isAuth, isAdmin], function: serviceFaceToFaceAddAvaBySlug },
  { endpoint: "/api/services/facetoface", method: METHODS.GET, function: serviceFaceToFaceRoutes },
  { endpoint: "/api/services/facetoface/book/:slug", method: METHODS.POST, opts: [jsonParser, isAuth], function: serviceFaceToFaceBook },
  { endpoint: "/api/services/online/slug/:slug", method: METHODS.GET, function: serviceOnlineBySlug },
  { endpoint: "/api/services/online", method: METHODS.GET, function: serviceOnlineRoutes },
  { endpoint: "/api/services/online/book/:slug", method: METHODS.POST, opts: [jsonParser, isAuth], function: serviceOnlineBook },
  { endpoint: "/api/services/:slug/reviews", method: METHODS.PUT, opts: [jsonParser, isAuth], function: saveReviewService },
  { endpoint: "/api/services/:slug/reviews", method: METHODS.GET, opts: [jsonParser], function: reviewsBySlug },
];

function removeBusyHours(service) {
  for (let i = 0; i < service.availabilities.length; i++) {
    for (let j = service.availabilities[i].shifts.length - 1; j > -1; j--) {
      for (let k = service.availabilities[i].shifts[j].hours.length - 1; k > -1; k--) {
        if (service.availabilities[i].shifts[j].hours[k].currentClients >= service.availabilities[i].shifts[j].hours[k].maxClients) {
          service.availabilities[i].shifts[j].hours.splice(k, 1);
        }
      }
      if (service.availabilities[i].shifts[j].hours.length == 0)
        service.availabilities[i].shifts.splice(j, 1);
    }
  }
  return service;
}
function findHourById(service, id) {
  for (let i = 0; i < service.availabilities.length; i++) {
    for (let j = service.availabilities[i].shifts.length - 1; j > -1; j--) {
      for (let k = service.availabilities[i].shifts[j].hours.length - 1; k > -1; k--) {
        if (service.availabilities[i].shifts[j].hours[k]._id.toString() == id) {
          return { "avaId": service.availabilities[i]._id, "shiftId": service.availabilities[i].shifts[j]._id, "hour": service.availabilities[i].shifts[j].hours[k] }
        }
      }
    }
  }
  throw new Error("not found");
}

function incrementHourById(service, id) {
  for (let i = 0; i < service.availabilities.length; i++) {
    for (let j = service.availabilities[i].shifts.length - 1; j > -1; j--) {
      for (let k = service.availabilities[i].shifts[j].hours.length - 1; k > -1; k--) {
        if (service.availabilities[i].shifts[j].hours[k]._id.toString() == id) {
          service.availabilities[i].shifts[j].hours[k].currentClients = service.availabilities[i].shifts[j].hours[k].currentClients + 1;
        }
      }
    }
  }
  return service;
}
function decrementHourById(service, id) {
  for (let i = 0; i < service.availabilities.length; i++) {
    for (let j = service.availabilities[i].shifts.length - 1; j > -1; j--) {
      for (let k = service.availabilities[i].shifts[j].hours.length - 1; k > -1; k--) {
        if (service.availabilities[i].shifts[j].hours[k]._id == id) {
          service.availabilities[i].shifts[j].hours[k].currentClients = service.availabilities[i].shifts[j].hours[k].currentClients - 1;
        }
      }
    }
  }
  return service;
}

function editHourById(service, id, begin, end) {
  for (let i = 0; i < service.availabilities.length; i++) {
    for (let j = service.availabilities[i].shifts.length - 1; j > -1; j--) {
      for (let k = service.availabilities[i].shifts[j].hours.length - 1; k > -1; k--) {
        if (service.availabilities[i].shifts[j].hours[k]._id == id) {
          service.availabilities[i].shifts[j].hours[k].begin = begin;
          service.availabilities[i].shifts[j].hours[k].end = end;
        }
      }
    }
  }
  return service;
}

function editShiftById(service, id, day) {
  for (let i = 0; i < service.availabilities.length; i++) {
    for (let j = service.availabilities[i].shifts.length - 1; j > -1; j--) {
      if (service.availabilities[i].shifts[j]._id == id) {
        service.availabilities[i].shifts[j].day = day;
      }
    }
  }
  return service;
}

function editCityAddressById(service, id, city, address) {
  for (let i = 0; i < service.availabilities.length; i++) {
    if (service.availabilities[i]._id == id) {
      service.availabilities[i].city = city;
      service.availabilities[i].address = address;
    }
  }
  return service;
}

async function serviceBySlug(req, res, isOnline) {
  let service = await DATABASE.Service.findOne({ slug: req.params.slug, isOnline: isOnline });
  if (service) {
    service = removeBusyHours(service)
    res.json(service);
  } else {
    notfound(res);
  }
}


async function serviceRoutes(req, res, isOnline) {
  const services = await DATABASE.Service.find({ isOnline: isOnline });
  if (services == undefined) {
    notfound(res)
    return;
  }
  services.bookings = [];
  res.json(services);
}

async function serviceBook(req, res, isOnline) {
  try {
    const user = await AUTH.get_user(req);
    let service = await DATABASE.Service.findOne({ slug: req.params.slug, isOnline: isOnline });
    let hourId = new mongoose.Types.ObjectId(req.body.id);
    if (service == undefined) {
      notfound(res)
      return;
    }
    let { avaId, shiftId, hour } = findHourById(service, hourId.toString());
    if (avaId == undefined || shiftId == undefined || hour == undefined) {
      notfound(res);
      return;
    }
    if (hour.currentClients >= hour.maxClients) {
      notfound(res);
      return;
    }
    service = incrementHourById(service, hourId.toString());
    await DATABASE.Service.findByIdAndUpdate(service._id, { availabilities: service.availabilities });
    let booking = { userId: user._id, avaId, shiftId, hourId };
    await DATABASE.Service.updateOne({ _id: service._id }, { $push: { bookings: booking } });
    let userBooking = { slug: req.params.slug, serviceId: service._id, avaId, shiftId, hourId, isOnline };
    await DATABASE.User.updateOne({ _id: user._id }, { $push: { bookings: userBooking } });
    res.status(200).json({ message: 'Booking completed' })
  } catch (e) {
    console.log("not found");
    notfound(res)
  }
}

async function serviceFaceToFaceBySlug(req, res) {
  return serviceBySlug(req, res, false);
}


async function serviceFaceToFaceRoutes(req, res) {
  return serviceRoutes(req, res, false);
}

async function serviceFaceToFaceBook(req, res) {
  return serviceBook(req, res, false);
}

async function serviceOnlineBySlug(req, res) {
  return serviceBySlug(req, res, true);
}

async function serviceOnlineRoutes(req, res) {
  return serviceRoutes(req, res, true);
}

async function serviceOnlineBook(req, res) {
  return serviceBook(req, res, true);
}

async function serviceAddAvaBySlug(req, res, isOnline) {
  let city = req.body.city;
  let address = req.body.address;
  let maxClients = req.body.maxClients;
  let begin = req.body.begin;
  let end = req.body.end;
  let day = (new Date(begin)).toDateString();
  let service = await DATABASE.Service.findOne({ slug: req.params.slug, isOnline: isOnline });
  let toAdd = { begin, end, maxClients, currentClients: 0 }
  let found = false;
  for (let a = 0; a < service.availabilities.length; a++) {
    let ava = service.availabilities[a];
    if (city == ava.city && address == ava.address) {
      found = true;
      let sfound = false;
      for (let si = 0; si < ava.shifts.length; si++) {
        let s = ava.shifts[si];
        let ss = (new Date(s.day).toDateString())
        if (ss == day) {
          sfound = true;
          service.availabilities[a].shifts[si].hours.push(toAdd)
        }
      }

      if (!sfound) {
        service.availabilities[a].shifts.push({
          day: begin,
          hours: [
            toAdd
          ]
        });
      }
    }
  }
  if (!found) {
    service.availabilities.push(
      {
        city: city,
        address: address,
        shifts:
          [
            {
              day: begin,
              hours: [toAdd]
            }
          ]
      }
    );
  }
  await DATABASE.Service.updateOne({ slug: req.params.slug }, { availabilities: service.availabilities });
  res.status(201).json({ success: true })
}


async function serviceFaceToFaceAddAvaBySlug(req, res) {
  return serviceAddAvaBySlug(req, res, false);
}

async function saveReviewService(req, res) {
  const usName = (await AUTH.get_user(req)).name;
  const service = await DATABASE.Service.findOne({ slug: req.params.slug });
  const newReview = new DATABASE.ReviewService({
    text: req.body.text,
    rating: req.body.rating,
    reviewer: usName,
  });
  await newReview.save();
  service.numReviews++;
  service.rating =
    (service.rating * (service.numReviews - 1) + newReview.rating) /
    service.numReviews;
  service.reviews.push(newReview);
  await service.save();
  res.status(201).json({ message: "Review Posted" });
}

async function reviewsBySlug(req, res) {
  const service = await DATABASE.Service.findOne({ slug: req.params.slug });
  if (service.reviews) {
    console.log(service.reviews);
    res.json(service.reviews);
  } else {
    res.status(404).json({ message: "Reviews not found" });
  }
}

function notfound(res) {
  res.status(404).json({ message: 'Service not found' })
}

export default { ENDPOINTS, decrementHourById, editHourById, editShiftById, editCityAddressById };

