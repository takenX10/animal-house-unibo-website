const express = require('express')
const { exec } = require("child_process");
const fs = require('fs')
const app = express()
const port = 8000

app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/static/dist'));
app.use(express.static(__dirname + '/static/dist/assets'));

app.get('*', function (req, res, next) {
  //res.status(404).send('senti tu coso , non e\' che posso avere tutto eh! insomma un po\' di comprensione uffa!');
  //(__dirname + '/static/dist')
  if (isAPI(req.url)) return next();
  res.sendFile('index.html', { 'root': __dirname + '/static/dist' })
});

app.get('/', (req, res) => {
  //res.send('Hello World!')
  res.sendFile('index.html', { 'root': __dirname + '/static/dist' })
})

app.get('/api/bacheca', (req, res) => {
  res.send("ciao2")
})

app.get('/api/testConsole', (req, res) => {
  printDebug(`Debug test\n`);
  printError(`Error test\n`);
  printInfo(`Info test\n`);
  printWarning(`Warning test\n`);
  printCustom("Cstm", `Custom test\n`);
  res.redirect('/console');
})

app.get('/api/console', (req, res) => {

  var full = req.query.full;

  /*
  exec('ls /log/node-out-*', (error, stdout, stderr) => {
      if (error) {
          printDebug(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          printDebug(`stderr: ${stderr}`);
          return;
      }
      fileToRead = stdout.replace("\n", "");

  });
  */

  fileToRead = "/log/node-out-" + getCurrentDate() + ".log";
  fs.readFile(fileToRead, 'utf8', (err, data) => {
    if (err) {
      printError(err)
      res.send(err);
      return
    }

    data = data.replace(/m, "<br>").replace(/\[39m / gm, "<br>").replace(/\[33m/gm, "").replace(/\[32m/gm, "").replace(/\[31m/gm, "");
    data = data.replace(/\n/gm, "<br>");

    splitted = data.split("<br>")

    textToSend = ""

    lines = []
    for (var i = splitted.length - 1; i >= 0; i--) {
      if ((!splitted[i].includes("[nodemon]") || full != undefined) && splitted[i] != "") {
        textToSend += splitted[i] + "<br>"
        lines.push(splitted[i])
      }
    }

    res.send(generateConsolePage(lines));
  })
})

app.get('/api/cmd', (req, res) => {
  var cmd = req.query.cmd;
  //ls -la /usr/local/bin/exec-node.sh
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      printDebug(`error: ${error.message}`);
      res.send(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      printDebug(`stderr: ${stderr}`);
      res.send(`stderr: ${stderr}`);
      return;
    }
    printDebug(`stdout: ${stdout}`);
    res.send(`stdout: ${stdout}`);
  });
})


app.listen(port, () => {
  printDebug(`Example app listening on port ${port}`)
})

function isAPI(url) {
  return url.startsWith("/api/");
}

function getCurrentDate() {
  var date_ob = new Date();
  // adjust 0 before single digit date
  var day = ("0" + date_ob.getDate()).slice(-2);
  // current month
  var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  var year = date_ob.getFullYear();
  return year + "-" + month + "-" + day;
}

function getTime() {
  var date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  var date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  var year = date_ob.getFullYear();

  // current hours
  var hours = date_ob.getHours();

  // current minutes
  var minutes = date_ob.getMinutes();

  // current seconds
  var seconds = date_ob.getSeconds();

  // prints date & time in YYYY-MM-DD HH:MM:SS format
  return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

}

function generateConsolePage(lines) {
  var page = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Console Log</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
      <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body class="fw-bold text-light">
    `

  page += `<div class="container">
                <div class="row mt-4 mb-2 text-center">
                    <div class="col fw-bold fs-2 text-dark">
                        <h2>
                            CONSOLE DUMP
                        </h2>
                    </div>
                </div>
                        `



  for (var i = 0; i < lines.length; i++) {
    var color = "bg-dark"
    if (lines[i].includes("[ERROR]")) color = "bg-danger"
    else if (lines[i].includes("[WARNING]")) color = "bg-warning"
    else if (lines[i].includes("[DEBUG]")) color = "bg-secondary"
    else if (lines[i].includes("[INFO]")) color = "bg-info"
    else if (lines[i].match(/^\[.*?\]/gm) != undefined) color = "bg-primary"

    page += `<div class="row ">
                    <div class="col">
                        <div class="${color} p-3 mb-2">${lines[i]}</div>
                    </div>
                </div>`
  }
  page += `</div>`


  page += `</body></html>`
  return page;
}


function printCustom(code, str) {
  print(`[${code}] {${getTime()}}\t` + str);
}

function printError(str) {
  printCustom("ERROR", str);
}

function printWarning(str) {
  printCustom("WARNING", str);
}

function printDebug(str) {
  printCustom("DEBUG", str);
}

function printInfo(str) {
  printCustom("INFO", str);
}

function print(str) {
  console.log(str);
}