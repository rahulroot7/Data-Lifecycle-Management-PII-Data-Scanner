const mongoose = require("mongoose");

const dataSourceSchema =
new mongoose.Schema({

  name: String,

  type: {
    type: String,
    enum: [
      "POSTGRES",
      "MONGODB",
    ],
  },

  host: String,

  port: Number,

  database: String,

  username: String,

  password: String,

  mongoUri: String,

  status: {
    type: String,
    default: "ACTIVE",
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "DataSource",
  dataSourceSchema
);