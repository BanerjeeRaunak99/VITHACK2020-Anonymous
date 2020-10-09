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
    pressure:[{
        val:String,
        time:String
    }],
    temperature:[{
        val:String,
        time:String
    }],
    respiration:[{
        val:String,
        time:String
    }],
    pulse:[{
        val:String,
        time:String
    }],

},
{
    timestamps:true
})

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8)
        
    }
    next();
});

UserSchema.methods.validPassword = async function (password) {
    
    const isMatch = await bcrypt.compare(password,this.password)
    
    return isMatch
};


const User = mongoose.model("User", UserSchema);
module.exports = User

