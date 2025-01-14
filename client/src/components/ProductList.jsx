import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ onProductAdded }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const addToCart = (productId) => {
    axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/cart/add`, {
      productId,
      quantity: 1,
    })
      .then(() => {
        alert("Product added to cart!");
        onProductAdded();
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
      });
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-center mb-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-lg p-6 text-center bg-white hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
              <p className="text-lg text-gray-700 mb-4">₹{product.price}</p>
              <button
                onClick={() => addToCart(product._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
