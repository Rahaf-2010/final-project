import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
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



function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login"/>;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Home />} />
        <Route path="/sell-request" element={<ProtectedRoute><SellRequest/></ProtectedRoute>} />
        <Route path="/cars" element={<Cars/>} />
        <Route path="/cars/:id" element={<CarDetails/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        <Route path="/meine-anfragen" element={<ProtectedRoute><MeineAnfragen/></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>} />
        <Route path="/admin/cars" element={<ProtectedRoute><AdminCars/></ProtectedRoute>} />
        <Route path="/admin/sell-requests" element={<ProtectedRoute><AdminSellRequests/></ProtectedRoute>} /> 
        <Route path="/admin/reviews" element={<ProtectedRoute><AdminReviews/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
