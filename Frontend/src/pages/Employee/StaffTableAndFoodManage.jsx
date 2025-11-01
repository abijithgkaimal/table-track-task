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
    setFoods(fRes.data);
    setTables(tRes.data);
  };

  // ✅ Food CRUD
  const handleAddFood = async () => {
    if (!foodInput.name || !foodInput.price) return alert("Enter all fields");
    if (editFoodId) {
      await updateFoodAPI(editFoodId, foodInput);
      setEditFoodId(null);
    } else {
      await addFoodAPI(foodInput);
    }
    setFoodInput({ name: "", price: "", image: "" });
    fetchAllData();
  };

  const handleDeleteFood = async (id) => {
    await deleteFoodAPI(id);
    fetchAllData();
  };

  // ✅ Table CRUD
  const handleAddTable = async () => {
    if (!tableInput.tableNo || chairCount <= 0)
      return alert("Enter table number and chair count");

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
      setEditTableId(null);
    } else {
      await addTableAPI(newTable);
    }

    setTableInput({ tableNo: "", chairs: [] });
    setChairCount(0);
    fetchAllData();
  };

  const handleDeleteTable = async (id) => {
    await deleteTableAPI(id);
    fetchAllData();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">🛠️ Staff Control Panel</h1>

      {/* ================= Food Management ================= */}
      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-yellow-400">🍔 Food Management</h2>

        <div className="flex flex-wrap gap-4 mb-6">
          <TextField
            label="Food Name"
            value={foodInput.name}
            onChange={(e) => setFoodInput({ ...foodInput, name: e.target.value })}
          />
          <TextField
            label="Price"
            type="number"
            value={foodInput.price}
            onChange={(e) => setFoodInput({ ...foodInput, price: e.target.value })}
          />
          <TextField
            label="Image URL"
            value={foodInput.image}
            onChange={(e) => setFoodInput({ ...foodInput, image: e.target.value })}
          />
          <Button variant="contained" color="warning" onClick={handleAddFood}>
            {editFoodId ? "Update" : "Add"}
          </Button>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {foods.map((food) => (
            <Card key={food.id} className="bg-gray-800 shadow-lg">
              <CardContent>
                <h3 className="text-xl">{food.name}</h3>
                <p>₹{food.price}</p>
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
        <h2 className="text-2xl mb-4 text-green-400">🪑 Table Management</h2>

        <div className="flex flex-wrap gap-4 mb-6">
          <TextField
            label="Table Number"
            value={tableInput.tableNo}
            onChange={(e) =>
              setTableInput({ ...tableInput, tableNo: e.target.value })
            }
          />
          <TextField
            label="Chair Count"
            type="number"
            value={chairCount}
            onChange={(e) => setChairCount(Number(e.target.value))}
          />
          <Button variant="contained" color="success" onClick={handleAddTable}>
            {editTableId ? "Update" : "Add"}
          </Button>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {tables.map((table) => (
            <Card key={table.id} className="bg-gray-800 shadow-lg">
              <CardContent>
                <h3 className="text-xl">Table: {table.tableNo}</h3>
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
  );
}

export default StaffTableAndFoodManage;