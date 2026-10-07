import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatPrice, getChange, getNumericPrice } from "../utils/numbers";

function emojiFor(product) {
  const text = `${product?.name || ""} ${product?.title || ""}`.toLowerCase();
  if (text.includes("চাল") || text.includes("rice")) return "🍚";
  if (text.includes("ডাল") || text.includes("dal")) return "🫘";
  if (text.includes("আলু") || text.includes("potato")) return "🥔";
  if (text.includes("পেঁয়াজ") || text.includes("onion")) return "🧅";
  if (text.includes("মরিচ") || text.includes("chili")) return "🌶️";
  if (text.includes("মাছ") || text.includes("fish")) return "🐟";
  if (text.includes("মাংস") || text.includes("meat")) return "🍗";
  if (text.includes("ডিম") || text.includes("egg")) return "🥚";
  if (text.includes("রসুন") || text.includes("garlic")) return "🧄";
  if (text.includes("আদা") || text.includes("ginger")) return "🫚";
  return "🛒";
}

function slugFor(product) {
  return product?.slug ?? product?.id;
}

export default function ProductCard({ product }) {
  const name = product?.name ?? product?.title ?? "পণ্য";
  const unit = product?.unit ?? product?.measurement ?? "প্রতি কেজি";
  const price = getNumericPrice(product);
  const change = getChange(product);
  const up = change > 0;
  const down = change < 0;

  return (
    <Link
      to={`/product/${slugFor(product)}`}
      className="bg-white rounded-2xl border p-5 card-shadow hover:-translate-y-1 transition fade-up block"
    >
      <div className="h-32 rounded-xl bg-[#f1f8ed] flex items-center justify-center text-6xl">
        {emojiFor(product)}
      </div>

      <div className="flex items-start justify-between gap-3 mt-5">
        <div>
          <h3 className="font-bold text-lg leading-tight">{name}</h3>
          <p className="text-sm text-gray-500 mt-1">{unit}</p>
        </div>
        <span className="text-xs bg-gray-50 px-2 py-1 rounded-full text-gray-500">
          #{product?.id ?? "—"}
        </span>
      </div>

      <div className="flex items-end justify-between gap-3 mt-5">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="font-black text-xl text-[#087f3e]">
            {formatPrice(price)} টাকা
          </p>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-0.5 ${
          up ? "bg-green-100 text-green-700" :
          down ? "bg-red-100 text-red-600" :
          "bg-gray-100 text-gray-500"
        }`}>
          {up ? <ArrowUpRight size={14} /> : down ? <ArrowDownRight size={14} /> : null}
          {up || down ? `${Math.abs(change)}%` : "০.০%"}
        </span>
      </div>
    </Link>
  );
}
