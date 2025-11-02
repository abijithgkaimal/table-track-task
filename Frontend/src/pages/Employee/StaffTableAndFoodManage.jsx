import React, { useEffect, useState } from "react";
import {
  getAllFoodsAPI,
  addFoodAPI,
  updateFoodAPI,
  deleteFoodAPI,
  getAllTablesAPI,
  addTableAPI,
  updateTableAPI,
  deleteTableAPI,
} from "../../service/allAPI";
import { Button, TextField, Card, CardContent } from "@mui/material";
import Swal from "sweetalert2";

function StaffTableAndFoodManage() {
  // Foods
  const [foods, setFoods] = useState([]);
  const [foodInput, setFoodInput] = useState({ name: "", price: "", image: "" });
  const [editFoodId, setEditFoodId] = useState(null);

  // Tables
  const [tables, setTables] = useState([]);
  const [tableInput, setTableInput] = useState({ tableNo: "", chairs: [] });
  const [chairCount, setChairCount] = useState(0);
  const [editTableId, setEditTableId] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const fRes = await getAllFoodsAPI();
    const tRes = await getAllTablesAPI();
    setFoods(fRes.data || []);
    setTables(tRes.data || []);
  };

  // ✅ Food CRUD
  const handleAddFood = async () => {
    if (!foodInput.name || !foodInput.price) {
      Swal.fire("Missing Info", "Please enter all food details.", "warning");
      return;
    }

    if (editFoodId) {
      await updateFoodAPI(editFoodId, foodInput);
      Swal.fire("Updated", "Food item updated successfully!", "success");
      setEditFoodId(null);
    } else {
      await addFoodAPI(foodInput);
      Swal.fire("Added", "New food item added successfully!", "success");
    }

    setFoodInput({ name: "", price: "", image: "" });
    fetchAllData();
  };

  const handleDeleteFood = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Food?",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      await deleteFoodAPI(id);
      Swal.fire("Deleted!", "Food item has been removed.", "success");
      fetchAllData();
    }
  };

  // ✅ Table CRUD
  const handleAddTable = async () => {
    if (!tableInput.tableNo || chairCount <= 0) {
      Swal.fire("Missing Info", "Enter table number and chair count.", "warning");
      return;
    }

    const newTable = {
      tableNo: tableInput.tableNo,
      status: "available",
      chairs: Array.from({ length: chairCount }, (_, i) => ({
        chairNo: `C${i + 1}`,
        isBooked: false,
      })),
    };

    if (editTableId) {
      await updateTableAPI(editTableId, newTable);
      Swal.fire("Updated", "Table updated successfully!", "success");
      setEditTableId(null);
    } else {
      await addTableAPI(newTable);
      Swal.fire("Added", "New table added successfully!", "success");
    }

    setTableInput({ tableNo: "", chairs: [] });
    setChairCount(0);
    fetchAllData();
  };

  const handleDeleteTable = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Table?",
      text: "Are you sure you want to delete this table?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      await deleteTableAPI(id);
      Swal.fire("Deleted!", "Table has been removed.", "success");
      fetchAllData();
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-10"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/hd/food-4k-3gsi5u6kjma5zkj0.jpg')",
      }}
    >
      <div className="bg-black/70 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">
          CONTROL PANEL
        </h1>

        {/* ================= Food Management ================= */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4 text-orange-400">FOOD MANAGEMENT</h2>

          <div className="flex flex-wrap gap-4 mb-6">
            <TextField
              label="Food Name"
              variant="filled"
              sx={{ backgroundColor: "#fff5e1", borderRadius: "8px" }}
              value={foodInput.name}
              onChange={(e) =>
                setFoodInput({ ...foodInput, name: e.target.value })
              }
            />
            <TextField
              label="Price"
              type="number"
              variant="filled"
              sx={{ backgroundColor: "#fff5e1", borderRadius: "8px" }}
              value={foodInput.price}
              onChange={(e) =>
                setFoodInput({ ...foodInput, price: e.target.value })
              }
            />
            <TextField
              label="Image URL"
              variant="filled"
              sx={{ backgroundColor: "#fff5e1", borderRadius: "8px" }}
              value={foodInput.image}
              onChange={(e) =>
                setFoodInput({ ...foodInput, image: e.target.value })
              }
            />
            <Button variant="contained" color="warning" onClick={handleAddFood}>
              {editFoodId ? "Update" : "Add"}
            </Button>
          </div>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {foods.map((food) => (
              <Card key={food.id} className="bg-gray-800 shadow-lg text-white">
                <CardContent>
                  <h3 className="text-xl font-semibold">{food.name}</h3>
                  <p>₹{food.price}</p>
                  {food.image && (
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-32 object-cover rounded-lg my-2"
                    />
                  )}
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setFoodInput(food);
                        setEditFoodId(food.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteFood(food.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ================= Table Management ================= */}
        <section>
          <h2 className="text-2xl mb-4 text-green-400">TABLE MANAGEMENT</h2>

          <div className="flex flex-wrap gap-4 mb-6">
            <TextField
              label="Table Number"
              variant="filled"
              sx={{ backgroundColor: "#eaffea", borderRadius: "8px" }}
              value={tableInput.tableNo}
              onChange={(e) =>
                setTableInput({ ...tableInput, tableNo: e.target.value })
              }
            />
            <TextField
              label="Chair Count"
              type="number"
              variant="filled"
              sx={{ backgroundColor: "#eaffea", borderRadius: "8px" }}
              value={chairCount}
              onChange={(e) => setChairCount(Number(e.target.value))}
            />
            <Button variant="contained" color="success" onClick={handleAddTable}>
              {editTableId ? "Update" : "Add"}
            </Button>
          </div>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {tables.map((table) => (
              <Card key={table.id} className="bg-gray-800 shadow-lg text-white">
                <CardContent>
                  <h3 className="text-xl font-semibold">
                    Table: {table.tableNo}
                  </h3>
                  <p>Status: {table.status}</p>
                  <p>Chairs: {table.chairs.length}</p>
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setTableInput(table);
                        setChairCount(table.chairs.length);
                        setEditTableId(table.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteTable(table.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default StaffTableAndFoodManage;
