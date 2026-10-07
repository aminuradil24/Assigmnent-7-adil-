import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl">🛒</div>
        <h1 className="text-7xl font-black text-[#087f3e] mt-3">404</h1>
        <h2 className="text-2xl font-black mt-2">পেজটি খুঁজে পাওয়া যায়নি</h2>
        <p className="text-gray-500 mt-3 max-w-md mx-auto">
          আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা URL ভুল।
        </p>
        <Link to="/" className="inline-block mt-7 bg-[#087f3e] text-white px-6 py-3 rounded-full font-black">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
