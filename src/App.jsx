import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import PageNotFound from "./pages/Landing/PageNotFound";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDetails from "./pages/Admin/AdminDetails";
import EmployeeLanding from "./pages/Employee/EmployeeLanding";
import EmployAccLogin from "./pages/Employee/EmployAccLogin";
import EmpAccDashboard from "./pages/Employee/EmpAccDashboard";
import EmpStaffLogin from "./pages/Employee/EmpStaffLogin";
import EmpStaffDashboard from "./pages/Employee/EmpStaffDashboard";
import StaffOrderView from "./pages/Employee/StaffOrderView";
import StaffTableAndFoodManage from "./pages/Employee/StaffTableAndFoodManage";
import UserFoodMenu from "./pages/Customer/UserFoodMenu";
import UserTableDetails from "./pages/Customer/UserTableDetails";
import BillSection from "./pages/Customer/BillSection";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/details" element={<AdminDetails />} />
        <Route path="/employee" element={<EmployeeLanding />} />
        <Route path="/employee/accounts/login" element={<EmployAccLogin />} />
        <Route path="/employee/accounts/dashboard" element={<EmpAccDashboard />} />
        <Route path="/employee/staff/login" element={<EmpStaffLogin />} />
        <Route path="/employee/staff/dashboard" element={<EmpStaffDashboard />} />
        <Route path="/employee/staff/orders" element={<StaffOrderView />} />
        <Route path="/employee/staff/manage" element={<StaffTableAndFoodManage />} />
        <Route path="/customer/foodmenu" element={<UserFoodMenu />} />
        <Route path="/customer/tabledetails" element={<UserTableDetails />} />
        <Route path="/customer/bill" element={<BillSection />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
