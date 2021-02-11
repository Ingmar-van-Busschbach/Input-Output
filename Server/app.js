const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/client/index.html");
});

http.listen(3000, function () {
    console.log("listening on *:3000");
});

io.on("connection", function (socket) {
    // als de speler connect vind een game waar ze nog 1 / 2 spelers nodig hebben!
    console.log("Client connected with id " + socket.id);

    socket.on("updatePoseNet", function (PoseNet, screenWidth, screenHeight) {
        console.log("Update poseNet")
        let json = JSON.stringify(PoseNet);
        json["screenWidth"] = screenWidth;
        json["screenHeight"] = screenHeight;

        fs.writeFile('public/json/poseNetData.json', json, function (err) {
            if (err) return console.log(err);
            console.log("Written to file");
        });

    });

    socket.on("setup", function (screenWidth, screenHeight) {
        let json = {};
        json.screenWidth = screenWidth;
        json.screenHeight = screenHeight;
        fs.writeFile('public/json/canvasWidthAndHeight.json', JSON.stringify(json), function (err) {
            if (err) return console.log(err);
            console.log("Written to file");
        });
    });
});

