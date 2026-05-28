const cron = require("node-cron");
const DataSource = require("../models/DataSource");
const {scanPostgres} = require("../services/postgresScanner");
const {scanMongo} = require("../services/mongoScanner");

const startScheduler =
() => {

  // EVERY NIGHT 2 AM
  cron.schedule(
    "0 2 * * *",

    async () => {

      console.log(
        "Running auto scans..."
      );

      const sources =
        await DataSource.find();

      for (
        const source
        of sources
      ) {

        try {

          if (
            source.type ===
            "POSTGRES"
          ) {

            await scanPostgres(
              source
            );
          }

          if (
            source.type ===
            "MONGODB"
          ) {

            await scanMongo(
              source
            );
          }

        } catch (error) {

          console.log(error);
        }
      }
    }
  );
};

module.exports = {
  startScheduler,
};