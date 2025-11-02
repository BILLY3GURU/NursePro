export default function FeaturedCountyPosts({ countySlug }) {
  const posts = [
    {
      id: 1,
      title: "Uasin Gishu Education Initiatives",
      excerpt: "Latest developments in local education...",
      price: "KSh 40",
    },
    {
      id: 2,
      title: "Agricultural Growth in the Region",
      excerpt: "Success stories from local farmers...",
      price: "KSh 55",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured County Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-50 p-6 rounded-lg">
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
