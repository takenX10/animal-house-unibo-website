// Author : Gianmaria Rovelli

// const os = require("os");
import os from "os";
import multer from "multer";
const upload = multer({ dest: os.tmpdir() });
import express from "express";
const app = express();
const port = 8000;

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const DB = require("./database.js");
// DB.init();
import GAMEAPI from "./gameApi/gameApi.js";
GAMEAPI.initAPI(app);
// import BACKOFFICE from "./backoffice.js";
// BACKOFFICE.initBackoffice(app);
let backendRouter = [];

function generateBackendRouterWhitelist() {
  for (let i = 0; i < GAMEAPI.ENDPOINTS.length; i++) {
    // in case of routing like /api/scoreboard/:game
    let e = GAMEAPI.ENDPOINTS[i].endpoint.split(":")[0];
    backendRouter.push(e);
  }
}

app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/static/dist"));
app.use(express.static(__dirname + "/static/dist/assets"));

function isInRouter(path) {
  for (let route of backendRouter) {
    if (path.startsWith(route)) return true;
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
  console.log(`Example app listening on port ${port}`);
  generateBackendRouterWhitelist();
});
