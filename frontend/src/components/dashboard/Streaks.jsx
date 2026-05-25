function Streaks({
  calculateWorkoutStreak,
  calculateHydrationStreak
}) {

  return (

    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-orange-100 p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-orange-700">
          Workout Streak
        </h2>
        <p className="text-5xl mt-5 font-bold">
          🔥 {calculateWorkoutStreak()} Days
        </p>
      </div>

      <div className="bg-cyan-100 p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-cyan-700">
          Hydration Streak
        </h2>
        <p className="text-5xl mt-5 font-bold">
          💧 {calculateHydrationStreak()} Days
        </p>
      </div>
    </div>

  )
}

export default Streaks