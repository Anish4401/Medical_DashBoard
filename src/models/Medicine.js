const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  expiry_date: {
    type: Date,
    required: true,
  },
  gst_applicable: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    default: 0,
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);
module.exports = Medicine;
