const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

let UserSchema = new mongoose.Schema({
    email: {
        type:String,
        required:[true, "email is required"],
        minlength: 4,
        unique:true
    },
    first_name: {
        type:String,
        required:[true, "please enter your first name"],
        minlength: [2, "your name must be at least 2 charactors long"]
    },
    last_name: {
        type:String,
        required: [true, "please enter your last name"],
        minlength: [2, "your name must be at least 2 charactors"]
    },
    birthday: {
        type: Date,
        required:[true, "please enter you birthday"]
    },
    password:{
        type:String,
        required:[true, "please enter a password"],
        minlength:[4, "your password must be at least 4 charactors long"]
    }
})

UserSchema.pre("save", function(next){
    // let user = this;
    console.log("in model", this)
    bcrypt.hash(this.password, saltRounds, (err, hash) =>{
        if(err){
            return console.log("could not hash password");
        }
        console.log(hash)
        this.password = hash;
        next();
    })
})

UserSchema.methods.comparePw = function(pw, cpw){
    if (pw !== cpw){
        return true;
    }else {
        return false;
    }
}

UserSchema.methods.validatePw2 = function(pw, cb){
    let hash = this.password;
    bcrypt.compare(pw, hash, function(err, answer){
        if(err){
            return cb(err)
        }
        console.log(answer)
        return cb(null, answer)
    })
}

mongoose.model("User", UserSchema);
let User = mongoose.model("User");