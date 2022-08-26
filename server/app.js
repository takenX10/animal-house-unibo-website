// Author : Gianmaria Rovelli

import os from "os";
import multer from "multer";
import express from "express";
import path from "path";
import cors from "cors";
import METHODS from "./methods.js";
import { fileURLToPath } from "url";
const upload = multer({ dest: os.tmpdir() });
const app = express();
const port = 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/static/dist"));
app.use(express.static(__dirname + "/static/dist/assets"));

let backendRouter = [];

import GAMEAPI from "./gameApi/gameApi.js";
backendRouter.push(GAMEAPI.ENDPOINTS);
import BACKOFFICE from "./backoffice.js";
backendRouter.push(BACKOFFICE.ENDPOINTS);

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

function initAPI() {
  let cors_ = cors(corsOptions);
  for (let ENDPOINTS of backendRouter) {
    for (let i = 0; i < ENDPOINTS.length; i++) {
      let opts = [cors_];
      if (ENDPOINTS[i].opts) opts.push(ENDPOINTS[i].opts);
      let params = [ENDPOINTS[i].endpoint, opts, ENDPOINTS[i].function];
      if (ENDPOINTS[i].method == METHODS.GET) app.get(...params);
      else if (ENDPOINTS[i].method == METHODS.POST) app.post(...params);
    }
  }
}

function isInRouter(path) {
  for (let ENDPOINTS of backendRouter) {
    for(let route of ENDPOINTS){
      if (path.startsWith(route.endpoint.split(":")[0])) return true;
    }
  }
  return false;
}

app.post("/upload", upload.single("file"), function (req, res) {
  console.log("post");
  const file = req.file;
  console.log(file);
  res.json({});
});

app.get("*", function (req, res, next) {
  if (isInRouter(req.url)) return next();
  res.sendFile("index.html", { root: __dirname + "/static/dist" });
});

app.listen(port, () => {
  console.log(`Animalhouse Backend listening on port ${port}`);
  initAPI();
});
