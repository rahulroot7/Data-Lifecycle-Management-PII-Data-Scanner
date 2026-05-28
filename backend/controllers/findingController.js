const Finding = require("../models/Finding");

// REVIEW FINDING
const review = async (
  req,
  res
) => {

  try {

    const finding =
      await Finding.findById(
        req.params.id
      );

    if (!finding) {

      return res.status(404).json({

        success: false,

        message:
          "Finding not found",
      });
    }

    // UPDATE REVIEW STATUS
    finding.reviewStatus =
      req.body.reviewStatus;

    // ADD NOTE
    finding.reviewNote =
      req.body.reviewNote;

    // OPTIONAL RECLASSIFY
    if (
      req.body.piiType
    ) {

      finding.piiType =
        req.body.piiType;
    }

    await finding.save();

    return res.status(200).json({

      success: true,

      message:
        "Finding reviewed successfully",

      finding,
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        error.message,
    });
  }
};

// GET FINDINGS WITH PAGINATION
const list = async (
  req,
  res
) => {

  try {

    // PAGE & LIMIT
    const page =
      parseInt(req.query.page)
      || 1;

    const limit =
      parseInt(req.query.limit)
      || 10;

    const skip =
      (page - 1) * limit;

    // FILTERS
    const query = {};
    // SEARCH FILTER
    if (
    req.query.search
    ) {

    query.$or = [

        {
        piiType: {
            $regex:
            req.query.search,

            $options: "i",
        },
        },

        {
        tableName: {
            $regex:
            req.query.search,

            $options: "i",
        },
        },

        {
        collectionName: {
            $regex:
            req.query.search,

            $options: "i",
        },
        },
    ];
    }

    if (
      req.query.reviewStatus
    ) {

      query.reviewStatus =
        req.query.reviewStatus;
    }

    if (
      req.query.piiType
    ) {

      query.piiType =
        req.query.piiType;
    }

    if (
      req.query.sourceId
    ) {

      query.sourceId =
        req.query.sourceId;
    }

    // TOTAL COUNT
    const total =
      await Finding.countDocuments(
        query
      );

    // FINDINGS
    const findings =
      await Finding.find(query)

      .populate("sourceId")

      .sort({
        createdAt: -1,
      })

      .skip(skip)

      .limit(limit);

    return res.status(200).json({

      success: true,

      page,

      limit,

      total,

      totalPages:
        Math.ceil(
          total / limit
        ),

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

const remove = async (
  req,
  res
) => {

  try {

    const finding =
      await Finding.findById(
        req.params.id
      );

    if (!finding) {

      return res.status(404).json({

        success: false,

        message:
          "Finding not found",
      });
    }

    await finding.deleteOne();

    return res.status(200).json({

      success: true,

      message:
        "Finding deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        error.message,
    });
  }
};

const bulkReview =
async (req, res) => {

  try {

    const {
      ids,
      reviewStatus,
    } = req.body;

    await Finding.updateMany(

      {
        _id: {
          $in: ids,
        },
      },

      {
        reviewStatus,
      }
    );

    return res.status(200).json({

      success: true,

      message:
        "Bulk review updated",
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
  review,
  list,
  remove,
  bulkReview,
};