

function initBackoffice(app){
    app.get("/backoffice/login", officeLogin);
}


function officeLogin(req, res){
    console.log("ciao");
    res.sendFile("./backoffice/login.htm", { root : __dirname });
}


module.exports = { initBackoffice };