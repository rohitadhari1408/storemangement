const express = require("express");
const router = express.Router();
const { addStore, getStores, getStoreRatings } = require("../controller/Store");
const auth = require("../middleware/Auth");
const role = require("../middleware/Role");

router.post("/",   addStore);
router.get("/", getStores);
router.get("/:id/ratings", auth, role("store_owner"), getStoreRatings);

module.exports = router;