const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");
const medicieneController = require("../controllers/medicieneController");


router.post("/", medicieneController.addMedicine) 
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
