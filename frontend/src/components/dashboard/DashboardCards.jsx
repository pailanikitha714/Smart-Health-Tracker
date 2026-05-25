function DashboardCards({
  latestEntry,
  calculateHealthScore
}) {

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-3xl shadow-xl p-6 text-center">
        <h2 className="text-xl font-semibold">
          💧 Water Intake
        </h2>
        <p className="text-3xl sm:text-4xl font-bold mt-4 text-cyan-600">
          {latestEntry.waterIntake} L
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6 text-center">
        <h2 className="text-xl font-semibold">
          😴 Sleep
        </h2>
        <p className="text-3xl sm:text-4xl font-bold mt-4 text-purple-600">
          {latestEntry.sleepHours} Hrs
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6 text-center">
        <h2 className="text-xl font-semibold">
          💪 Exercise
        </h2>
        <p className="text-3xl sm:text-4xl font-bold mt-4 text-orange-600">
          {latestEntry.exerciseMinutes} Min
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6 text-center">
        <h2 className="text-xl font-semibold">
          🏆 Health Score
        </h2>
        <p className="text-3xl sm:text-4xl font-bold mt-4 text-green-600">
          {calculateHealthScore()}/100
        </p>
      </div>

    </div>

  )
}

export default DashboardCards