export default function CountyHeader({ countySlug }) {
  return (
    <section className="bg-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4 capitalize">
          {countySlug.replace("-", " ")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold">156</h3>
            <p>Projects Completed</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">89</h3>
            <p>Active Citizen Stories</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">12</h3>
            <p>Paid Posts</p>
          </div>
        </div>
      </div>
    </section>
  );
}
