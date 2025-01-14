const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();

const app = express();
app.use(cors({
  origin: "*", // Allow all origins for now
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/", cartRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));