function HealthTips({ generateHealthTips }) {

  return (

    <div className="mt-10 bg-white p-8 rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-green-700">
        🌿 Smart Health Tips
      </h2>
      <div className="space-y-4">
        {generateHealthTips().map((tip, index) => (
          <div
            key={index}
            className="bg-green-100 text-green-800 p-5 rounded-2xl"
          >
            {tip}
          </div>
        ))}
      </div>
    </div>

  )
}

export default HealthTips