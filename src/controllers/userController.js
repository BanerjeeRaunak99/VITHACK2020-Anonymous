const User = require("../models/user")
const userController = {
    create: async (req, res, next) => {
        try {
            if (!req.body.username || !req.body.password || !req.body.email) {
                res.status(400).send("Invalid Data")
            }
            let user = new User(req.body);
            await user.save();
            res.status(201).json({ message: "User successfully created" });
        } catch (e) {
            next(e);
        }
    },

    login: async (req, res, next) => {
        try {
            let user = await User.findOne({
                username: req.body.username,
            });

            if (!(user || user.validPassword(req.body.password))) {
                res.status(404).send("Invalid Credentials")
            }
            
            res.status(200).json({
                id: user._id,
                
                username: user.username,
            });
        } catch (e) {
            next(e);
        }
    },

};

module.exports = userController