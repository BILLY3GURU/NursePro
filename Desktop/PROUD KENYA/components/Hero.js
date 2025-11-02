export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-green-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Proud Kenya — Track National Progress
        </h1>
        <p className="text-xl mb-8">
          Discover achievements, share stories, and celebrate Kenya's growth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-2xl font-bold">1,234</h3>
            <p>Achievements</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-2xl font-bold">47</h3>
            <p>Counties Active</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-2xl font-bold">89</h3>
            <p>Paid Posts</p>
          </div>
        </div>
      </div>
    </section>
  );
}
