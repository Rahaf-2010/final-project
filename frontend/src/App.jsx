import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SellRequest from "./pages/SellRequest";

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
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Home />} />
        <Route path="/sell-request" element={<ProtectedRoute><SellRequest/></ProtectedRoute>} />
        
      </Routes>
    </BrowserRouter>
  );
}


export default App;
