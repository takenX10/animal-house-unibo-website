import DATABASE from './database.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = "idkman_something_not_real";

async function get_user(req) {
    if (!req?.cookies?.AUTHSESSION) {
        return null;
    }
    const decrypted_cookie = jwt.verify(req.cookies.AUTHSESSION, JWT_SECRET_KEY);
    return await DATABASE.User.findOne({ email: decrypted_cookie.email });
}

function generate_cookie(req) {
    return jwt.sign({ email: req.body.email, isAdmin: false }, JWT_SECRET_KEY);
}

// true -> correctly logged in, false otherwise
async function check_login(req) {
    let res = ((await get_user(req)) ? true : false)
    return res;
}

function set_cookie(res, token) {
    res.cookie('AUTHSESSION', token);
}

export default { check_login, generate_cookie, get_user, set_cookie };
