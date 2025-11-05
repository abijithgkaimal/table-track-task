import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserFoodMenu() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [addedItem, setAddedItem] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch foods from JSON Server
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("https://table-track-task-2.onrender.com");
        setMenu(res.data);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };
    fetchMenu();
  }, []);

  // ✅ Add item to cart
  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((f) => f.name === item.name);
      if (existing) {
        return prev.map((f) =>
          f.name === item.name ? { ...f, qty: f.qty + 1 } : f
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });

    setAddedItem(item.name);
    setTimeout(() => setAddedItem(null), 1200);
  };

  // ✅ Decrease quantity
  const handleDecreaseQty = (name) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0) // remove only if qty = 0
    );
  };

  // ✅ Remove entire item
  const handleRemove = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  // ✅ Calculate total
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ✅ Proceed to next page
  const handleProceed = () => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
    sessionStorage.setItem("totalAmount", totalAmount);
    navigate("/customer/tabledetails");
  };

  return (
    <div
      className="bg-[url('https://www.itl.cat/pngfile/big/99-996466_background-images-for-restaurants.jpg')]
      min-h-screen w-full bg-no-repeat bg-cover p-6 pb-48"
    >
      <h1 className="text-4xl font-bold text-center text-800 mb-10">
        MENU
      </h1>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {menu.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={item.image || "https://via.placeholder.com/300"}
              alt={item.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="text-gray-500 mt-1">₹{item.price}</p>

              {addedItem === item.name ? (
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                  disabled
                >
                  Added ✅
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border border-gray-200 rounded-lg">
                <thead>
                  <tr className="border-b bg-gray-100">
                    <th className="p-3">Item</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Total</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.name} className="border-b hover:bg-gray-50">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                            onClick={() => handleDecreaseQty(item.name)}
                          >
                            −
                          </button>
                          <span className="font-semibold">{item.qty}</span>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                            onClick={() => handleAddToCart(item)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-3">₹{item.price}</td>
                      <td className="p-3 font-semibold">
                        ₹{item.qty * item.price}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded transition"
                          onClick={() => handleRemove(item.name)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-6 flex-wrap gap-3">
              <h3 className="text-xl font-bold text-gray-700">
                Total: ₹{totalAmount}
              </h3>
              <Button
                variant="contained"
                color="success"
                onClick={handleProceed}
              >
                Proceed to Table Selection
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserFoodMenu;