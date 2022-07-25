// Author : Gianmaria Rovelli

const express = require('express')
const app = express()
const port = 8000

// const DB = require("./database.js");
// DB.init();
const GAMEAPI = require("./gameApi.js");
GAMEAPI.initAPI(app);
const BACKOFFICE = require("./backoffice.js");
BACKOFFICE.initBackoffice(app);
let backendRouter = [];

function generateBackendRouterWhitelist() {
    for (let i = 0; i < GAMEAPI.ENDPOINTS.length; i++) {
        // in case of routing like /api/scoreboard/:game
        let e = GAMEAPI.ENDPOINTS[i].endpoint.split(":")[0];
        backendRouter.push(e);
    }
}


app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/static/dist'));
app.use(express.static(__dirname + '/static/dist/assets'));



function isInRouter(path){
    for( let route of backendRouter){
        if(path.startsWith(route)) return true;
    }
    return false;
}

app.get('*', function (req, res, next) {
    if(isInRouter(req.url)) return next();
    res.sendFile('index.html', { 'root': __dirname + '/static/dist' })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    generateBackendRouterWhitelist();
})

