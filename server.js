const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
dotenv.config();

connectDB();

const app = express();


app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/analytics", require("./routes/query1Routes.js"));

// Port
const PORT = process.env.PORT || 8080; 

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Server shutting down...');
  server.close();
  process.exit(0);
});
