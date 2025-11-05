import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserTableDetails() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedChairs, setSelectedChairs] = useState([]);
  const navigate = useNavigate();

  const API_URL = "https://table-track-task-2.onrender.com"; // ✅ JSON server endpoint

  // ✅ Fetch tables from JSON Server
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setTables(res.data);
      })
      .catch((err) => console.error("Error fetching tables:", err));
  }, []);

  // ✅ Select a Table
  const handleTableSelect = (table) => {
    if (selectedTable?.tableNo === table.tableNo) return;
    setSelectedTable(table);
    setSelectedChairs([]);
  };

  // ✅ Toggle chair selection (can select multiple)
  const handleChairToggle = (event, chairNo) => {
    event.stopPropagation();
    setSelectedChairs((prev) =>
      prev.includes(chairNo)
        ? prev.filter((c) => c !== chairNo)
        : [...prev, chairNo]
    );
  };

  // ✅ Proceed to Bill Page
  const handleProceed = () => {
    if (!selectedTable) {
      alert("Please select a table!");
      return;
    }

    if (selectedChairs.length === 0) {
      alert("Please select at least one chair!");
      return;
    }

    const bookingData = {
      tableNo: selectedTable.tableNo,
      chairs: selectedChairs,
    };

    // Save in session for Bill Section
    sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
    navigate("/customer/bill");
  };

  return (
    <div className="min-h-screen bg-[url('https://www.itl.cat/pngfile/big/99-996466_background-images-for-restaurants.jpg')] flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl z-10 font-bold mb-10 text-700 tracking-wide drop-shadow-lg">
        BOOK YOUR SEATS
      </h1>

      {/* ✅ Table Grid */}
      <div className="grid z-10 md:grid-cols-3 sm:grid-cols-2 gap-8 w-full max-w-6xl">
        {tables.map((table) => (
          <Card
            key={table.id}
            className={`transition-all duration-500 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl hover:shadow-blue-400/70 border ${
              selectedTable?.tableNo === table.tableNo
                ? "border-4 border-blue-400"
                : "border-gray-700"
            } cursor-pointer`}
            onClick={() => handleTableSelect(table)}
          >
            <CardContent className="p-6">
              <Typography
                variant="h6"
                className="text-center mb-2 font-semibold"
              >
                {table.tableNo}
              </Typography>
              <Typography
                variant="body2"
                className="text-center text-gray-400 mb-6 italic"
              >
                Status: {table.status}
              </Typography>

              {/* ✅ Chair List */}
              <div className="flex flex-col gap-2 items-start">
                {table.chairs.map((chair) => (
                  <FormControlLabel
                    key={chair.chairNo}
                    control={
                      <Checkbox
                        checked={selectedChairs.includes(chair.chairNo)}
                        onChange={(e) => handleChairToggle(e, chair.chairNo)}
                        disabled={chair.isBooked}
                        sx={{
                          color: chair.isBooked ? "#d61616ff" : "#17a323ff",
                          "&.Mui-checked": {
                            color: chair.isBooked ? "#d21818ff" : "#17a323ff",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        className={`transition-all ${
                          chair.isBooked
                            ? "text-red-500"
                            : "text-green-700"
                        }`}
                      >
                        {chair.chairNo}{" "}
                        {chair.isBooked ? "(Booked)" : "(Available)"}
                      </Typography>
                    }
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ✅ Proceed Button */}
      {selectedTable && (
        <div className="mt-12">
          <Button
            variant="contained"
            color="primary"
            onClick={handleProceed}
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "1rem",
              borderRadius: "0.75rem",
              textTransform: "none",
              background:
                "linear-gradient(90deg, #2563EB 0%, #3B82F6 50%, #60A5FA 100%)",
              boxShadow: "0px 4px 12px rgba(96,165,250,0.4)",
              "&:hover": {
                background:
                  "linear-gradient(90deg, #1D4ED8 0%, #2563EB 100%)",
              },
            }}
          >
            Proceed to Bill
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserTableDetails;
