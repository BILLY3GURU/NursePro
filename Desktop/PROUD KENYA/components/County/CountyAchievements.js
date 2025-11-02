import AchievementCard from "../Card/AchievementCard";

export default function CountyAchievements({ countySlug }) {
  const achievements = [
    {
      id: 1,
      title: "New Hospital Wing Opened",
      category: "Health",
      status: "verified",
      excerpt: "State-of-the-art facility in Eldoret...",
      likes: 78,
      views: 234,
    },
    {
      id: 2,
      title: "Community Solar Project",
      category: "Energy",
      status: "verified",
      excerpt: "Bringing clean energy to rural areas...",
      likes: 56,
      views: 189,
    },
    {
      id: 3,
      title: "Youth Entrepreneurship Program",
      category: "Business",
      status: "pending",
      excerpt: "Supporting young innovators...",
      likes: 34,
      views: 123,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Recent Achievements in {countySlug.replace("-", " ")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </section>
  );
}
