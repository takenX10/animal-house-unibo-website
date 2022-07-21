var mongoose = require('mongoose')
const DBNAME = "animalhouse";
const url = `mongodb://localhost:27017/${DBNAME}`;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isPoster:{
        type:Boolean,
        required:true
    }
});

const User = mongoose.model('User', userSchema);

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

const Post = mongoose.model('Post', postSchema);

const petSchema = new Schema({
    owner:{
        type:String,
        required:true
    },
    name:{
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
    }
});

const Pet = mongoose.model('Pet', petSchema);

async function init() {
    mongoose.connect(url).then(function(res) {
      console.log("connected...");      
    });
    const fakeusers = ["aldo", "giovanni", "giacomo"];
    let res = await User.find({});
    const currentUsersList = res.map((us)=>us.username);
    fakeusers.forEach((name)=>{
        if(currentUsersList.indexOf(name) < 0){
            console.log("adding fake user: ",name);
            const us = new User({username:name, password:"s3cr3t", isPoster:false});
            us.save();
        }
    });
}

module.exports = {init, User, Post, Pet};