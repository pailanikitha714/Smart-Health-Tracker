import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

function HealthCharts({ entries }) {

  const chartData = entries
    .slice(0, 7)
    .reverse()
    .map((entry) => ({
      date: new Date(entry.date)
        .toLocaleDateString("en-GB"),
      sleep: entry.sleepHours,
      water: entry.waterIntake,
      exercise: entry.exerciseMinutes
    }))

  return (

    <div className="mt-10 bg-white p-8 rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold mb-8 text-blue-700">
        📈 Health Analytics
      </h2>
      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            
            <Line
              type="monotone"
              dataKey="sleep"
              stroke="#8b5cf6"
              strokeWidth={3}
            />
            
            <Line
              type="monotone"
              dataKey="water"
              stroke="#06b6d4"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="exercise"
              stroke="#f97316"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

  )

}

export default HealthCharts