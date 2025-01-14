import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import axios from 'axios';

const App = () => {
  const [cart, setCart] = useState(null);

  const fetchCart = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/cart`)
      .then((response) => {
        setCart(response.data);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
      });
  };


  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center my-6">E-Commerce Cart System</h1>
      <ProductList onProductAdded={fetchCart} />
      <Cart cart={cart} fetchCart={fetchCart} />
    </div>
  );
};

export default App;
