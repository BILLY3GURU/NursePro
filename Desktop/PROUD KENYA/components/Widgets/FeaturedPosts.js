export default function FeaturedPosts() {
  const posts = [
    {
      id: 1,
      title: "Education Reforms in Kenya",
      excerpt: "How new policies are transforming learning...",
      price: "KSh 50",
    },
    {
      id: 2,
      title: "Agricultural Innovations",
      excerpt: "Tech-driven farming solutions...",
      price: "KSh 75",
    },
    {
      id: 3,
      title: "Road Infrastructure Updates",
      excerpt: "Latest developments in transport...",
      price: "KSh 60",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Magazine Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold">{post.price}</span>
                <button className="bg-primary text-white px-4 py-2 rounded">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
