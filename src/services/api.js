const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";
const FALLBACK_URL = "https://api.abcz.workers.dev/api/bazardor";

async function request(endpoint) {
  let firstError;

  for (const base of [BASE_URL, FALLBACK_URL]) {
    try {
      const response = await fetch(`${base}${endpoint}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      firstError = error;
    }
  }

  throw firstError || new Error("API request failed");
}

export async function getProducts() {
  return request("/products");
}

export async function getProduct(id) {
  return request(`/products/${encodeURIComponent(id)}`);
}

export async function getProductsByCategory(category) {
  return request(`/products?category=${encodeURIComponent(category)}`);
}

export async function getCategories() {
  return request("/categories");
}

export async function getCategory(slug) {
  return request(`/categories/${encodeURIComponent(slug)}`);
}

export function normalizeList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

export function normalizeOne(payload) {
  if (payload?.data && !Array.isArray(payload.data)) return payload.data;
  if (payload?.product) return payload.product;
  return payload;
}
