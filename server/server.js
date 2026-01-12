require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// API routes (controllers handle DB)
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "../client/public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public", "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running on 0.0.0.0:${port}`);
});

