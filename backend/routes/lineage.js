const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const LineageController = require( "../controllers/lineageController");

router.get(
  "/map",
  protect,
  LineageController.map
);

module.exports = router;