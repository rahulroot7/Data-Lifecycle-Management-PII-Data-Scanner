const Finding = require("../models/Finding");

const list = async (
  req,
  res
) => {

  try {

    const query = {};

    // FILTER BY DATASOURCE
    if (
      req.query.sourceId
    ) {

      query.sourceId =
        req.query.sourceId;
    }

    // FILTER BY PII TYPE
    if (
      req.query.piiType
    ) {

      query.piiType =
        req.query.piiType;
    }

    // FILTER REVIEW STATUS
    if (
      req.query.reviewStatus
    ) {

      query.reviewStatus =
        req.query.reviewStatus;
    }

    const findings =
      await Finding.find(query)
      .populate("sourceId")
      .sort({
        createdAt: -1,
      });

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
};

module.exports = {
  list,
};