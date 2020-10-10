const { mod } = require("@tensorflow/tfjs-node");
const { predictBP, predictECG } = require("../dl");

module.exports = {
    predict: async function (req, res, next) {
        try {
            const predictions = [];

            if (req.body.bpData) {
                const output = await predictBP(req.body.bpData);
                predictions.push({ bpData: output });
            }
            if (req.body.ecgData) {
                const output = await predictECG(req.body.ecgData);
                predictions.push({ ecgData: output });
            }

            if (predictions.length === 0) {
                throw new Error("No predictions to show");
            }
            res.status(200).json({ success: true, predictions });
        } catch (e) {
            return res.status(500).json({ success: false, message: e.message });
        }
    },
};
