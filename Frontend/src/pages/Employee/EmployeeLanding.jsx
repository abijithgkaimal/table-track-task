import React from 'react';
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function EmployeeLanding() {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed p-6"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1550807014-1236e91b92d4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000')",
        }}
      >
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 5, padding: 10 }}>
          {/* Billing Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: 3,
                boxShadow: 5,
                backgroundColor: "#a97b56",
                color: "#584131ff",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom className="text-center">
                  Billing
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage customer bills, payments, and receipts efficiently.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, textTransform: "none", borderRadius: 2 }}
                  onClick={() => navigate("/employee/accounts/login")}
                >
                  Open Billing
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Staff Management Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: 3,
                boxShadow: 5,
                backgroundColor: "#a97b56",
                color: "#584131ff",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom className="text-center">
                  Staff Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage orders, cooking status, and kitchen updates easily.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2, textTransform: "none", borderRadius: 2 }}
                  onClick={() => navigate("/employee/staff/login")} // ✅ Connect to staff login
                >
                  Open Kitchen
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default EmployeeLanding;