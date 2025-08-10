const express = require("express");
const router = express.Router();
const { submitRating ,getAllRatings ,updateRating} = require("../controller/RatingController");
const auth = require("../middleware/Auth");
const role = require("../middleware/Role");

router.post("/", auth , submitRating);
router.get("/",  getAllRatings);
router.put("/:id",  updateRating);

module.exports = router;