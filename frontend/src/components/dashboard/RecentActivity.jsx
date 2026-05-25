function RecentActivity({
  entries,
  handleDelete,
  navigate
}) {

  return (

    <div className="mt-10 bg-white p-8 rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">
        📋 Recent Activity
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-center text-lg">
              <th className="p-4">Date</th>
              <th className="p-4">Sleep</th>
              <th className="p-4">Water</th>
              <th className="p-4">Exercise</th>
              <th className="p-4">Mood</th>
              <th className="p-4">Delete</th>
              <th className="p-4">Edit</th>
            </tr>
          </thead>
          <tbody>
            {entries.slice(0, 5).map((entry, index) => (
              <tr
                key={index}
                className="border-b text-center hover:bg-blue-50 transition"
              >
                
                <td className="p-4">
                  {new Date(entry.date).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {entry.sleepHours} hrs
                </td>

                <td className="p-4">
                  {entry.waterIntake} L
                </td>

                <td className="p-4">
                  {entry.exerciseMinutes} min
                </td>

                <td className="p-4">
                  {entry.mood}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleDelete(entry._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    Delete
                  </button>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => navigate(`/edit/${entry._id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    Edit
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default RecentActivity