function WellnessStatus({ getWellnessStatus }) {

  return (

    <div className="mt-6 bg-white rounded-3xl shadow-xl p-6 text-center">
      <h2 className="text-xl font-semibold">
        ❤️ Wellness Status
      </h2>
      <p className="text-2xl md:text-3xl mt-6 font-bold text-blue-700">
        {getWellnessStatus()}
      </p>
    </div>

  )
}

export default WellnessStatus