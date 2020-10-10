const express = require("express");
const User = require("./models/user");
const userController = require("./controllers/userController");
const dlController = require("./controllers/dlController");

const router = new express.Router();

router.post("/signup", userController.create);
router.post("/signin", userController.login);
router.patch("/submitvitals", userController.submitVitals);
router.get("/records", userController.getRecords);
router.post("/predict", dlController.predict);

module.exports = router;
