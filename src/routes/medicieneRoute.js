const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");
const medicieneController = require("../controllers/medicieneController");

// Add New Medicine
router.post("/", async (req, res) => {
  const { name, cost, expiry_date, discount, gst_applicable } = req.body;

  if (!name || !cost || !expiry_date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newMedicine = new Medicine({
      name,
      cost,
      expiry_date,
      discount,
      gst_applicable,
    });
    const savedMedicine = await newMedicine.save();
    res.status(201).json(savedMedicine);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//Get all the Listed Medicine
router.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json(medicines);
    console.log(medicines);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Problem" });
  }
});

router.put("/:id", medicieneController.updateMedicine);
router.delete("/:id", medicieneController.deleteMedicine);

module.exports = router;
