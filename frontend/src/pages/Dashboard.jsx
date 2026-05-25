import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"
import DashboardCards from "../components/dashboard/DashboardCards"
import WellnessStatus from "../components/dashboard/WellnessStatus"
import Insights from "../components/dashboard/Insights"
import HealthTips from "../components/dashboard/HealthTips"
import Streaks from "../components/dashboard/Streaks"
import WeeklySummary from "../components/dashboard/WeeklySummary"
import RecentActivity from "../components/dashboard/RecentActivity"
import HealthCharts from "../components/dashboard/HealthCharts"

function Dashboard() {

  const [latestEntry, setLatestEntry] = useState(null)
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(
        "https://smart-health-backend-ttae.onrender.com//api/health",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setEntries(response.data)
      if (response.data.length > 0) {
        setLatestEntry(response.data[0])
      }
      else {
        setLatestEntry(null)
      }
      setLoading(false)
    }

    catch (error) {
      console.log(error)
      setLoading(false)
    }

  }

  const calculateHealthScore = () => {
    if (!latestEntry) return 0
    let score = 0
    if (latestEntry.sleepHours >= 8) {
      score += 40
    }
    else if (latestEntry.sleepHours >= 6) {
      score += 25
    }
    if (latestEntry.waterIntake >= 3) {
      score += 30
    }
    else if (latestEntry.waterIntake >= 2) {
      score += 20
    }
    if (latestEntry.exerciseMinutes >= 45) {
      score += 30
    }
    else if (latestEntry.exerciseMinutes >= 20) {
      score += 20
    }
    return score
  }

  const getWellnessStatus = () => {
    const score = calculateHealthScore()
    if (score >= 80) {
      return "🌟 Excellent"
    }
    else if (score >= 60) {
      return "😊 Good"
    }
    else {
      return "😴 Needs Improvement"
    }
  }

  const generateInsights = () => {
    if (entries.length < 2) {
      return ["Add more entries to generate insights 😊"]
    }
    const insights = []
    const latest = entries[0]
    const previous = entries[1]
    if (latest.sleepHours > previous.sleepHours) {
      insights.push("Your sleep improved recently 😴")
    }
    if (latest.waterIntake < previous.waterIntake) {
      insights.push("Water intake dropped recently 💧")
    }
    if (latest.exerciseMinutes >= 30) {
      insights.push("Great job staying active 💪")
    }
    return insights
  }

  const generateHealthTips = () => {
    if (!latestEntry) return []
    const tips = []
    if (latestEntry.sleepHours < 6) {
      tips.push("😴 Try to get at least 7-8 hours of sleep")
    }
    if (latestEntry.waterIntake < 2) {
      tips.push("💧 Drink more water to stay hydrated")
    }
    if (latestEntry.exerciseMinutes < 30) {
      tips.push("🏃 Add some physical activity today")
    }
    if (tips.length === 0) {
      tips.push("🌟 Excellent lifestyle habits! Keep it up")
    }
    return tips
  }

  const calculateWorkoutStreak = () => {
    const uniqueDates = new Set()
    for (let entry of entries) {
      const date = new Date(entry.date)
        .toLocaleDateString()
      if (
        entry.exerciseMinutes >= 30 &&
        !uniqueDates.has(date)
      ) {
        uniqueDates.add(date)
      }
    }
    return uniqueDates.size
  }

  const calculateHydrationStreak = () => {
    const uniqueDates = new Set()
    for (let entry of entries) {
      const date = new Date(entry.date)
        .toLocaleDateString()
      if (
        entry.waterIntake >= 3 &&
        !uniqueDates.has(date)
      ) {
        uniqueDates.add(date)
      }
    }
    return uniqueDates.size
  }

  const getWeeklySummary = () => {
    if (entries.length === 0) return null
    const totalSleep = entries.reduce(
      (sum, entry) => sum + Number(entry.sleepHours || 0),
      0
    )
    const totalWater = entries.reduce(
      (sum, entry) => sum + Number(entry.waterIntake || 0),
      0
    )
    const totalExercise = entries.reduce(
      (sum, entry) => sum + Number(entry.exerciseMinutes || 0),
      0
    )
    return {

      avgSleep:
        (totalSleep / entries.length).toFixed(1),

      avgWater:
        (totalWater / entries.length).toFixed(1),

      totalExercise

    }
  }

  const weeklySummary = getWeeklySummary()

  const handleDelete = async (id) => {

    try {
      const token = localStorage.getItem("token")
      await axios.delete(
        `https://smart-health-backend-ttae.onrender.com//api/health/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      fetchEntries()
    }

    catch (error) {
      console.log(error)
    }

  }


  return (

    <div>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-10">
          <p className="mt-4 text-xl text-blue-700 font-semibold">
            Welcome back, {user?.name} 👋
          </p>
        </div>

        {loading ? (

          <div className="text-center mt-20">
            <h2 className="text-4xl font-bold text-gray-700">
              No Health Entries Yet
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              Start tracking your lifestyle today 🚀
            </p>  
          </div>

        ) : latestEntry ? (

          <>

            <DashboardCards
              latestEntry={latestEntry}
              calculateHealthScore={calculateHealthScore}
            />

            <WellnessStatus
              getWellnessStatus={getWellnessStatus}
            />

            <Insights
              generateInsights={generateInsights}
            />

            <HealthTips
              generateHealthTips={generateHealthTips}
            />

            <Streaks
              calculateWorkoutStreak={calculateWorkoutStreak}
              calculateHydrationStreak={calculateHydrationStreak}
            />

            <WeeklySummary
              weeklySummary={weeklySummary}
            />

            <HealthCharts entries={entries} />

            <RecentActivity
              entries={entries}
              handleDelete={handleDelete}
              navigate={navigate}
            />

          </>

        ) : (

          <div className="text-center text-3xl font-bold mt-20 text-gray-600">
            No health data found
          </div>

        )}

      </div>
    </div>

  )
}

export default Dashboard