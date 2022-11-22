import METHODS from "../methods.js";
import DATABASE from '../database.js';
import AUTH from '../authentication.js';
import { isAuth, jsonParser, isAdmin } from '../utils.js';

const validLeaderboards = ["wordle", "slider", "memory", "hangman"];


let ENDPOINTS = [
  { endpoint: "/backoffice/get_leaderboard", method: METHODS.POST, opts: [jsonParser], function: leaderboardGetter },
  { endpoint: "/backoffice/insert_leaderboard", method: METHODS.POST, opts: [jsonParser, isAuth], function: leaderboardInsert },
  { endpoint: "/backoffice/get_valid_leaderboards", method: METHODS.POST, function: validLeaderboardsGetter },
  { endpoint: "/backoffice/remove_leaderboard", method: METHODS.POST, opts: [jsonParser, isAuth, isAdmin], function: leaderboardRemove },
];


async function leaderboardRemove(req, res) {
  if (!req?.body?.id) {
    res.json({ success: false, message: "missing parameters" });
  }
  await DATABASE.Score.findByIdAndRemove(req.body.id);
  res.json({ success: true });
}

async function leaderboardGetter(req, res) {
  if (!req?.body?.leaderboard) {
    res.json({ success: false, message: "missing leaderboard" });
    return;
  }
  const scores = await DATABASE.Score.find({ leaderboard: req.body.leaderboard });
  let final = scores.sort((a, b) => {return a.score == b.score? a.date > b.date: a.score > b.score});
  let p = 0;
  final = final.map((f) => { p++; return { author: f.author, score: f.score, position: p, id: f.id, date: f.date } })
  res.json({ success: true, name: req.body.leaderboard, leaderboard: final });
  return;
}

async function leaderboardInsert(req, res) {
  console.log("insert...");
  if (!req?.body?.leaderboard || !req?.body?.score) {
    res.json({ success: false, message: "missing some parameters" });
    return;
  }
  if (!validLeaderboards.includes(req.body.leaderboard)) {
    res.json({ success: false, message: "unknown leaderboard" });
    return;
  }
  let lead = req.body.leaderboard;
  let score = req.body.score;
  const user = await AUTH.get_user(req);
  console.log(user);
  const name = `${user.name} ${user.surname} (${user.email})`;
  await DATABASE.Score.create({
    leaderboard: lead,
    author: name,
    authorId: user.id,
    date: (new Date()).toISOString(),
    score: score,
  });
  res.json({ success: true });
}

function validLeaderboardsGetter(req, res) {
  res.json({ success: true, valids: validLeaderboards });
}
export default { ENDPOINTS };
