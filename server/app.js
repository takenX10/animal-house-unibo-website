const express = require('express')
const app = express()
const port = 8000

const DB = require("./database.js");
DB.init();
const APIJS = require("./gameApi.js");
APIJS.initAPI(app);
const BACKOFFICE = require("./backoffice.js");
BACKOFFICE.initBackoffice(app);
const backendRouter = [
    "/api/dogimage",
    "/api/catimage", 
    "/api/randomfact", 
    "/api/randomanimal", 
    "/api/catfact", 
    "/api/randomimagebase64"
];


app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/static/dist'));
app.use(express.static(__dirname + '/static/dist/assets'));

function isInRouter(path){
    for( let route of backendRouter){
        if(route == path) return true;
    }
    return false;
}

app.get('*', function (req, res, next) {
    if(isInRouter(req.url)) return next();
    res.sendFile('index.html', { 'root': __dirname + '/static/dist' })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

