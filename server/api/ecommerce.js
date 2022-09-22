import METHODS from "../methods.js";
import { isAuth } from '../utils.js';
import DATABASE from '../database.js';

const ENDPOINTS = [
    { endpoint: "/api/shop/products", method: METHODS.GET, function: productRoutes },
    { endpoint: "/api/shop/orders/:id", opts: isAuth, method: METHODS.GET, function: productOrderId },
    { endpoint: "/api/shop/orders/mine", opts: isAuth, method: METHODS.GET, function: productOrderMine },
    { endpoint: "/api/shop/orders", opts: isAuth, method: METHODS.POST, function: productOrderPost },
];


async function productOrderId(req, res){
    await DATABASE.connect();
    const order = await DATABASE.Order.findOne({ user: req.user._id, _id: req.params.id });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order Not Found' });
    }
}

async function productOrderPost(req, res){
    await DATABASE.connect();
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

async function productOrderMine (req, res){
    await DATABASE.connect();
    const orders = await DATABASE.Order.find({ user: req.user._id });
    res.json(orders);
}

async function productRoutes(req, res){
    await DATABASE.connect();
    const products = await DATABASE.Product.find();
    res.json(products);
}

export default { ENDPOINTS };
