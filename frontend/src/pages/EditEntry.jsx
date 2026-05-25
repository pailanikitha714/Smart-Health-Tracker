import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

function EditEntry() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    waterIntake: "",
    sleepHours: "",
    exerciseMinutes: "",
    mood: "",
    steps: ""
  })

  useEffect(() => {
    fetchEntry()
  }, [])

  const fetchEntry = async () => {
    
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(
        "https://smart-health-backend-ttae.onrender.com/api/health",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const selectedEntry = response.data.find(
        (item) => item._id === id
      )
      setFormData(selectedEntry)
    }

    catch (error) {
      console.log(error)
    }

  }

  const getSleepQuality = () => {
    const sleep = Number(formData.sleepHours)
    if (sleep >= 8) {
      return "🌟 Excellent Sleep"
    }
    else if (sleep >= 6) {
      return "😊 Good Sleep"
    }
    else if (sleep > 0) {
      return "😴 Poor Sleep"
    }
    return ""
  }

  const calculateGoals = () => {
    let goals = 0
    if (formData.waterIntake >= 3) goals++
    if (formData.sleepHours >= 8) goals++
    if (formData.exerciseMinutes >= 30) goals++
    return goals
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      await axios.put(
        `https://smart-health-backend-ttae.onrender.com/api/health/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      alert("Health Entry Updated Successfully ✅")
      navigate("/")
    }

    catch (error) {
      console.log(error)
    }

  }

  return (

    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex justify-center items-center p-6">
        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-10">
          <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-10">
            Edit Health Entry
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input
              type="number"
              name="waterIntake"
              min="0"
              max="20"
              value={formData.waterIntake}
              onChange={handleChange}
              placeholder="💧 Water Intake (L)"
              className="w-full p-5 rounded-2xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200 text-lg"
              required
              onWheel={(e) => e.target.blur()}
            />

            <input
              type="number"
              name="sleepHours"
              min="0"
              max="24"
              value={formData.sleepHours}
              onChange={handleChange}
              placeholder="😴 Sleep Hours"
              className="w-full p-5 rounded-2xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200 text-lg"
              required
              onWheel={(e) => e.target.blur()}
            />

            {formData.sleepHours && (

              <p className="text-blue-700 font-semibold ml-2">
                {getSleepQuality()}
              </p>

            )}

            <input
              type="number"
              name="exerciseMinutes"
              min="0"
              max="1440"
              value={formData.exerciseMinutes}
              onChange={handleChange}
              placeholder="💪 Exercise Minutes"
              className="w-full p-5 rounded-2xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200 text-lg"
              required
              onWheel={(e) => e.target.blur()}
            />

            <div>

              <select
                name="mood"
                value={formData.mood}
                onChange={handleChange}
                onWheel={(e) => e.target.blur()}
                className={`w-full p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-4 text-lg

                  ${formData.mood === "Happy"
                    ? "bg-green-50"

                    : formData.mood === "Sad"
                    ? "bg-red-50"

                    : formData.mood === "Stressed"
                    ? "bg-yellow-50"

                    : "bg-white"
                  }
                `}
              >

                <option value="">Select Mood</option>
                <option value="Happy">😊 Happy</option>
                <option value="Sad">😔 Sad</option>
                <option value="Tired">😴 Tired</option>
                <option value="Stressed">😓 Stressed</option>
                <option value="Excited">🤩 Excited</option>
                <option value="Calm">😌 Calm</option>
              </select>
            </div>
            <input
              type="number"
              name="steps"
              min="0"
              max="100000"
              value={formData.steps}
              onChange={handleChange}
              placeholder="👣 Steps"
              className="w-full p-5 rounded-2xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200 text-lg"
              required
              onWheel={(e) => e.target.blur()}
            />

            <div className="bg-blue-100 p-4 rounded-2xl text-center">
              <h2 className="text-xl font-bold text-blue-800">
                🎯 Daily Goal Progress
              </h2>
              <p className="text-2xl mt-2 font-extrabold">
                {calculateGoals()}/3 Goals Achieved
              </p>
            </div>
            <p className="text-center text-gray-600 font-medium">
              Keep improving your health daily 💙
            </p>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold text-xl transition duration-300"
            >
              Update Entry
            </button>
          </form>
        </div>
      </div>
    </>

  )
}

export default EditEntry