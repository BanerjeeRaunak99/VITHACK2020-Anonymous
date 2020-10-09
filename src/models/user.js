const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema  = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        match: [/^[a-zA-Z0-9]+$/, "is invalid"],
        index: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/\S+@\S+\.\S+/, "is invalid"],
        index: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    salt: String,
    pressure:[{type:String}],
    temperature:[{type:String}],
    respiration:[{type:String}],
    pulse:[{type:String}],

},
{
    timestamps:true
})

UserSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        const hash = hashPassword(this.password);
        this.password = hash.password;
        
    }
    next();
});

UserSchema.methods.validPassword = async function (password) {
    const hash = bcrypt.hash(password,8)
    return this.password === hash;
};

function hashPassword(password) {
    
    return  bcrypt.hash(password,8)
}

const User = mongoose.model("User", UserSchema);
module.exports = User

