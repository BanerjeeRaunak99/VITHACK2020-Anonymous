const tf = require("@tensorflow/tfjs-node");
const app = require("./App");
const port = process.env.PORT || 3768;
app.listen(port, () => {
    console.log("Server is up on port " + port);
});

const model = await tf.loadLayersModel("file://DL Models/BP_Model/model.json");
model.predict();
