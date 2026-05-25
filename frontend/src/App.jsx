import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import AddEntry from "./pages/AddEntry"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/protectedRoute"
import EditEntry from "./pages/EditEntry"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/add"
          element={
            <ProtectedRoute>
              <AddEntry />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditEntry />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App