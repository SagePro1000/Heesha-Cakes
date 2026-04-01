import { Product } from "@/types/product";
import { formatPriceRange, getProductPriceRange } from "@/lib/pricing";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
}

export function ProductCard({ product, onOpenModal }: ProductCardProps) {
  const { min, max } = getProductPriceRange(product);

  return (
    <div 
      className="group relative bg-[#ffffff] rounded-2xl glass hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100/50 cursor-pointer flex flex-col h-full"
      onClick={() => onOpenModal(product)}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAF9F6]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Quick Add overlay hint */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur text-sm font-semibold px-4 py-2 rounded-full text-black shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
            Quick View
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF4D6D]">
              {product.category}
            </span>
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-1 leading-tight line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <p className="text-[#00B4D8] font-black text-base md:text-lg">
            {formatPriceRange(min, max)}
          </p>
          <button className="h-10 w-10 bg-gray-50 group-hover:bg-[#FF4D6D] rounded-full flex items-center justify-center text-gray-400 group-hover:text-white transition-colors duration-300">
            <ChevronRight className="w-5 h-5 pointer-events-none" />
          </button>
        </div>
      </div>
    </div>
  );
}
