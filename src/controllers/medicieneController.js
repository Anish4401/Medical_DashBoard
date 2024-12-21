const Medicine = require("../models/Medicine");

// Add a new medicine
exports.addMedicine = async (req, res) => {
  try {
    const { name, cost, expiry_date, gst_applicable, discount } = req.body;
    const existingMedicine=await Medicine.findOne({name});
    if(existingMedicine){
      res.status(400).json({message:"Same medicine exist in this Update it",data:existingMedicine})
    }}
    const newMedicine = new Medicine({
      name,
      cost,
      expiry_date,
      gst_applicable,
      discount,
    });

    await newMedicine.save();
    res
      .status(201)
      .json({ message: "Medicine added successfully", data: newMedicine });
  } catch (error) {
    res.status(500).json({ message: "Error adding medicine", error });
  }
};

// Update an existing medicine
exports.updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cost, expiry_date, gst_applicable, discount } = req.body;
    let updatedCost = cost;
    if (gst_applicable) {
      updatedCost = cost + cost * 0.18; // Assuming 18% GST rate
    }

    // Apply discount
    if (discount > 0) {
      updatedCost = updatedCost - updatedCost * (discount / 100);
    }
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      id,
      { name, cost:updatedCost, expiry_date, gst_applicable, discount },
      { new: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res
      .status(200)
      .json({
        message: "Medicine updated successfully",
        data: updatedMedicine,
      });
  } catch (error) {
    res.status(500).json({ message: "Error updating medicine", error });
  }
};

// Delete a medicine
exports.deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const deletedMedicine = await Medicine.findByIdAndDelete(id);

    if (!deletedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting medicine", error });
  }
};
