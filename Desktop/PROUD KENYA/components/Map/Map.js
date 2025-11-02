// Placeholder for interactive map component
export default function Map() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Kenya</h2>
        <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">
            Interactive County Map - Click to zoom
          </p>
        </div>
        <div className="mt-8 text-center">
          <a
            href="/county/uasin-gishu"
            className="bg-primary text-white px-6 py-3 rounded"
          >
            View Uasin Gishu
          </a>
        </div>
      </div>
    </section>
  );
}
