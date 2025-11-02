import Link from "next/link";

export default function ConstituencyCards({ countySlug }) {
  const constituencies = [
    { id: "eldoret-north", name: "Eldoret North", stats: "23 achievements" },
    { id: "eldoret-south", name: "Eldoret South", stats: "18 achievements" },
    { id: "soy", name: "Soy", stats: "15 achievements" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Constituencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {constituencies.map((constituency) => (
            <Link
              key={constituency.id}
              href={`/constituency/${constituency.id}`}
            >
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-semibold mb-2">
                  {constituency.name}
                </h3>
                <p className="text-gray-600">{constituency.stats}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
