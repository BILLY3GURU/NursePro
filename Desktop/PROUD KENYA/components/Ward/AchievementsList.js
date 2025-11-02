import AchievementCard from "../Card/AchievementCard";

export default function AchievementsList({ wardId }) {
  const achievements = [
    {
      id: 1,
      title: "Local School Renovation",
      category: "Education",
      status: "verified",
      excerpt: "Community-funded upgrade...",
      likes: 45,
      views: 156,
    },
    {
      id: 2,
      title: "Farmers Cooperative Launch",
      category: "Agriculture",
      status: "verified",
      excerpt: "New cooperative helping local farmers...",
      likes: 67,
      views: 234,
    },
    {
      id: 3,
      title: "Youth Sports League",
      category: "Sports",
      status: "pending",
      excerpt: "Organizing local youth sports...",
      likes: 23,
      views: 89,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Achievements in Ward {wardId}
        </h2>
        <div className="mb-8 flex justify-center space-x-4">
          <button className="bg-primary text-white px-4 py-2 rounded">
            All
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
            Government
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
            Citizen
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-primary text-white px-6 py-3 rounded-lg text-lg font-semibold">
            Submit Achievement
          </button>
        </div>
      </div>
    </section>
  );
}
