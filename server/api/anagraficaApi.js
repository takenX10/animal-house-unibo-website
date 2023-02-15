

import { isAdmin, isAuth, jsonParser } from '../utils.js';
import METHODS from '../methods.js';
import DATABASE from '../database.js';

let ENDPOINTS = [
  { endpoint: "/api/backoffice/get_all_users", method: METHODS.POST, opts: [jsonParser, isAuth, isAdmin], function: get_all_users },
]

async function get_all_users(req, res) {
  const usr = await DATABASE.User.find({});
  res.json({ users: usr });
}

export default { ENDPOINTS };
