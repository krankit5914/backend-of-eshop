const { Order } = require("../model/order");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let order = new Order({
    product: req.body.product,
    quantity: req.body.quantity,
  });
  order = await order.save();

  if (!order) return res.status(404).send("the order not been created!");
  res.send(order);
});

router.get(`/`, async (req, res) => {
  const orderList = await Order.find();

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      product: req.body.product,
      quantity: req.body.quantity,
    },
    { new: true }
  );
  if (!order) {
    return res.status(400).send("the user not been created!");
  }
  res.status(200).send(order);
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the product with the given ID exists in the database
    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "order not found" });
    }

    // If the product exists, delete it from the database
    await Order.findByIdAndRemove(id);

    res
      .status(204)
      .json({ success: true, message: "order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// get single item by id
router.get(`/:id`, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(500).json({ success: false, message: "user not found" });
  }
  res.status(200).send(order);
});

module.exports = router;
