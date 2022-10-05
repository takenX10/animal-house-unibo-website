// Author : Gianmaria Rovelli
// Author : Alessandro Frau

import fs from "fs";
import os from "os";
import DATABASE from './database.js';
import multer from "multer";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { __dirname, CLIENT_URL } from "./utils.js";
import METHODS from "./methods.js";

const upload = multer({ dest: os.tmpdir() });
const app = express();
const port = 8000;

app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/static/dist"));
app.use(express.static(__dirname + "/static/dist/assets"));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/template'))

var whitelist = ['http://localhost:3000', 'http://localhost:8000']
var corsOptionsDelegate = function(req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: req.header('Origin'), optionsSuccessStatus: 200, credentials: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate));

app.use((err, req, res, next) => {
  console.log('mistakes were made');
  res.status(500).send({ message: err.message });
});


const API_ENDPOINT_PATH = path.join(__dirname, "api")
let backendRouter = [];


async function importAPI(api_dir) {
  let dir = api_dir || API_ENDPOINT_PATH
  let files = fs.readdirSync(dir);
  for (let i = 0; i < files.length; i++) {
    try {
      let path = `${dir}/${files[i]}`
      let isDir = fs.lstatSync(path).isDirectory()
      if (isDir) {
        await importAPI(path);
        continue;
      }
      const c = await import(path);
      if (c.default.ENDPOINTS) {
        backendRouter.push(c.default.ENDPOINTS);
      }
    } catch (e) {
      console.error(e)
    }
  }
}

function wrapper(func) {
  return async (req, res, next) => {
    try {
      await func(req, res, next)
    } catch (e) {
      console.log("wajo no eh", e);
      res.status(500).send();
    }
  }
}
function initAPI() {
  for (let ENDPOINTS of backendRouter) {
    for (let i = 0; i < ENDPOINTS.length; i++) {
      let opts = [];
      if (ENDPOINTS[i].opts) {
        if (Array.isArray(ENDPOINTS[i].opts)) {
          opts.push(...ENDPOINTS[i].opts);
        } else {
          opts.push(ENDPOINTS[i].opts);
        }
      }
      let func = ENDPOINTS[i].function;
      if (func.constructor.name == 'AsyncFunction')
        func = wrapper(func)
      let params = [ENDPOINTS[i].endpoint, opts, func];
      if (ENDPOINTS[i].method == METHODS.GET) app.get(...params);
      else if (ENDPOINTS[i].method == METHODS.POST) app.post(...params);
    }
  }
}

function isInRouter(path) {
  for (let ENDPOINTS of backendRouter) {
    for (let route of ENDPOINTS) {
      if (path.startsWith(route.endpoint.split(":")[0])) return true;
    }
  }
  return false;
}

app.post("/upload", upload.single("file"), function(req, res) {
  console.log("post");
  const file = req.file;
  console.log(file);
  res.json({});
});

app.get("*", function(req, res, next) {
  if (isInRouter(req.url)) return next();
  res.sendFile("index.html", { root: __dirname + "/static/dist" });
});

app.listen(port, async () => {
  console.log(`Animalhouse Backend listening on port ${port}`);
  await DATABASE.connect();
  await importAPI()
  initAPI();
});
