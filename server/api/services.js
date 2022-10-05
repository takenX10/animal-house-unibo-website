import METHODS from "../methods.js";
import DATABASE from '../database.js';

const ENDPOINTS = [
  { endpoint: "/api/services/facetoface/slug/:slug", method: METHODS.GET, function: serviceFaceToFaceBySlug },
  { endpoint: "/api/services/facetoface", method: METHODS.GET, function: serviceFaceToFaceRoutes },
];

async function serviceFaceToFaceBySlug(req, res) {

  const prod = await DATABASE.ServiceFaceToFace.findOne({ slug: req.params.slug });
  if (prod) {
    res.json(prod);
  } else {
    res.status(404).json({ message: 'Product Not Found' })
  }
}


async function serviceFaceToFaceRoutes(req, res) {
  const services = await DATABASE.ServiceFaceToFace.find();
  res.json(services);
}

async function serviceFaceToFaceBook(req, res) {

}

export default { ENDPOINTS };

