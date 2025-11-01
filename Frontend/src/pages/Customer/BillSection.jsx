import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addBillAPI } from "../../service/allAPI"; // ✅ Use our API wrapper
import jsPDF from "jspdf";
import "jspdf-autotable";

function BillSection() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedChairs, setSelectedChairs] = useState([]);
  const [billGenerated, setBillGenerated] = useState(false);

  // ✅ Load booking and cart data from sessionStorage
  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const total = sessionStorage.getItem("totalAmount") || 0;
    const bookingData = JSON.parse(sessionStorage.getItem("bookingData")) || {};

    setCart(storedCart);
    setTotalAmount(total);
    setSelectedTable({ tableNo: bookingData.tableNo });
    setSelectedChairs(bookingData.chairs || []);
  }, []);

  // ✅ Confirm & Save Bill to JSON Server
  const handleConfirmBill = async () => {
    try {
      const billData = {
        tableNo: selectedTable?.tableNo || "N/A",
        chairs: selectedChairs,
        items: cart,
        amount: totalAmount,
        date: new Date().toISOString().split("T")[0],
        status: "unpaid",
      };

      await addBillAPI(billData);
      setBillGenerated(true);

      // Clear local session data
      sessionStorage.removeItem("cart");
      sessionStorage.removeItem("totalAmount");
      sessionStorage.removeItem("bookingData");
    } catch (error) {
      console.error("Error saving bill:", error);
      alert("Failed to generate bill. Please try again!");
    }
  };

  // ✅ Download PDF Bill
  const handleDownloadBill = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Royal Feast - Customer Bill", 14, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Table: ${selectedTable?.tableNo || "N/A"}`, 14, 38);
    doc.text(
      `Chairs: ${selectedChairs.join(", ") || "N/A"}`,
      14,
      46
    );

    const tableData = cart.map((item) => [
      item.name,
      item.qty,
      `RS  ${item.price}`,
      `RS  ${item.price * item.qty}`,
    ]);

    doc.autoTable({
      head: [["Item", "Qty", "Price", "Total"]],
      body: tableData,
      startY: 55,
    });

    const finalY = doc.lastAutoTable.finalY || 75;
    doc.setFontSize(14);
    doc.text(`Grand Total: RS  ${totalAmount}`, 14, finalY + 10);

    doc.save(`Bill_${selectedTable?.tableNo || "Table"}_${Date.now()}.pdf`);
  };

  // ✅ Navigate back to menu
  const handleBackToMenu = () => {
    navigate("/customer/foodmenu");
  };

  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1551782450-a2132b4ba21d')] min-h-screen bg-cover bg-center p-6 pb-40">
      <div className="bg-white bg-opacity-95 rounded-2xl shadow-lg max-w-4xl mx-auto p-8 mt-10">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          BILLING
        </h1>

        {/* ✅ Table Info */}
        <div className="text-center mb-6">
          {selectedTable?.tableNo ? (
            <>
              <h2 className="text-xl font-semibold text-gray-700">
                Table:{" "}
                <span className="text-green-600">{selectedTable.tableNo}</span>
              </h2>
              {selectedChairs.length > 0 && (
                <p className="text-gray-600 mt-1">
                  Chairs: {selectedChairs.join(", ")}
                </p>
              )}
            </>
          ) : (
            <h2 className="text-red-600 text-lg">❌ No table selected!</h2>
          )}
        </div>

        {/* ✅ Bill Table */}
        {cart.length > 0 ? (
          <>
            <table className="min-w-full border border-gray-200 rounded-lg text-left bg-white shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b">Item</th>
                  <th className="p-3 border-b text-center">Qty</th>
                  <th className="p-3 border-b text-center">Price</th>
                  <th className="p-3 border-b text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3 text-center">{item.qty}</td>
                    <td className="p-3 text-center">₹{item.price}</td>
                    <td className="p-3 text-right font-semibold">
                      ₹{item.price * item.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ✅ Total & Buttons */}
            <div className="flex flex-wrap justify-between items-center mt-8 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Grand Total: ₹{totalAmount}
              </h2>

              <div className="flex gap-3">
                {!billGenerated ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleConfirmBill}
                  >
                    Confirm & Generate Bill
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleDownloadBill}
                    >
                      Download Bill (PDF)
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleBackToMenu}
                    >
                      Back to Menu
                    </Button>
                  </>
                )}
              </div>
            </div>

            {billGenerated && (
              <p className="text-green-600 text-center mt-4 font-semibold">
                ✅ Bill generated successfully!
              </p>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600 mt-6">
            No items found. Please add food items first.
          </p>
        )}
      </div>
    </div>
  );
}

export default BillSection;
