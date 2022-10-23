import METHODS from "../methods.js";
import DATABASE from '../database.js';
import AUTH from "../authentication.js";
import { isAuth, jsonParser } from "../utils.js";

const ENDPOINTS = [
  { endpoint: "/api/services/facetoface/slug/:slug", method: METHODS.GET, function: serviceFaceToFaceBySlug },
  { endpoint: "/api/services/facetoface", method: METHODS.GET, function: serviceFaceToFaceRoutes },
  { endpoint: "/api/services/facetoface/book/:slug", method: METHODS.POST, opts: [jsonParser, isAuth], function: serviceFaceToFaceBook },
];

function removeBusyHours(service) {
  for (let i = 0; i < service.availabilities.length; i++) {
    for (let j = service.availabilities[i].shifts.length - 1; j > -1; j--) {
      for (let k = service.availabilities[i].shifts[j].hours.length - 1; k > -1; k--) {
        if (service.availabilities[i].shifts[j].hours[k].current_clients >= service.availabilities[i].shifts[j].hours[k].max_clients) {
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
        if (service.availabilities[i].shifts[j].hours[k]._id == id) {
          return (service.availabilities[i]._id, service.availabilities[i].shifts[j]._id, service.availabilities[i].shifts[j].hours[k]);
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
        if (service.availabilities[i].shifts[j].hours[k]._id == id) {
          service.availabilities[i].shifts[j].hours[k].current_clients = service.availabilities[i].shifts[j].hours[k].current_clients + 1;
        }
      }
    }
  }
  return service;
}

async function serviceFaceToFaceBySlug(req, res) {
  let service = await DATABASE.ServiceFaceToFace.findOne({ slug: req.params.slug });
  service = removeBusyHours(service)
  if (service) {
    res.json(service);
  } else {
    res.status(404).json({ message: 'Service not found' })
  }
}


async function serviceFaceToFaceRoutes(req, res) {
  const services = await DATABASE.ServiceFaceToFace.find();
  res.json(services);
}

async function serviceFaceToFaceBook(req, res) {
  try {
    const user = await AUTH.get_user(req);
    let service = await DATABASE.ServiceFaceToFace.findOne({ slug: req.params.slug });
    let hourId = req.body.id;
    if (service == undefined) {
      notfound(res)
      return;
    }
    service = removeBusyHours(service)
    let avaId, shiftId, hour = findHourById(service, hourId);
    if (hour == undefined) {
      notfound(res);
      return;
    }
    if (hour.current_clients >= hour.max_clients) {
      notfound(res);
      return;
    }
    service = incrementHourById(service, hourId);
    await DATABASE.ServiceFaceToFace.findByIdAndUpdate(service._id, { availabilities: service.availabilities });
    let booking = { userId: user._id, avaId, shiftId, hourId };
    await DATABASE.ServiceFaceToFace.updateOne({ _id: service._id }, { $push: { bookings: booking } });
    res.status(200).json({ message: 'Booking completed' })
  } catch (e) {
    console.log("not found");
    notfound(res)
  }
}

function notfound(res) {
  res.status(404).json({ message: 'Service not found' })
}

export default { ENDPOINTS };

