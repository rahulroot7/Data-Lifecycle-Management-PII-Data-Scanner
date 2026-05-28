const Finding = require("../models/Finding");

const stats = async (
  req,
  res
) => {

  try {

    // TOTAL FINDINGS
    const totalFindings =
      await Finding.countDocuments();

    // CONFIRMED
    const confirmed =
      await Finding.countDocuments({

        reviewStatus:
          "CONFIRMED",
      });

    // REJECTED
    const rejected =
      await Finding.countDocuments({

        reviewStatus:
          "REJECTED",
      });

    // PENDING
    const pending =
      await Finding.countDocuments({

        reviewStatus:
          "PENDING",
      });

    // GROUP BY PII TYPE
    const piiStats =
      await Finding.aggregate([

        {
          $group: {

            _id: "$piiType",

            count: {
              $sum: 1,
            },
          },
        },
      ]);

    return res.status(200).json({

      success: true,

      stats: {

        totalFindings,

        confirmed,

        rejected,

        pending,

        piiStats,
      },
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
  stats,
};