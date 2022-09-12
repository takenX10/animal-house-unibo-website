import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const DBNAME = "animalhouse";
const url = `mongodb://localhost:27017/${DBNAME}`;

async function connect(){
    await mongoose.connect(url);
    console.log("connected...");
    return mongoose;
}
const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    id:{
        type:Number,
        required:true
    },
    isPoster:{
        type:Boolean,
        required:true
    }
});

const postSchema = new Schema({
    author:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    id:{
        type:Number,
        required:true
    }
});

const petSchema = new Schema({
    petid:{
        type:Number,
        required:true
    },
    ownerid:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    race:{
        type:String,
        required:true
    },
    weight:{
        type:Number,
        required:false
    },
    age:{
        type:Number,
        required:false
    },
    likedBy:{
        type:Array,
        required:true
    },
    matchedBy:{
        type:Array,
        required:true
    }
});

const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);
const Pet = mongoose.model('Pet', petSchema);

export default {User, Post, Pet, connect};