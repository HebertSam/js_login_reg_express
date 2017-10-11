const mongoose = require("mongoose");
const User = mongoose.model("User");
const users = require("../controllers/users.js");

module.exports = function(app){
    app.get("/", users.index);
    app.post("/register", users.create);
    app.get("/success", users.show);
    app.post("/login", users.login);
    app.get("/logout", users.logout)
}