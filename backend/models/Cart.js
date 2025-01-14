const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [{ productId: String, quantity: Number }],
  totalPrice: Number,
  discount: Number,
});

module.exports = mongoose.model("Cart", cartSchema);
