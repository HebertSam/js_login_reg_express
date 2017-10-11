const express = require("express");
const app = express();
const session = require("express-session");
app.use(session({secret:"somestring"}));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const path = require("path");
app.set("views", path.resolve(__dirname, "./client/views"));
app.set("view engine", "ejs");

require("./server/config/mongoose.js");
const route_setter = require("./server/config/routes.js");
route_setter(app);



app.listen(8000, function(){
    console.log("listening on port 8000")
})