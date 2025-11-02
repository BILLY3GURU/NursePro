import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            Proud Kenya
          </Link>
          <nav className="flex space-x-4">
            <Link href="/search" className="text-gray-700 hover:text-primary">
              Search
            </Link>
            <Link href="/map" className="text-gray-700 hover:text-primary">
              Map
            </Link>
            <Link
              href="/publish"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Publish
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-primary">
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
