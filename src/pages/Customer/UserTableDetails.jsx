import React, { useEffect, useState } from "react";
import api from "../../service/api";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserTableDetails() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedChairs, setSelectedChairs] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch tables from API
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await api.get("?type=table");
        setTables(res.data);
      } catch (err) {
        console.error("Error fetching tables:", err);
      }
    };
    fetchTables();
  }, []);

  // ✅ Handle selecting a table
  const handleSelectTable = (table) => {
    setSelectedTable(table);
    setSelectedChairs([]); // reset chairs when switching tables
  };

  // ✅ Handle chair toggle
  const handleChairToggle = (chairNo) => {
    setSelectedChairs((prev) =>
      prev.includes(chairNo)
        ? prev.filter((c) => c !== chairNo)
        : [...prev, chairNo]
    );
  };

  // ✅ Handle Buy Now button
  const handleBuyNow = () => {
    if (!selectedTable) {
      alert("Please select a table first!");
      return;
    }

    if (selectedChairs.length === 0) {
      alert("Please select at least one chair!");
      return;
    }

    // Save selections in session storage
    sessionStorage.setItem("selectedTable", JSON.stringify(selectedTable));
    sessionStorage.setItem("selectedChairs", JSON.stringify(selectedChairs));

    navigate("/customer/bill"); // move to bill section
  };

  return (
    <div className="bg-[url('https://avatars.mds.yandex.net/i?id=d4fdefd68b9d779826812059b27786e2fb4c9067-5331568-images-thumbs&n=13s')] md:h-screen h-96 w-full bg-no-repeat bg-cover min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        TABLES AND CHAIRS
      </h1>

      {/* Table Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`rounded-xl p-5 border-2 transition cursor-pointer ${
              selectedTable?.id === table.id
                ? "border-blue-600 shadow-lg bg-white"
                : "border-gray-300 bg-white hover:border-blue-400"
            }`}
            onClick={() => handleSelectTable(table)}
          >
            <h2 className="text-xl font-semibold text-center mb-3 text-gray-700">
              Table {table.tableNo}
            </h2>

            <div className="flex flex-wrap justify-center gap-3">
              {table.chairs?.map((chair, index) => {
                const isSelected = selectedChairs.includes(chair.chairNo);
                return (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation(); // prevent selecting the table again
                      if (!chair.isBooked) handleChairToggle(chair.chairNo);
                    }}
                    className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition ${
                      chair.isBooked
                        ? "bg-red-400 text-white cursor-not-allowed"
                        : isSelected
                        ? "bg-green-500 text-white"
                        : "bg-green-200 hover:bg-green-300"
                    }`}
                  >
                    {chair.chairNo}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Buy Now Button */}
      <div className="flex justify-center mt-10">
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}

export default UserTableDetails;
