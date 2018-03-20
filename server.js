var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var friends = require("./app/data/friends.js");

var app = express();
var PORT = process.env.PORT || 8080; 

app.use(express.static("app/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});
