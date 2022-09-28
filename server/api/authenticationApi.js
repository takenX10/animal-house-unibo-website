import AUTH from '../authentication.js';
import METHODS from "../methods.js";

const ENDPOINTS = [
    {
        endpoint: "/backoffice/get_my_id",
        method: METHODS.GET,
        function: get_my_id
    },
    {
        endpoint: "/backoffice/is_logged_in",
        method: METHODS.POST,
        function: loggedin
    },
];

async function loggedin(req, res) {
    res.json( (await AUTH.check_login(req)) ? { success: true } : { success: false });
}

async function get_my_id(req, res) {
    if (!(await AUTH.check_login(req))) {
        res.json({ success: false, error: "you are not logged in" });
        return
    }
    let usr = await AUTH.get_user(req);
    res.json({ success: true, id: usr.id });
}


export default { ENDPOINTS };