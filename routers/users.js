const { User } = require("../model/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
    street: req.body.street,
    apartment: req.body.apartment,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
  });
  user = await user.save();

  if (!user) return res.status(404).send("the user not been created!");
  res.send(user);
});

router.get(`/`, async (req, res) => {
  const userList = await User.find();

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      passwordHash: req.body.passwordHash,
      street: req.body.street,
      apartment: req.body.apartment,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
    },
    { new: true }
  );
  if (!user) {
    return res.status(400).send("the user not been created!");
  }
  res.status(200).send(user);
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the product with the given ID exists in the database
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // If the product exists, delete it from the database
    await User.findByIdAndRemove(id);

    res
      .status(204)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// get single item by id
router.get(`/:id`, async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(500).json({ success: false, message: "user not found" });
  }
  res.status(200).send(user);
});

module.exports = router;
