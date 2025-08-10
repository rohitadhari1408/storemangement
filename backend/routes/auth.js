const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updatePassword, getallProfile } = require("../controller/Authcontroller");
const auth = require("../middleware/Auth");
const { get } = require("mongoose");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update-password",auth, updatePassword);
router.get("/profile", getallProfile);

module.exports = router;