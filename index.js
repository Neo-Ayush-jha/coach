var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var router = require("./router/web");
var db = require("./config/db");

var connection = db("mongodb://localhost/coach2");

// var session = require("express-session")


var urlEncoded = bodyParser.urlencoded({express:false})

app.use(urlEncoded)
app.use("/",router)


app.set("view engine","pug")
app.set("views","./public/view");

app.listen(8081)