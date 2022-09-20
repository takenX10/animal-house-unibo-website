import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const DBNAME = "animalhouse";
const DBURL = `mongodb://localhost:27017/${DBNAME}`;

async function connect(){
    await mongoose.connect(DBURL);
    console.log("connected...");
    return mongoose;
}

const userSchema = new Schema({
    username:{ type:String, required:true},
    password:{ type:String, required:true},
    id:{type:Number, required:true},
    isPoster:{type:Boolean, required:true}
});

const postSchema = new Schema({
    author:{type:String, required:true},
    message:{type:String, required:true},
    id:{type:Number, required:true}
});

const petSchema = new Schema({
    petid:{type:Number, required:true},
    ownerid:{type:Number, required:true},
    name:{type:String, required:true},
    description:{type:String, required:true},
    race:{type:String, required:true},
    weight:{type:Number, required:true},
    age:{type:Number, required:true},
    sex:{type:String, required:true},
    likedBy:{type:Array, required:true},
    matchedBy:{type:Array, required:true},
    imgList:{type:Array, required:true}
});

const orderSchema = new mongoose.Schema({
    orderItems: [
    {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: String, required: true },
        product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        },
    },
    ],
    shippingAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
},
{
    timestamps: true,
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
},
{
    timestamps: true
});


const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);
const Pet = mongoose.model('Pet', petSchema);
const Order = mongoose.model('Order', orderSchema);
const Product = mongoose.model('Product', productSchema);

export default {User, Post, Pet, Order, Product, connect};