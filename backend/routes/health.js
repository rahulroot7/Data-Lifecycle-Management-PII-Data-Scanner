const express =
require("express");

const router =
express.Router();

router.get(
  "/",
  async (req, res) => {

    return res.status(200).json({

      success: true,

      server:
        "Running",

      uptime:
        process.uptime(),

      timestamp:
        new Date(),
    });
  }
);

module.exports = router;