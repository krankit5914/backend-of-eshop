const { Category } = require("../model/category");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

// get single item by id
router.get(`/:id`, async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  }
  res.status(200).send(category);
});

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) return res.status(404).send("the category not been created!");
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );
  if (!category) {
    return res.status(400).send("the category not been created!");
  }
  res.status(200).send(category);
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // Check if the product with the given ID exists in the database
    const category = await Category.findById(id);

    if (!category) {
      return res
        .status(500)
        .json({ success: false, message: "Product not found" });
    }

    // If the product exists, delete it from the database
    await Category.findByIdAndRemove(id);

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// router.delete("/:id", (req, res) => {
//   Category.findByIdAndRemove(req.params.id, (category) => {
//     if (category) {
//       return res
//         .status(200)
//         .json({ success: true, message: "Deleted Successfully" });
//     } else {
//       return res
//         .status(404)
//         .json({ success: false, message: `Category Not Found` });
//     }
//   }).catch((err) => {
//     return res.status(400).json({ success: false, error: err });
//   });
// });

module.exports = router;
