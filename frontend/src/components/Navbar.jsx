import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Navbar() {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (

    <nav className="bg-white shadow-md px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="logo"
            className="w-12 h-12 rounded-full"
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold text-center sm:text-left">
            Smart Health Tracker
          </h1>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-lg sm:text-2xl font-medium">

          <Link to="/">
            Dashboard
          </Link>

          <Link to="/add">
            Add Entry
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  )
}

export default Navbar