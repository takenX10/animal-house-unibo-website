import METHODS from "../methods.js";
import { isAuth } from "../utils.js";
import DATABASE from '../database.js';

const ENDPOINTS = [
  { endpoint: "/api/shop/products", method: METHODS.GET, function: productRoutes },
  { endpoint: "/api/shop/products/:id", method: METHODS.GET, function: productById },
  { endpoint: "/api/shop/products/slug/:slug", method: METHODS.GET, function: productBySlug },
  { endpoint: "/api/shop/orders/:id", opts: isAuth, method: METHODS.GET, function: productOrderId },
  { endpoint: "/api/shop/orderhistory", opts: isAuth, method: METHODS.GET, function: productOrderMine },
  { endpoint: "/api/shop/orders", opts: isAuth, method: METHODS.POST, function: productOrderPost },
];


async function productOrderId(req, res) {
  const order = await DATABASE.Order.findOne({ user: req.user._id, _id: req.params.id });
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order Not Found' });
  }
}

async function productOrderPost(req, res) {
  console.log("Order request received");
  const newOrder = new DATABASE.Order({
    orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id,

  });
  const order = await newOrder.save();
  res.status(201).json({ message: 'New Order Created', order });
}

async function productOrderMine(req, res) {
  const orders = await DATABASE.Order.find({ user: req.user._id });
  res.json(orders);
}

async function productRoutes(req, res) {
  const products = await DATABASE.Product.find();
  res.json(products);
}

async function productById(req, res) {
  const prod = await DATABASE.Product.findById(req.params.id);

  if (prod) {
    res.json(prod);
  } else {
    res.status(404).json({ message: 'Product Not Found' })
  }
}

async function productBySlug(req, res) {

  const prod = await DATABASE.Product.findOne({ slug: req.params.slug });
  if (prod) {
    res.json(prod);
  } else {
    res.status(404).json({ message: 'Product Not Found' })
  }
}

export default { ENDPOINTS };
