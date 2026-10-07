import { useEffect, useMemo, useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { getProducts, normalizeList } from "../services/api";
import { getChange } from "../utils/numbers";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const data = await getProducts();
        if (active) setProducts(normalizeList(data));
      } catch {
        if (active) setError("পণ্যের তথ্য লোড করা যায়নি। API আবার চেষ্টা করুন।");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  const risers = useMemo(
    () => [...products].filter(p => getChange(p) > 0).sort((a,b) => getChange(b)-getChange(a)).slice(0,6),
    [products]
  );

  const fallers = useMemo(
    () => [...products].filter(p => getChange(p) < 0).sort((a,b) => getChange(a)-getChange(b)).slice(0,6),
    [products]
  );

  return (
    <>
      <Hero />
      <section className="container-main pb-14">
        {error && (
          <div className="mb-8 bg-red-50 border border-red-100 text-red-700 rounded-2xl p-4">
            {error}
          </div>
        )}

        <ProductSection
          title="আজ দাম বেড়েছে ▲"
          subtitle="যেসব পণ্যের দাম আজ বেড়েছে"
          products={risers}
          loading={loading}
        />

        <ProductSection
          title="আজ দাম কমেছে ▼"
          subtitle="যেসব পণ্যের দাম আজ কমেছে"
          products={fallers}
          loading={loading}
        />

        <section id="সব-পণ্য" className="scroll-mt-32">
          <div className="mb-7">
            <p className="text-[#087f3e] font-bold">MARKET LIST</p>
            <h2 className="text-3xl md:text-4xl font-black mt-1">সব পণ্য</h2>
            <p className="text-gray-500 mt-2">
              বাজারের প্রয়োজনীয় সব পণ্যের আজকের দাম।
            </p>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({length:8}).map((_,i) => <ProductSkeleton key={i} />)}
            </div>
          ) : products.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map(p => <ProductCard key={p.id ?? p.slug} product={p} />)}
            </div>
          ) : (
            <Empty />
          )}
        </section>
      </section>
    </>
  );
}

function ProductSection({ title, subtitle, products, loading }) {
  return (
    <section className="mb-16">
      <div className="mb-7">
        <h2 className="text-3xl md:text-4xl font-black">{title}</h2>
        <p className="text-gray-500 mt-2">{subtitle}</p>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({length:6}).map((_,i) => <ProductSkeleton key={i} />)}
        </div>
      ) : products.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map(p => <ProductCard key={p.id ?? p.slug} product={p} />)}
        </div>
      ) : (
        <p className="text-gray-500 bg-white rounded-2xl border p-6">
          বর্তমানে এই তালিকায় কোনো তথ্য নেই।
        </p>
      )}
    </section>
  );
}

function Empty() {
  return (
    <div className="bg-white rounded-3xl border p-12 text-center">
      <div className="text-6xl">🛒</div>
      <h3 className="font-black text-2xl mt-4">কোনো পণ্য পাওয়া যায়নি</h3>
      <p className="text-gray-500 mt-2">API থেকে এখনো কোনো পণ্য পাওয়া যায়নি।</p>
    </div>
  );
}
