import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Proud Kenya</h3>
            <p>Tracking national progress and achievements.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/counties" className="hover:text-primary">
                  Counties
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-primary">
                  Achievements
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Publish</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/submit" className="hover:text-primary">
                  Submit Achievement
                </Link>
              </li>
              <li>
                <Link href="/publish" className="hover:text-primary">
                  Publish Opinion
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2023 Proud Kenya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
