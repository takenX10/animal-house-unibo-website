import METHODS from "../methods.js";
import DATABASE from '../database.js';
import AUTH from "../authentication.js";
import { isAuth, isAdmin, jsonParser, CLIENT_URL } from "../utils.js";

let ENDPOINTS = [
    { endpoint: "/backoffice/get_posts", method: METHODS.POST, opts: [jsonParser], function: get_posts },
    { endpoint: "/backoffice/get_all_posts", method: METHODS.GET, opts: [jsonParser, isAdmin], function: get_all_posts },
    { endpoint: "/backoffice/get_answers", method: METHODS.POST, opts: [jsonParser], function: get_answers },
    { endpoint: "/backoffice/create_post", method: METHODS.POST, opts: [jsonParser, isAuth], function: create_post },   
    { endpoint: "/backoffice/delete_post", method: METHODS.DELETE, opts: [jsonParser, isAuth, isAdmin], function: delete_post },   
    { endpoint: "/backoffice/posts", method: METHODS.GET, opts: [jsonParser, isAuth, isAdmin], function: officePosts },
]

async function officePosts(req, res) {
    res.render("../templates/bacheca", { title: "Posts Api", clientUrl: CLIENT_URL });
  }

async function get_all_posts(req, res){
    try{
        const posts = await DATABASE.Post.find({});
        let postList = posts.map((p)=>{return {author:p.author, message:p.message, id:p.id, answer:p?.answerFrom ? p.answerFrom : false, type:p.type}});
        res.json({posts:postList});
    }catch(e){
        res.status(500).send();
    }
}

async function get_posts(req, res){
    try{
        const posts = await DATABASE.Post.find({answerFrom:undefined, type:req.body.type});
        let postList = posts.map((p)=>{return {author:p.author, message:p.message, id:p.id}});
        res.json({posts:postList});
    }catch(e){
        res.status(500).send();
    }
}

async function delete_post(req, res){
    try{
        if(!req?.body?.id){
            res.json({success:false, message:"missing body id"})
            return
        }
        console.log("boh");
        await DATABASE.Post.findByIdAndDelete(req.body.id);
        res.json({success:true});
    }catch(e){
        res.status(500).send();
    }
}

async function get_answers(req, res){
    try {
        const answers = await DATABASE.Post.find({answerFrom:req.body.id});
        let answerList = answers.map((a)=>{return {author:a.author, message:a.message, id:a.id}});
        res.json({answers:answerList});
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
}

async function create_post(req, res){
    try{
        let myres = {author:(await AUTH.get_user(req)).email, message:req.body.message, type:req.body.type};
        if(req.body.answerFrom){
            myres.answerFrom = req.body.answerFrom;
        }
        await DATABASE.Post.create(myres);
        res.json({success:true});
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
}

export default { ENDPOINTS }