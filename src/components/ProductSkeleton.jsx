export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border p-5">
      <div className="skeleton h-32 rounded-xl" />
      <div className="skeleton h-5 rounded mt-5 w-3/4" />
      <div className="skeleton h-4 rounded mt-3 w-1/2" />
      <div className="flex justify-between mt-6">
        <div className="skeleton h-8 rounded w-24" />
        <div className="skeleton h-7 rounded w-16" />
      </div>
    </div>
  );
}
