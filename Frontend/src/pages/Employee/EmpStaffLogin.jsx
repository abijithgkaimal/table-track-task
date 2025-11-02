import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllEmployeesAPI } from "../../service/allAPI"; // ✅ fetch employee list

function EmpStaffLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch all employees when page loads
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await getAllEmployeesAPI();
      if (res?.data) setEmployeeList(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      Swal.fire("Error", "Failed to load employee data.", "error");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter both username and password!",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    // ✅ Check credentials against employee list
    const user = employeeList.find(
      (emp) =>
        emp.username === formData.username &&
        emp.password === formData.password
    );

    if (user) {
      Swal.fire({
        icon: "success",
        title: `Welcome, ${user.name}! 🎉`,
        text: `Logged in as ${user.jobTitle}`,
        showConfirmButton: false,
        timer: 1800,
        background: "#fffaf0",
      });
      setTimeout(() => navigate("/employee/staff/dashboard"), 1800);
    } else {
      Swal.fire({
        icon: "error",
        title: "Access Denied 🚫",
        text: "Invalid credentials or unauthorized access.",
        confirmButtonColor: "#d33",
      });
    }

    setIsLoading(false);
  };

  const handleBackToLanding = () => {
    navigate("/employee"); // ✅ Back to Employee Landing
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={handleBackToLanding}
          className="mb-4 flex items-center space-x-2 text-white hover:text-amber-200 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-medium">Back</span>
        </button>

        <div className="bg-white/85 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-amber-200/60">
          <div className="relative bg-gradient-to-r from-orange-500 to-amber-600 p-8 text-center overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2">
                STAFF LOGIN
              </h1>
              {/* <p className="text-amber-100 text-lg font-medium drop-shadow">
               
              </p> */}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                  placeholder="username"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-4 px-6 rounded-2xl font-bold shadow-lg hover:shadow-xl transform transition-all duration-300 focus:ring-4 focus:ring-amber-500/50 focus:ring-offset-2 ${
                isLoading
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:-translate-y-1"
              }`}
            >
              {isLoading ? "Checking Credentials..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmpStaffLogin;
