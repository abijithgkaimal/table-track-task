import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EmpStaffDashboard() {
  const navigate = useNavigate();

  // Reusable SweetAlert navigation handler
  const handleNavigate = (path, message) => {
    Swal.fire({
      icon: "info",
      title: message,
      text: "Redirecting...",
      showConfirmButton: false,
      timer: 1500,
      background: "#fffaf0",
    });
    setTimeout(() => navigate(path), 1500);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <h1 className="text-4xl font-bold text-white mb-10 drop-shadow-lg">
        👨‍🍳 Staff Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Order View Card */}
        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 max-w-sm transition-transform transform hover:scale-105 border border-amber-200">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-5xl">🧾</div>
            <h2 className="text-2xl font-semibold text-amber-700">
              Order View
            </h2>
            <p className="text-gray-600 text-center">
              Check new and pending customer orders in real time.
            </p>
            <button
              className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition-all duration-300"
              onClick={() =>
                handleNavigate("/employee/staff/orders", "Opening Order View")
              }
            >
              View Orders
            </button>
          </div>
        </div>

        {/* Food Manage Card */}
        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 max-w-sm transition-transform transform hover:scale-105 border border-amber-200">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-5xl">🍲</div>
            <h2 className="text-2xl font-semibold text-amber-700">
              Food Manage
            </h2>
            <p className="text-gray-600 text-center">
              Add, update, or remove food items and manage availability.
            </p>
            <button
              className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition-all duration-300"
              onClick={() =>
                handleNavigate(
                  "/employee/staff/manage",
                  "Opening Food Management"
                )
              }
            >
              Manage Food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpStaffDashboard;
