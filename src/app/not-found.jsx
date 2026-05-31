import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-extrabold text-orange-400 mb-4">404</h1>
      <p className="text-2xl font-bold text-gray-700 mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-8">
        Looks like this road doesn't exist. Let's head back home.
      </p>
      <Link
        href="/"
        className="bg-[#8b1a1a] hover:bg-red-900 text-white font-bold px-8 py-3 rounded-full transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}