const app = require("./App")
const port = process.env.PORT || 3768;
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})