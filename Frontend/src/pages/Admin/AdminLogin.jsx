import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const checkpass = (e) => {
    e.preventDefault();

    if (email === "Admin@gmail.com" && password === "asdf") {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome Admin!",
        confirmButtonColor: "#000",
      }).then(() => {
        navigate("/admin/details");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Login",
        text: "Incorrect email or password!",
        confirmButtonColor: "#a97b56",
      });
    }
  };

  return (
    <div  className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed p-6"  style={{    backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="bg-[#a97b56] rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">
          Admin Login
        </h2>
        <p className="text-center text-white/90 mb-6 text-sm">
          Sign in with your admin Gmail and password
        </p>

        <form onSubmit={checkpass} className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-white text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input id="email" type="text" placeholder="username" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="new-email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-1" htmlFor="password">
              Password
            </label>
            <input id="password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-600 focus:outline-none"
            />
          </div>

          <button type="submit" className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
