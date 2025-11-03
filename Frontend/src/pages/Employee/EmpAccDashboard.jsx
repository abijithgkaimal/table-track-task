import React, { useEffect, useState } from 'react'
import { deleteBillAPI, getAllBillsAPI } from '../../service/allAPI';
import { Box, Button, Modal, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography,TableBody } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh',
  overflowY: 'auto',
};
import { MdDelete } from "react-icons/md";

function EmpAccDashboard() {

  const [bills, setBills] = useState([]);
   const [selectedBill, setSelectedBill] = useState(null);
   const [open, setOpen] = useState(false);

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
  const handleOpen = (bill) => {
    setSelectedBill(bill);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBill(null);
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
                      <td className="p-3 text-right">
                      <Button variant="contained" color="primary"  onClick={() => handleOpen(bill)}>
                      View Details
                      </Button>
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


       <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {selectedBill && (
            <>
              <Typography variant="h6" gutterBottom>
                Order Details (ID: {selectedBill.orderId})
              </Typography>
              <Typography>Table No: {selectedBill.tableNo}</Typography>
              <Typography>Chairs: {selectedBill.chairs?.join(', ')}</Typography>
              <Typography>Date: {selectedBill.date}</Typography>
              <Typography>Status: {selectedBill.status}</Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Items:
              </Typography>

              <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Qty</TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedBill.items?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }}
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.qty}</TableCell>
                        <TableCell>₹{item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant="h6" align="right" sx={{ mt: 2 }}>
                Total Amount: ₹{selectedBill.amount}
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
                sx={{ mt: 2 }}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>


    </>
  )
}

export default EmpAccDashboard