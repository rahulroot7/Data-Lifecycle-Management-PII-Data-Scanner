const mongoose = require("mongoose");

const scanRunSchema =
new mongoose.Schema({

  sourceId: {
    type:
      mongoose.Schema.Types.ObjectId,

    ref: "DataSource",
  },

  status: {
    type: String,

    enum: [
      "RUNNING",
      "COMPLETED",
      "FAILED",
    ],

    default: "RUNNING",
  },

  startedAt: {
    type: Date,

    default: Date.now,
  },

  completedAt: Date,

  totalFindings: {
    type: Number,

    default: 0,
  },

  logs: [String],

  errorMessage: String,

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "ScanRun",
  scanRunSchema
);