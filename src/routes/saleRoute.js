const express = require("express");
const router = express.Router();
const saleController = require("../controllers/SaleController");

router.post("/sales", saleController.recordSale);
router.get('/', saleController.getMedicine);
router.get("/sales/daily", saleController.getDailySales);
router.get("/sales/monthly", saleController.getMonthlySales);

module.exports = router;
