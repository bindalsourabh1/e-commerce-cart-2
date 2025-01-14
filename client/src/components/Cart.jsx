import axios from 'axios';

const Cart = ({ cart, fetchCart }) => {
  const removeFromCart = (productId) => {
    axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/cart/remove`, { productId })
      .then(() => {
        alert("Product removed from cart!");
        fetchCart();
      })
      .catch((err) => {
        console.error("Error removing from cart:", err);
      });
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-center mb-6">Your Cart</h2>
      {cart ? (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <div className="mb-6">
            <p className="text-lg font-medium">Total Price:
              <span className="font-bold text-blue-600"> ₹{cart.totalPrice}</span>
            </p>
            <p className="text-lg font-medium">Discount:
              <span className="font-bold text-green-600"> ₹{cart.discount}</span>
            </p>
          </div>
          <div className="space-y-4">
            {cart.products.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between border rounded-md p-4 shadow-sm hover:shadow-md"
              >
                <div>
                  <p className="text-lg font-semibold">Product ID: {product.productId}</p>
                  <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(product.productId)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading cart...</p>
      )}
    </div>
  );
};

export default Cart;
