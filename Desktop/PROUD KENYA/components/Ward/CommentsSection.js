export default function CommentsSection({ wardId }) {
  const comments = [
    {
      id: 1,
      author: "John Doe",
      text: "Great work on the school renovation!",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Jane Smith",
      text: "The farmers cooperative is making a real difference.",
      timestamp: "1 day ago",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Local Discussion
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg"
              rows="4"
              placeholder="Share your thoughts about this ward..."
            ></textarea>
            <button className="mt-4 bg-primary text-white px-6 py-2 rounded">
              Post Comment
            </button>
          </div>
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{comment.author}</h4>
                  <span className="text-sm text-gray-500">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
