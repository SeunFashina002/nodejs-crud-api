require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const products = require("./routes/product");
const cors = require("cors");

const app = express();

// environment variables
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const FRONTEND = process.env.FRONTEND;

var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200,
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/products", products);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log("Server is listening at port 5000");
    });
  })
  .catch((error) => console.log("Error: ", error));
