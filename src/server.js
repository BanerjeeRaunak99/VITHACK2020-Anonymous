const app = require("./App");
const port = process.env.PORT || 3768;

app.listen(port, async () => {
    console.log("Server is up on port " + port);
});

require("./dl");
