

const SERVER_URL = process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";
// import ip from 'ip'
// const SERVER_URL = "http://192.168.107.31:8000"
// let SERVER_URL = "http://localhost:8000"

export function isEqualPath(path, test) {
    if (test.includes(":")) {
        let subtest = test.replace(test.substring(test.lastIndexOf("/")), "")
        let subpath = path.replace(path.substring(path.lastIndexOf("/")), "")
        return subpath == subtest
    }
    return path == test
}

async function check_login() {
    let res = await fetch(`${SERVER_URL}/backoffice/is_logged_in`, { method: "POST", credentials:'include' });
    res = await res.json();
    return res.success;
}

async function get_my_id() {
    let res = await fetch(`${SERVER_URL}/backoffice/get_my_id`, { credentials:'include'});
    res = await res.json();
    return res.id;
}

function logout(ctxDispatch) {
    document.cookie="AUTHSESSION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    ctxDispatch({type:'USER_SIGNOUT'});
    console.log("logging out...");
}

async function deletePost(id){
    try{
        let res = await fetch(`${SERVER_URL}/backoffice/delete_post`, {
            method:"POST",
            credentials:"include",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:id})
        });
        res = await res.json();
        if(!res.success){
            alert("Can't delete post");
        }
    }catch(e){
        alert(e);
    }
}

async function isAdmin(){
    try{
        let res = await fetch(`${SERVER_URL}/backoffice/is_admin`, {method:"POST", credentials:"include"});
        res = await res.json();
        return res.success;
    }catch(e){
        alert(e);
        return false;
    }
    return false;
}

export { SERVER_URL, check_login, get_my_id, logout, deletePost, isAdmin };
