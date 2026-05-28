const express = require("express");
const router = express.Router();

const {protect,} = require("../middleware/authMiddleware");
const ScanController = require("../controllers/scanController");

router.post("/run/:id", protect, ScanController.run);

module.exports = router;