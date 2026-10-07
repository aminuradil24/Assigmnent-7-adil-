import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductSkeleton from "../components/ProductSkeleton";
import { getProduct, normalizeOne } from "../services/api";
import { formatPrice, getNumericPrice } from "../utils/numbers";

function emojiFor(product) {
  const text = `${product?.name || ""} ${product?.title || ""}`.toLowerCase();
  if (text.includes("চাল") || text.includes("rice")) return "🍚";
  if (text.includes("ডাল") || text.includes("dal")) return "🫘";
  if (text.includes("আলু") || text.includes("potato")) return "🥔";
  if (text.includes("পেঁয়াজ") || text.includes("onion")) return "🧅";
  if (text.includes("মাছ") || text.includes("fish")) return "🐟";
  if (text.includes("ডিম") || text.includes("egg")) return "🥚";
  return "🛒";
}

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const payload = await getProduct(slug);
        if (active) setProduct(normalizeOne(payload));
      } catch {
        if (active) setProduct(null);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [slug]);

  if (loading) return <div className="container-main py-12"><ProductSkeleton /></div>;

  if (!product) {
    return (
      <div className="container-main py-24 text-center">
        <div className="text-7xl">😕</div>
        <h1 className="text-3xl font-black mt-4">পণ্য পাওয়া যায়নি</h1>
        <Link to="/" className="inline-block mt-6 bg-[#087f3e] text-white px-6 py-3 rounded-full font-bold">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const name = product?.name ?? product?.title ?? "পণ্য";
  const price = getNumericPrice(product);
  const min = product?.minimum_price ?? product?.min_price ?? price;
  const max = product?.maximum_price ?? product?.max_price ?? price;
  const avg = product?.average_price ?? product?.avg_price ?? price;
  const markets = product?.markets ?? product?.bazars ?? product?.market_prices ?? product?.prices ?? [];

  return (
    <div className="container-main py-10 md:py-14">
      <Link to="/" className="text-[#087f3e] font-bold">← হোমে ফিরে যান</Link>

      <div className="bg-white rounded-[28px] border p-5 md:p-10 mt-5">
        <div className="grid md:grid-cols-[220px_1fr] gap-8 items-center">
          <div className="h-52 rounded-2xl bg-[#f1f8ed] flex items-center justify-center text-8xl">
            {emojiFor(product)}
          </div>

          <div>
            <p className="text-[#087f3e] font-bold">PRODUCT DETAILS</p>
            <h1 className="text-4xl font-black mt-1">{name}</h1>
            <p className="text-gray-500 mt-3 leading-7">
              {product?.description ?? product?.summary ?? "আজকের বাজারের সর্বশেষ মূল্য তথ্য।"}
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full">
                {product?.category ?? "পণ্য"}
              </span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                {product?.unit ?? "প্রতি কেজি"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          <PriceBox title="সর্বনিম্ন দাম" value={min} />
          <PriceBox title="সর্বোচ্চ দাম" value={max} />
          <PriceBox title="গড় দাম" value={avg} />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-black">বাজারভিত্তিক আজকের দাম</h2>

          <div className="mt-5 overflow-x-auto rounded-2xl border">
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="bg-[#f6f8f4] text-left">
                  <th className="p-4">বাজার</th>
                  <th className="p-4">দাম</th>
                  <th className="p-4">ইউনিট</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(markets) && markets.length ? markets.map((m, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-4">{m?.name ?? m?.market ?? m?.bazar ?? `বাজার ${i + 1}`}</td>
                    <td className="p-4 font-bold text-[#087f3e]">
                      {formatPrice(m?.price ?? m?.current_price ?? m?.value ?? price)} টাকা
                    </td>
                    <td className="p-4 text-gray-500">{m?.unit ?? product?.unit ?? "প্রতি কেজি"}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="p-10 text-center text-gray-500">
                      এই পণ্যের বাজারভিত্তিক ডাটা API-তে পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function PriceBox({ title, value }) {
  return (
    <div className="bg-[#f3f8ef] rounded-2xl p-5">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-black text-[#087f3e] mt-2">
        {formatPrice(value)} টাকা
      </p>
    </div>
  );
}
