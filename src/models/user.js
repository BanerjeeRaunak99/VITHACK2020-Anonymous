const mongoose = require('mongoose');
const crypto = require("crypto-js");

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
        this.salt = hash.salt;
    }
    next();
});

UserSchema.methods.validPassword = async function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 8, 128, "sha512")
        .toString("hex");
    return this.password === hash;
};

function hashPassword(password) {
    let salt = crypto.randomBytes(16).toString("hex");
    return {
        password: crypto
            .pbkdf2Sync(password, salt, 8, 128, "sha512")
            .toString("hex"),
        salt
    };
}

const User = model-("User", UserSchema);
export default User;

