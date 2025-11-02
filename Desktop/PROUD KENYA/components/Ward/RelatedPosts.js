export default function RelatedPosts({ wardId }) {
  const posts = [
    {
      id: 1,
      title: "Local Development Insights",
      excerpt: "Analysis of recent projects...",
      price: "KSh 30",
    },
    {
      id: 2,
      title: "Community Voices",
      excerpt: "Stories from local residents...",
      price: "KSh 25",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Related Paid Opinions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
