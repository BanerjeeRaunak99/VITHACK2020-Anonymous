const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");

async function predictBP(inputData) {
    // const csvUrl = "file://DL Models/BP_Model/X_test.csv";
    // const csvData = tf.data.csv(csvUrl, {
    //     hasHeader: true,
    // });
    const model = await tf.loadLayersModel(
        "file://DL Models/BP_Model/model.json"
    );
    const test = tf.tensor1d(inputData);
    const output = await model.predict(test).array();
    return output;
}

async function predictECG(inputData) {
    const model = await tf.loadLayersModel(
        "file://DL Models/ecg_model/model.json"
    );
    const dataTest = tf.tensor3d(inputData.map(Number), [1, 7500, 1]);
    const output = await model.predict(dataTest).argMax(1).array();
    return output[0];
}

module.exports = {
    predictBP,
    predictECG,
};

// For testing BP
// predictBP([
// 1.1945259042033236,
// 1.2991202346041055,
// 0.6314760508308895,
// 2.378299120234604,
// 1.1759530791788857,
// 1.0625610948191593,
// 1.750733137829912,
// 1.41544477028348,
// 2.145650048875855,
// 1.0733137829912023,
// ]);
