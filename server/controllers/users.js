const mongoose = require("mongoose");
const User = mongoose.model("User");


module.exports = {
    index: function(req, res){
        if("_id" in req.session){
            return res.redirect("/sucess");
        }
        res.render("index", {errors:req.session.error});
        req.session.destroy();
    },
    create: function(req, res){
        let body = req.body;
        console.log(body)
        let newUser = new User(body);
        if(newUser.comparePw(body.password, body.confirm_pw)){
            newUser.save(function(err){
            if(err){
                req.session.error = newUser.errors;
                return res.redirect("/");
            }
            console.log("users successfully created")
            req.session._id = newUser._id;
            return res.redirect("/success")
        })
        } else{
            let errors = {};
            errors.password_not_match = {message:"passwords did not match"};
            req.session.error = newUser.errors;
            return res.redirect("/")
        }
    },
    show: function(req, res){
        let {_id} = req.session
        User.findById({_id}, function(err, user){
            if(err){
                return console.log("could not find user")
            }
            res.render("sucess", {user:user});
        })
    },
    login: function(req, res){
        let {email} = req.body
        user = User.findOne({email}, function(err, user){
            if(err){
                console.log("error block")
                req.session.error = user.errors;
                return res.redirect("/")
            }
            user.validatePw2(req.body.password, function(err, answer){
                if(err){

                    return console.log(err)
                }else {
                    if (answer){
                    console.log("answer in controller", answer)
                    req.session._id = user._id;
                    return res.redirect("/success")
                    }else {
                        let errors = {};
                        errors.password_not_match = {message: "entered wrong password"}
                        req.session.error = errors;
                        res.redirect("/")
                    }
                }
            })
        })
    },
    logout: function(req, res){
        req.session.destroy();
        res.redirect("/")
    }
}