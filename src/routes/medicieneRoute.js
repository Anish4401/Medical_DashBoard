const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");
const medicieneController = require("../controllers/medicieneController");


router.post("/", medicieneController.addMedicine) 
router.get("/",medicieneController.getMedicine )

router.put("/:id", medicieneController.updateMedicine);
router.delete("/:id", medicieneController.deleteMedicine);

module.exports = router;
