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
            var check = await user.validPassword(req.body.password);
            console.log(check)

            if (!check) {
                res.status(404).send("Invalid Credentials")
            }
            else{
                res.status(200).json({
                    id: user._id,
                    
                    username: user.username,
                });

            }
            
            
        } catch (e) {
            next(e);
        }
    },

    submitVitals:async(req,res,next)=>{
        try{
            let user = await User.findOne({
                username: req.header('username'),
            });
            var check = await user.validPassword(req.header('password'));
            if (!check) {
                res.status(401).send("Not Authorized")
            }
            else{
                user.pressure = user.pressure.concat(req.body.pressure);
                user.temperature = user.temperature.concat(req.body.temperature)
                user.respiration = user.respiration.concat(req.body.respiration)
                user.pulse = user.pulse.concat(req.body.pulse)
                user.save()
                res.status(200).json({
                    status:"okay in submit vitals"
            })
        }
            

        }
        catch(e){
            next(e);
        }
    },
    getRecords:async(req,res,next)=>{
        try{
            let user = await User.findOne({
                username: req.header('username'),
            });
            var check = await user.validPassword(req.header('password'));
            if (!check) {
                res.status(401).send("Not Authorized")
            }
            else{
                res.status(200).json({
                    pressure:user.pressure,
                    temperature:user.temperature,
                    respiration:user.respiration.respiration,
                    pulse:user.pulse
                    

                })
            }

        } catch(e){
            next(e)
        }


    },

};

module.exports = userController