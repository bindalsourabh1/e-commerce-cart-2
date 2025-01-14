const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
});

const Product = mongoose.model("Product", productSchema);

// Sample E-Commerce Data
const products = [
  {
    name: "Product 1",
    price: 500,
    description: "Description of Product 1",
    category: "Category A",
  },
  {
    name: "Product 2",
    price: 1500,
    description: "Description of Product 2",
    category: "Category B",
  },
  {
    name: "Product 3",
    price: 3000,
    description: "Description of Product 3",
    category: "Category A",
  },
  {
    name: "Product 4",
    price: 7500,
    description: "Description of Product 4",
    category: "Category C",
  },
];

// Connect to MongoDB and Seed Data
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    return Product.insertMany(products);
  })
  .then(() => {
    console.log("Data seeded successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error seeding data:", err);
    mongoose.connection.close();
  });
