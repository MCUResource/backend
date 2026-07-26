require("dotenv").config();
const mongoose = require("mongoose");

const dns = require("dns");

dns.setServers([
  "1.1.1.1",
  "1.0.0.1"
]);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB error:", err));

module.exports = mongoose;
