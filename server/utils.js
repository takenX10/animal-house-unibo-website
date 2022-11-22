import path from "path";
import { fileURLToPath } from 'url';
import AUTH from './authentication.js';
import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();


const SERVER_URL = "http://localhost:8000";
const CLIENT_URL = "http://localhost:3000";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function isAuth(req, res, next) {
  if (await AUTH.check_login(req)) {
    next();
  } else {
    res.header("location", `${SERVER_URL}/backoffice/login`);
    res.send();
  }
}

async function isAdmin(req, res, next) {
  const usr = await AUTH.get_user(req);
  if (usr?.isAdmin) {
    next();
  } else {
    res.json({ success: false, message: "you are not the admin" });
  }
}

export { isAuth, CLIENT_URL, __dirname, jsonParser, isAdmin };
