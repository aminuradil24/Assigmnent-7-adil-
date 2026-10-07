const EN = "0123456789";
const BN = "০১২৩৪৫৬৭৮৯";

export function toBanglaNumber(value) {
  if (value === null || value === undefined) return "";
  return String(value).split("").map((char) => {
    const i = EN.indexOf(char);
    return i >= 0 ? BN[i] : char;
  }).join("");
}

export function formatPrice(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  return toBanglaNumber(n.toLocaleString("en-US"));
}

export function getNumericPrice(product) {
  const keys = [
    "price", "current_price", "currentPrice",
    "average_price", "avg_price", "averagePrice",
    "min_price", "minimum_price", "max_price", "maximum_price"
  ];

  for (const key of keys) {
    const n = Number(product?.[key]);
    if (Number.isFinite(n)) return n;
  }
  return 0;
}

export function getChange(product) {
  const keys = [
    "change_percentage", "changePercent", "percentage",
    "change", "price_change", "priceChange"
  ];

  for (const key of keys) {
    const n = Number(product?.[key]);
    if (Number.isFinite(n)) return n;
  }
  return 0;
}
