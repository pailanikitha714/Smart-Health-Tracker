import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()
    if (!formData.email.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address")
      return
    }

    try {
      const response = await axios.post(
        "https://smart-health-backend-ttae.onrender.com//api/auth/register",
        formData
      )
      alert(response.data.message)
      navigate("/login")
    }
    
    catch (error) {
      alert(error.response.data.message)
    }

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          Create Account
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl border border-gray-300"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl border border-gray-300"
            pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl border border-gray-300"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 font-bold ml-2"
          >
            Login
          </Link>
        </p>
      </div>
    </div>

  )
}

export default Register