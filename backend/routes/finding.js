const express = require("express");
const router = express.Router();
const {protect,} = require("../middleware/authMiddleware");
const FindingController = require("../controllers/findingController"); 
const Finding = require("../models/Finding");

// GET ALL FINDINGS
router.get(
  "/list",
  protect,
  async (req, res) => {
    try {

      const findings =
        await Finding.find()
        .populate("sourceId");

      return res.status(200).json({

        success: true,

        findings,
      });

    } catch (error) {

      return res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  }
);

router.patch("/review/:id", protect, FindingController.review);
router.delete("/:id",protect,FindingController.remove);
router.patch("/bulk-review", protect, FindingController.bulkReview);

module.exports = router;