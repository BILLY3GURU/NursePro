export default function AchievementsFeed() {
  const achievements = [
    {
      id: 1,
      title: "New School Built in Eldoret",
      category: "Education",
      status: "Verified",
      likes: 45,
    },
    {
      id: 2,
      title: "Community Garden Initiative",
      category: "Agriculture",
      status: "Pending",
      likes: 23,
    },
    {
      id: 3,
      title: "Youth Sports Program",
      category: "Sports",
      status: "Verified",
      likes: 67,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Latest Citizen Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                {achievement.title}
              </h3>
              <p className="text-gray-600 mb-2">
                Category: {achievement.category}
              </p>
              <div className="flex justify-between items-center">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    achievement.status === "Verified"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {achievement.status}
                </span>
                <span className="text-gray-500">❤️ {achievement.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
