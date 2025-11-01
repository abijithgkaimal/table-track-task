import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  addEmployeeAPI,
  getAllEmployeesAPI,
  deleteEmployeeAPI,
  updateEmployeeAPI,
} from "../../service/allAPI";

export default function AdminDetails() {
  const [employeeInput, setEmployeeInput] = useState({
    name: "",
    jobTitle: "",
    username: "",
    password: "",
  });
  const [employeeList, setEmployeeList] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch employee data
  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    try {
      const result = await getAllEmployeesAPI();
      if (result?.data) {
        setEmployeeList(result.data);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  // Add / Update Employee
  const handleSubmit = async () => {
    const { name, jobTitle, username, password } = employeeInput;
    if (!name || !jobTitle || !username || !password) {
      Swal.fire("Error", "Please fill all fields!", "error");
      return;
    }

    try {
      if (editId) {
        await updateEmployeeAPI(editId, employeeInput);
        Swal.fire("Success", "Employee updated successfully!", "success");
        setEditId(null);
      } else {
        await addEmployeeAPI(employeeInput);
        Swal.fire("Success", "Employee added successfully!", "success");
      }

      setEmployeeInput({ name: "", jobTitle: "", username: "", password: "" });
      fetchAllEmployees();
    } catch (err) {
      Swal.fire("Error", "Failed to save data", "error");
    }
  };

  // Delete Employee
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the employee.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await deleteEmployeeAPI(id);
          Swal.fire("Deleted!", "Employee removed.", "success");
          fetchAllEmployees();
        } catch (err) {
          Swal.fire("Error", "Failed to delete employee", "error");
        }
      }
    });
  };

  // Edit Employee
  const handleEdit = (emp) => {
    setEditId(emp.id);
    setEmployeeInput({
      name: emp.name,
      jobTitle: emp.jobTitle,
      username: emp.username,
      password: emp.password,
    });
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="max-w-5xl mx-auto bg-gray-900/80 backdrop-blur-md rounded-xl p-6 shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6">
          👨‍🍳 Employee Management
        </h2>

        {/* Form Section */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Employee Name"
            className="p-3 rounded-lg border border-gray-600 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={employeeInput.name}
            onChange={(e) =>
              setEmployeeInput({ ...employeeInput, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Job Title"
            className="p-3 rounded-lg border border-gray-600 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={employeeInput.jobTitle}
            onChange={(e) =>
              setEmployeeInput({ ...employeeInput, jobTitle: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-lg border border-gray-600 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={employeeInput.username}
            onChange={(e) =>
              setEmployeeInput({ ...employeeInput, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg border border-gray-600 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={employeeInput.password}
            onChange={(e) =>
              setEmployeeInput({ ...employeeInput, password: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition"
        >
          {editId ? "Update Employee" : "Add Employee"}
        </button>

        {/* Employee List */}
        <h3 className="text-2xl font-semibold mt-10 mb-4 text-center">
          Employee List
        </h3>
        {employeeList.length > 0 ? (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {employeeList.map((emp) => (
              <div
                key={emp.id}
                className="bg-gray-800 rounded-xl p-4 shadow-lg relative"
              >
                <button
                  onClick={() => handleDelete(emp.id)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-2 py-1 text-xs"
                >
                  ✕
                </button>
                <h4 className="text-lg font-bold mb-1">{emp.name}</h4>
                <p className="text-gray-300 text-sm mb-1">
                  <span className="font-semibold">Job:</span> {emp.jobTitle}
                </p>
                <p className="text-gray-300 text-sm mb-1">
                  <span className="font-semibold">Username:</span>{" "}
                  {emp.username}
                </p>
                <p className="text-gray-400 text-xs">
                  <span className="font-semibold">Password:</span>{" "}
                  {emp.password}
                </p>
                <button
                  onClick={() => handleEdit(emp)}
                  className="w-full mt-3 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-white transition"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-300 mt-4">
            No employees added yet.
          </p>
        )}
      </div>
    </div>
  );
}
