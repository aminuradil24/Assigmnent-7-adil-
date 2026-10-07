import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { getCategory, getProductsByCategory, normalizeList, normalizeOne } from "../services/api";
import { getNumericPrice } from "../utils/numbers";

export default function Category() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setInvalid(false);
      try {
        const [productPayload, categoryPayload] = await Promise.all([
          getProductsByCategory(slug),
          getCategory(slug)
        ]);
        const list = normalizeList(productPayload);
        if (active) {
          setProducts(list);
          setCategory(normalizeOne(categoryPayload));
          if (!list.length) setInvalid(true);
        }
      } catch {
        if (active) setInvalid(true);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [slug]);

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "low") list.sort((a,b) => getNumericPrice(a) - getNumericPrice(b));
    if (sort === "high") list.sort((a,b) => getNumericPrice(b) - getNumericPrice(a));
    return list;
  }, [products, sort]);

  if (invalid && !loading) {
    return (
      <div className="container-main py-24 text-center">
        <div className="text-7xl">🔎</div>
        <h1 className="text-4xl font-black mt-5">ক্যাটাগরি পাওয়া যায়নি</h1>
        <p className="text-gray-500 mt-3">এই ক্যাটাগরির কোনো পণ্য খুঁজে পাওয়া যায়নি।</p>
        <Link to="/" className="inline-block mt-7 px-6 py-3 rounded-full bg-[#087f3e] text-white font-bold">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="container-main py-10 md:py-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-9">
        <div>
          <p className="text-[#087f3e] font-bold">CATEGORY</p>
          <h1 className="text-4xl font-black mt-1">
            {category?.name ?? category?.title ?? slug}
          </h1>
          <p className="text-gray-500 mt-2">এই ক্যাটাগরির সব পণ্যের আজকের বাজার দর।</p>
        </div>

        <label className="flex items-center gap-2 bg-white border rounded-xl px-3 py-2">
          <span className="text-sm font-semibold whitespace-nowrap">সাজান:</span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-transparent outline-none py-1"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({length:8}).map((_,i) => <ProductSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sorted.map(p => <ProductCard key={p.id ?? p.slug} product={p} />)}
        </div>
      )}
    </div>
  );
}
