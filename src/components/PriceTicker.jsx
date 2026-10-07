const items = [
  "🍚 মিনিকেট চাল ৭৮ টাকা ▲ ২.১%",
  "🥔 আলু ৩৫ টাকা ▼ ১.৮%",
  "🧅 পেঁয়াজ ৮৫ টাকা ▲ ৩.২%",
  "🐟 ইলিশ মাছ ১,৮৫০ টাকা ▼ ২.৯%",
  "🥚 ডিম ১৩৫ টাকা ▲ ১.২%",
  "🌶️ মরিচ ১৮০ টাকা ▲ ৪.১%",
  "🫘 মসুর ডাল ১৪০ টাকা ▲ ১.৪%"
];

export default function PriceTicker() {
  return (
    <div className="bg-[#10251a] text-white overflow-hidden">
      <div className="ticker-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="px-7 py-2 whitespace-nowrap text-sm">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
