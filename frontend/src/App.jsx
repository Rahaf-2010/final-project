import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SellRequest from "./pages/SellRequest";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import AboutUs from "./pages/AboutUs";
import MeineAnfragen from "./pages/MeineAnfragen";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCars from "./pages/AdminCars";
import AdminSellRequests from "./pages/AdminSellRequest";
import AdminReviews from "./pages/AdminReviews";
import "./App.css"
import Footer from "./components/Footer";


function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
}

function AppFooter() {
  const location = useLocation();

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) return null;
  return <Footer />;
}

function AppNavbar() {
  const location = useLocation();

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) return null;
  return <Navbar />;
}

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Home />} />
        <Route path="/sell-request" element={<SellRequest/>} />
        <Route path="/cars" element={<Cars/>} />
        <Route path="/cars/:id" element={<CarDetails/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        <Route path="/meine-anfragen" element={<MeineAnfragen/>} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard/></ProtectedRoute>} />
        <Route path="/admin/cars" element={<ProtectedRoute adminOnly><AdminCars/></ProtectedRoute>} />
        <Route path="/admin/sell-requests" element={<ProtectedRoute adminOnly><AdminSellRequests/></ProtectedRoute>} /> 
        <Route path="/admin/reviews" element={<ProtectedRoute adminOnly><AdminReviews/></ProtectedRoute>} />
      </Routes>
      <AppFooter />
    </BrowserRouter>
  );
}


export default App;
