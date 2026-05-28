const dotenv = require("dotenv");
dotenv.config({
  path: "./.env.development",
});
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/config");
const authRoutes = require("./routes/auth");
const dataSourceRoutes = require("./routes/dataSource");
const scanRoutes = require("./routes/scan");
const findingRoutes = require("./routes/finding");
const dashboardRoutes = require("./routes/dashboard");
const catalogueRoutes = require("./routes/catalogue");
const lineageRoutes = require("./routes/lineage");
const historyRoutes = require("./routes/history");
const {errorHandler} = require("./middleware/errorMiddleware");
const logRoutes = require("./routes/log");
const scanDetailsRoutes = require("./routes/scanDetails");
const healthRoutes = require("./routes/health");
const statsRoutes = require("./routes/stats");
const exportRoutes = require("./routes/export");
const {startScheduler} = require("./jobs/scanScheduler");
const rateLimit = require("express-rate-limit");
const limiter =
rateLimit({

  windowMs:
    15 * 60 * 1000,

  max: 100,

  message:
    "Too many requests",
});
const app = express();
connectDB();
app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/datasource", dataSourceRoutes);
app.use("/api/scan", scanRoutes);
app.use("/api/finding", findingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/catalogue", catalogueRoutes);
app.use("/api/lineage", lineageRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/scan-details", scanDetailsRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/stats",  statsRoutes);
app.use("/api/export", exportRoutes);

app.use(errorHandler);
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,

  cors: {
    origin: "*",
  },
});
startScheduler();
global.io = io;
io.on("connection", (socket) => {
  console.log(
    "Socket Connected:",
    socket.id
  );

  socket.on(
    "join-room",
    (room) => {

      socket.join(room);
    }
  );

  socket.on("disconnect", () => {

    console.log("Disconnected");
  });
});

server.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );
});