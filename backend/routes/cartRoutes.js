const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();

//basic api
router.get('/', (req, res) => {
    res.send('API is running');
});


// Adding product to cart
router.post('/cart/add', async (req, res) => {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send("Product not found");

    let cart = await Cart.findOne();
    if (!cart) cart = new Cart({ products: [], totalPrice: 0, discount: 0 });

    cart.products.push({ productId, quantity });
    cart.totalPrice += product.price * quantity;
    cart.discount = calculateDiscount(cart.totalPrice);
    await cart.save();

    res.json(cart);
});

// Remove product from cart
router.post('/cart/remove', async (req, res) => {
    const { productId } = req.body;
    const cart = await Cart.findOne();
    if (!cart) return res.status(404).send("Cart not found");

    const productIndex = cart.products.findIndex(p => p.productId === productId);
    if (productIndex === -1) return res.status(404).send("Product not in cart");

    const product = await Product.findById(productId);
    cart.totalPrice -= product.price * cart.products[productIndex].quantity;
    cart.products.splice(productIndex, 1);
    cart.discount = calculateDiscount(cart.totalPrice);
    await cart.save();

    res.json(cart);
});

router.get('/cart', async (req, res) => {
    const cart = await Cart.findOne();
    res.json(cart);
});

router.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

function calculateDiscount(totalPrice) {
    if (totalPrice > 5000) return totalPrice * 0.2;
    if (totalPrice > 1000) return totalPrice * 0.1;
    return 0;
}

module.exports = router;
