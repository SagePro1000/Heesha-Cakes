import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

function getSizeMultiplier(size: string): number {
  const matchedSize = size.match(/size\s*(\d+)/i);
  const sizeInches = matchedSize ? Number(matchedSize[1]) : null;
  if (!sizeInches) return 1;
  return Math.max(0.75, sizeInches / 6);
}

function getLayerMultiplier(size: string): number {
  if (/\b2\s*layers?\b/i.test(size)) return 1.35;
  if (/\b3\s*layers?\b/i.test(size)) return 1.7;
  return 1;
}

function getFlavorMultiplier(flavor: string): number {
  if (/chocolate/i.test(flavor)) return 1.08;
  if (/red velvet/i.test(flavor)) return 1.12;
  if (/fruit/i.test(flavor)) return 1.15;
  return 1;
}

export function getCustomizedPrice(product: Product, size: string, flavor: string): number {
  const sizeMultiplier = getSizeMultiplier(size);
  const layerMultiplier = getLayerMultiplier(size);
  const flavorMultiplier = getFlavorMultiplier(flavor);
  return Math.round(product.basePrice * sizeMultiplier * layerMultiplier * flavorMultiplier);
}

export function getProductPriceRange(product: Product): { min: number; max: number } {
  const sizes = product.availableSizes.length > 0 ? product.availableSizes : [""];
  const flavors = product.availableFlavors.length > 0 ? product.availableFlavors : [""];

  let min = Number.POSITIVE_INFINITY;
  let max = 0;

  for (const size of sizes) {
    for (const flavor of flavors) {
      const price = getCustomizedPrice(product, size, flavor);
      min = Math.min(min, price);
      max = Math.max(max, price);
    }
  }

  if (!Number.isFinite(min)) {
    return { min: product.basePrice, max: product.basePrice };
  }

  return { min, max };
}

export function formatPriceRange(min: number, max: number): string {
  if (min === max) return formatPrice(min);
  return `${formatPrice(min)} - ${formatPrice(max)}`;
}
