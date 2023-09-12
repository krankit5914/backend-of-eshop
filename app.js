const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options("*", cors);

// midleware function
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Routers
const productRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const userRouter = require("./routers/users");
const orderRouter = require("./routers/orders");

const api = process.env.API_URL;

app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/orders`, orderRouter);

// Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Database connention is ready....");
  })
  .catch((err) => {
    console.log(err);
  });

// server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
