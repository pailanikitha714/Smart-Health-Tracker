function WeeklySummary({ weeklySummary }) {

  return (

    <div className="mt-10 bg-white p-8 rounded-3xl shadow-xl">
      
      <h2 className="text-3xl font-bold mb-8 text-indigo-700 text-center">
        📊 Weekly Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-indigo-100 p-6 rounded-2xl text-center">
          <h3 className="text-xl font-semibold text-indigo-700">
            😴 Avg Sleep
          </h3>
          <p className="text-4xl font-bold mt-4">
            {weeklySummary?.avgSleep} hrs
          </p>
        </div>

        <div className="bg-cyan-100 p-6 rounded-2xl text-center">
          <h3 className="text-xl font-semibold text-cyan-700">
            💧 Avg Water
          </h3>
          <p className="text-4xl font-bold mt-4">
            {weeklySummary?.avgWater} L
          </p>
        </div>

        <div className="bg-orange-100 p-6 rounded-2xl text-center">
          <h3 className="text-xl font-semibold text-orange-700">
            💪 Total Exercise
          </h3>
          <p className="text-4xl font-bold mt-4">
            {weeklySummary?.totalExercise} min
          </p>
        </div>

        <div className="bg-pink-100 p-6 rounded-2xl text-center">
          <h3 className="text-xl font-semibold text-pink-700">
            😊 Top Mood
          </h3>
          <p className="text-4xl font-bold mt-4">
            {weeklySummary?.topMood}
          </p>
        </div>
      </div>
    </div>

  )
}

export default WeeklySummary