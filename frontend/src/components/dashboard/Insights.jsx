function Insights({ generateInsights }) {

  return (

    <div className="mt-10 bg-white p-8 rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">
        Smart Insights
      </h2>
      <div className="space-y-4">
        {generateInsights().map((insight, index) => (
          <div
            key={index}
            className="bg-blue-100 text-blue-800 p-5 rounded-2xl"
          >
            {insight}
          </div>
        ))}
      </div>
    </div>

  )
}

export default Insights