import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sell-request" elemnt={<ProtectedRoute>Sell Request</ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
