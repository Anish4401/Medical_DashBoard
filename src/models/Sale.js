const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  medicine_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sale_date: {
    type: Date,
    required: true,
  },
});

const Sale = mongoose.model("Sale", saleSchema);
module.exports = Sale;
