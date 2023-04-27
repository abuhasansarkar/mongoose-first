const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Middleware
app.use(express.json());
app.use(cors());

// Database schema design

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true, // space removed
      unique: [true, "Name must be unique"],
      minLength: [4, "Name must be al least 4 characters."],
      maxLength: [100, "Name characters too larges."],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "liter", "pcs"],
        message: "Unit value can't be {VALUE}, must be kg/liter/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [100, "Quantity can't be negative."],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be an integer",
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stack", "out-of-stack", "discontinued"],
        message: "Status can't be {VALUE}.",
      },
    },

    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },

    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],

    // Date Schema
    // ===========
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // }
  },
  {
    timestamps: true,
  }
);

// Mongoose Pattern
// ==========
// Schema => Model => Query

const Product = mongoose.model("Product", productSchema)

// get route
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// post route
app.post("/api/v1/product", async (req, res, next) => {
  // Data insert in Database using two system 1. save or 2. create
  const product = new Product(req.body);
  

  product.save();


  console.log(req.body);
  res.send("It is working");
});

module.exports = app;
