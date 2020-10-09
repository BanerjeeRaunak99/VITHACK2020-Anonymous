const express = require("express");
const User = require("./models/user");
const userController = require("./controllers/userController")

const router = new express.Router();

router.post("/signup", userController.create);
router.post("/signin", userController.login);

module.exports = router;