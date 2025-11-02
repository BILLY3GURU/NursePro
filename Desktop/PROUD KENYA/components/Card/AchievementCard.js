export default function AchievementCard({ achievement }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{achievement.title}</h3>
          <p className="text-gray-600 text-sm">{achievement.category}</p>
        </div>
        <span
          className={`px-2 py-1 rounded text-xs ${
            achievement.status === "verified"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {achievement.status}
        </span>
      </div>
      <p className="text-gray-700 mb-4">{achievement.excerpt}</p>
      {achievement.thumbnail && (
        <img
          src={achievement.thumbnail}
          alt="Evidence"
          className="w-full h-32 object-cover rounded mb-4"
        />
      )}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          👍 {achievement.likes} | 👁️ {achievement.views}
        </span>
        <button className="text-primary hover:underline">Verify</button>
      </div>
    </div>
  );
}
