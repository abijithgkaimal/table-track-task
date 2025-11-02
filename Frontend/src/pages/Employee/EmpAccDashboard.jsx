import React, { useEffect, useState } from 'react'
import { deleteBillAPI, getAllBillsAPI } from '../../service/allAPI';
import { Button } from '@mui/material';
import { MdDelete } from "react-icons/md";

function EmpAccDashboard() {

  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);


  const fetchBills = async () => {
    try {
      const res = await getAllBillsAPI();
      if (res && res.data) {
        setBills(res.data);
        console.log(res);

      } else {
        console.error("No bills data received");
      }
    } catch (err) {
      console.error("Error fetching bills:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      try {
        await deleteBillAPI(id);
        setBills(bills.filter((bill) => bill.id !== id));
        alert("Bill deleted successfully!");
      } catch (err) {
        console.error("Error deleting bill:", err);
        alert("Failed to delete bill");
      }
    }
  };


  return (
    <>

      <div className="min-h-screen bg-gradient-to-b from-red-200 to-red-250 p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
            Account / Billing History
          </h1>
          

          {bills.length > 0 ? (
            <table className="w-full border border-gray-300 rounded-lg shadow-sm">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-center">Table</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{bill.date}</td>
                    <td className="p-3 text-center">{bill.tableNo}</td>
                    <td className="p-3 text-right font-semibold text-green-700">
                      ₹{bill.amount}
                    </td>
                    <td className="p-3 text-right text-red-500">
                      <button onClick={() => handleDelete(bill.id)}>
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600 mt-6">
              No bill records found.
            </p>
          )}

          <div className="text-center mt-8">
            <Button variant="contained" color="primary" onClick={fetchBills}>
              Refresh
            </Button>
          </div>
        </div>
      </div>


    </>
  )
}

export default EmpAccDashboard