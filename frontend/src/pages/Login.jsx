import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
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
    try {
      const response = await axios.post(
        "https://smart-health-backend-ttae.onrender.com/api/auth/login",
        formData
      )
      localStorage.setItem(
        "token",
        response.data.token
      )
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      )
      console.log(
        localStorage.getItem("token")
      )
      alert("Login Successful ✅")
      navigate("/")
    }

    catch (error) {
      alert(error.response.data.message)
    }

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl border border-gray-300"
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
            Login
          </button>

        </form>
        <p className="text-center mt-6">
          Don’t have an account?
          <Link
            to="/register"
            className="text-blue-600 font-bold ml-2"
          >
            Register
          </Link>
        </p>
      </div>
    </div>

  )
}

export default Login