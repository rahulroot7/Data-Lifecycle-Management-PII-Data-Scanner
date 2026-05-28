const ScanRun = require("../models/ScanRun");
const Finding = require("../models/Finding");

const details = async (
  req,
  res
) => {

  try {

    const scan =
      await ScanRun.findById(
        req.params.id
      )
      .populate("sourceId");

    if (!scan) {

      return res.status(404).json({

        success: false,

        message:
          "Scan not found",
      });
    }

    const findings =
      await Finding.find({

        scanRunId:
          scan._id,
      });

    return res.status(200).json({

      success: true,

      scan,

      findings,
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        error.message,
    });
  }
};

module.exports = {
  details,
};