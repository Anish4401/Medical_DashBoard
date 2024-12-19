const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const medicieneRoutes = require("./routes/medicieneRoute");
const saleRoutes = require("./routes/saleRoute");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://anishku1686:Xp2Tgn1lr9iQbvyc@cluster0.w2pya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to Medical Store API");
});

app.use("/api/medicine", medicieneRoutes);
app.use("/api", saleRoutes);

module.exports = app;
