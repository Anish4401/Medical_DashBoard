const Sale = require("../models/Sale");
const Medicine = require("../models/Medicine");

// Record a new sale
exports.recordSale = async (req, res) => {
  try {
    const { medicine_id, quantity, sale_date } = req.body;

    const medicine = await Medicine.findById(medicine_id);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    const newSale = new Sale({
      medicine_id,
      quantity,
      sale_date,
    });

    await newSale.save();
    res
      .status(201)
      .json({ message: "Sale recorded successfully", data: newSale });
  } catch (error) {
    res.status(500).json({ message: "Error recording sale", error });
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
        $group: {
          _id: "$medicine_id",
          total_quantity: { $sum: "$quantity" },
          total_sales: {
            $sum: { $multiply: ["$quantity", "$medicine_id.cost"] },
          },
        },
      },
    ]);

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Error fetching monthly sales", error });
  }
};