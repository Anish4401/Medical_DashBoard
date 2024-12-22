const Sale = require("../models/Sale");
const Medicine = require("../models/Medicine");

// Record a new sale
 exports.recordSale = async (req, res) => {
  try {
    const { medicine_id, quantity, sale_date } = req.body;

    if (!medicine_id || !quantity || !sale_date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    
    const medicineExists = await Medicine.findById(medicine_id);
    if (!medicineExists) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    // Finding  if a sale entry for the same medicine exists on the given date
    const existingSale = await Sale.findOne({
      medicine_id: medicine_id,
      sale_date: sale_date,
    });

    if (existingSale) {
      //Updating the records
      existingSale.quantity += quantity;
      await existingSale.save();
      return res.status(200).json({
        message: "Sale updated successfully",
        data: existingSale,
      });
    } else {
    
      const newSale = new Sale({
        medicine_id: medicine_id,
        quantity: quantity,
        sale_date: sale_date,
      });

      await newSale.save();
      return res.status(201).json({
        message: "Sale recorded successfully",
        data: newSale,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error recording sale", error });
  }
};


exports.getMedicine = async (req, res) => {
  try {
    const discountPercentage = 20; 
    const cutoffDate = new Date("2025-01-31"); 

  
    const medicines = await Medicine.find({
      expiry_date: { $lte: cutoffDate }
    });

    if (!medicines.length) {
      return res.status(404).json({ message: "No medicines expiring on or before 31/01/2025" });
    }

    // Apply discount to the medicines
    const discountedMedicines = medicines.map(medicine => {
      const discountedPrice = medicine.cost - (medicine.cost * discountPercentage) / 100;
      return {
        ...medicine._doc, 
        discountedPrice
      };
    });

    // Respond with discounted medicines
    res.status(200).json(discountedMedicines);
    console.log(discountedMedicines);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Problem" });
  }
};

 

// Get daily sales
exports.getDailySales = async (req, res) => {
  try {
    const { date } = req.query;

    const sales = await Sale.find({ sale_date: new Date(date) }).populate(
      "medicine_id"
    );
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Error fetching daily sales", error });
  }
};

// Get monthly sales
exports.getMonthlySales = async (req, res) => {
  try {
    const { month } = req.query;

    const sales = await Sale.aggregate([
      {
        $match: {
          sale_date: {
            $gte: new Date(`${month}-01`),
            $lt: new Date(`${month}-31`),
          },
        },
      },
      {
        $lookup: {
          from: "medicines", // Name of the medicines collection
          localField: "medicine_id",
          foreignField: "_id",
          as: "medicineDetails",
        },
      },
      {
        $unwind: "$medicineDetails",
      },
      {
        $group: {
          _id: "$medicine_id",
          total_quantity: { $sum: "$quantity" },
          total_sales: {
            $sum: { $multiply: ["$quantity", "$medicineDetails.cost"] },
          },
        },
      },
    ]);

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Error fetching monthly sales", error });
  }
};

