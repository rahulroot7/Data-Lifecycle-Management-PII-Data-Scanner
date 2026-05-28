const ActivityLog = require("../models/ActivityLog");

const logActivity =
async (

  userId,

  action,

  module,

  details
) => {

  try {

    await ActivityLog.create({

      userId,

      action,

      module,

      details,
    });

  } catch (error) {

    console.log(error);
  }
};

module.exports = {
  logActivity,
};