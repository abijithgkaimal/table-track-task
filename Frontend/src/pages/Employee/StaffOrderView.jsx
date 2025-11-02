import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllBillsAPI } from "../../service/allAPI";

function StaffOrderView() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // 🔹 Handle "Back" button
  const handleBack = () => {
    Swal.fire({
      icon: "info",
      title: "Returning to Dashboard",
      text: "Redirecting...",
      showConfirmButton: false,
      timer: 1200,
    });
    setTimeout(() => navigate("/employee/staff/dashboard"), 1200);
  };

  // 🔹 Fetch all bills (orders)
  const fetchOrders = async () => {
    try {
      Swal.fire({
        title: "Loading Orders...",
        text: "Please wait a moment",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = await getAllBillsAPI();

      if (response && response.data) {
        setOrders(response.data);
        Swal.close();
      } else {
        Swal.fire({
          icon: "warning",
          title: "No Orders Found",
          text: "There are no active orders right now.",
        });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Load Orders",
        text: "Please check your server connection (localhost:5001).",
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1565958011705-44e211f05dc0?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">
          🍽️ Staff Order View
        </h1>

        {orders.length > 0 ? (
          <table className="w-full border-collapse text-center shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-amber-600 text-white">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Table</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total (₹)</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white/60 hover:bg-amber-100 transition-all duration-200"
                >
                  <td className="py-2 px-4 font-semibold">{order.id}</td>
                  <td className="py-2 px-4">{order.tableNo || "N/A"}</td>
                  <td className="py-2 px-4">
                    {order.items
                      ? order.items.map((i) => `${i.name} ×${i.qty}`).join(", ")
                      : "No items"}
                  </td>
                  <td className="py-2 px-4 font-semibold">{order.amount || 0}</td>
                  <td
                    className={`py-2 px-4 font-semibold ${
                      order.status === "paid"
                        ? "text-green-700"
                        : order.status === "unpaid"
                        ? "text-red-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {order.status ? order.status.toUpperCase() : "UNKNOWN"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600 mt-6">
            No orders available right now.
          </p>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={handleBack}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all"
          >
            🔙 Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default StaffOrderView;
