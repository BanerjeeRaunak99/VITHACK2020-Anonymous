const mongoose  = require("mongoose")
const url = "mongodb://127.0.0.1:27017/Vithack2020-users";
mongoose
    .connect(url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(
        () => {
            console.log("connected to database");
        },
        (err) => {
            console.log(err);
        }
    );