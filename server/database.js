import mongoose from "mongoose";
const Schema = mongoose.Schema;
const DBNAME = "animalhouse";
const DBURL = `mongodb://127.0.0.1:27017/${DBNAME}`;

async function connect() {
  await mongoose.connect(DBURL);
  console.log("connected...");
  return mongoose;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  isAdmin: { type: Boolean, default: false, required: true },
  petList: { type: Array, required: false },
  bookings: { type: Array },
});

const postSchema = new Schema({
  author: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, required: false },
  answerFrom: { type: String, required: false },
});

const scoreSchema = new Schema({
  author: { type: String, required: true },
  score: { type: Number, required: true },
  leaderboard: { type: String, required: true },
  date: { type: String, required: true },
  authorId: { type: String, required: true },
});

const petSchema = new Schema({
  ownerid: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  race: { type: String, required: true },
  weight: { type: Number, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  likedBy: { type: Array, required: true },
  matchedBy: { type: Array, required: true },
  imgList: { type: Array, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        poster: { type: String, required: true },
        price: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
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
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    poster: { type: String, required: true },
    images: { type: Array, required: true },
    brand: { type: String, required: true },
    categories: { type: Array, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const reviewSchema = new Schema(
  {
    text: { type: String, required: false },
    rating: { type: Number, required: true },
    reviewer: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    slug: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  parent: { type: String, required: true },
  category: { type: String, required: true, unique: true },
});

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  city: { type: String, required: true },
  day: { type: String, required: true },
  hour: { type: String, required: true },
  opts: { type: String },
});
const serviceHourSchema = new mongoose.Schema({
  begin: { type: String, required: true },
  end: { type: String, required: true },
  maxClients: { type: Number, required: true },
  currentClients: { type: Number, required: true },
});
const serviceShiftSchema = new mongoose.Schema({
  day: { type: String, required: true },
  hours: { type: [serviceHourSchema], required: true },
});
const serviceAvailabilitySchema = new mongoose.Schema({
  city: { type: String, required: true },
  address: { type: String, required: true },
  shifts: { type: [serviceShiftSchema], required: true },
});

const serviceFaceToFaceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    poster: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    availabilities: { type: [serviceAvailabilitySchema], required: true },
    images: { type: Array, required: true },
    hourlyRate: { type: Number, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    opts: { type: Array, required: true },
    bookings: {
      type: [bookingSchema],
    },
  },
  {
    timestamps: true,
  }
);

const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);
const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);
const Pet = mongoose.model("Pet", petSchema);
const Score = mongoose.model("Score", scoreSchema);
const Order = mongoose.model("Order", orderSchema);
const Product = mongoose.model("Product", productSchema);
const ServiceHour = mongoose.model("ServiceHour", serviceHourSchema);
const ServiceShift = mongoose.model("ServiceShift", serviceShiftSchema);
const ServiceAvailability = mongoose.model(
  "ServiceAvailability",
  serviceAvailabilitySchema
);
const ServiceFaceToFace = mongoose.model(
  "ServiceFaceToFace",
  serviceFaceToFaceSchema
);
const Review = mongoose.model("Review", reviewSchema);

export default {
  User,
  Post,
  Pet,
  Score,
  Order,
  Product,
  Review,
  ProductCategory,
  ServiceHour,
  ServiceShift,
  ServiceAvailability,
  ServiceFaceToFace,
  connect,
};
