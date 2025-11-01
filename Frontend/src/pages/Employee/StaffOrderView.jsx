import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { getAllBillsAPI, updateBillStatusAPI } from "../../service/allAPI";

function StaffOrderView() {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [oldOrders, setOldOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await getAllBillsAPI();
      const all = res.data;
      setCurrentOrders(all.filter((b) => b.status === "unpaid"));
      setOldOrders(all.filter((b) => b.status === "paid"));
    } catch (err) {
      console.error("Error fetching bills:", err);
    }
  };

  const markAsCompleted = async (id) => {
    await updateBillStatusAPI(id, { status: "paid" });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">📦 Orders Overview</h1>

      {/* Current Orders */}
      <h2 className="text-2xl mb-4 text-green-400">Current Orders</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {currentOrders.map((order) => (
          <Card key={order.id} className="bg-gray-800 shadow-lg">
            <CardContent>
              <Typography variant="h6">
                Table: {order.tableNo} | Chairs: {order.chairs.join(", ")}
              </Typography>
              <Typography variant="body2" className="text-gray-400 mt-2">
                Date: {order.date}
              </Typography>

              <div className="mt-4">
                <h3 className="font-semibold">Items:</h3>
                <ul className="list-disc ml-6">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.qty} = ₹{item.qty * item.price}
                    </li>
                  ))}
                </ul>
              </div>

              <Typography variant="h6" className="mt-3">
                Total: ₹{order.amount}
              </Typography>

              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                onClick={() => markAsCompleted(order.id)}
              >
                Mark as Completed
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Old Orders */}
      <h2 className="text-2xl mb-4 text-blue-400">Old Orders</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {oldOrders.map((order) => (
          <Card key={order.id} className="bg-gray-700 shadow-lg">
            <CardContent>
              <Typography variant="h6">
                Table: {order.tableNo} | Chairs: {order.chairs.join(", ")}
              </Typography>
              <Typography variant="body2" className="text-gray-300 mt-2">
                Date: {order.date}
              </Typography>

              <Typography variant="body2" className="mt-2">
                Status: ✅ Paid
              </Typography>

              <Typography variant="h6" className="mt-2">
                Total: ₹{order.amount}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StaffOrderView;