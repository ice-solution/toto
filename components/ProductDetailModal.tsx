import React from 'react';
import { X, Sparkles, Coins, ExternalLink } from 'lucide-react';
import { Button } from './UIComponents';
import { useShop } from '../context/ShopContext';
import { calculatePoints } from '../data';
import { ProductItem } from '../utils/productsData';
import { getProductName, getProductDescription, getProductPrice, getProductImageUrl } from '../utils/productsData';

interface ProductDetailModalProps {
  item: ProductItem;
  isOpen: boolean;
  onClose: () => void;
  type: 'product' | 'service';
  subcategory?: string;
  instagramUrl?: string;
  imageUrl?: string; // 可選的圖片 URL（如果 item 中沒有圖片網址）
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  type,
  subcategory,
  instagramUrl,
  imageUrl,
}) => {
  const { addToCart } = useShop();

  if (!isOpen) return null;

  const productName = getProductName(item);
  const productDescription = getProductDescription(item);
  const productPrice = getProductPrice(item);
  const productImageUrl = imageUrl || getProductImageUrl(item); // 優先使用傳入的 imageUrl
  const priceDisplay = productPrice > 0 
    ? `HK$${productPrice.toLocaleString()}` 
    : '請查詢';

  const handleAddToCart = () => {
    const productId = `${type}-${Date.now()}-${productName.replace(/\s+/g, '-')}`;
    addToCart({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
      type: type,
    });
    onClose();
  };

  // 阻止點擊 modal 內容時關閉
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-[80] backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="fixed inset-0 z-[90] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-fade-in-up"
          onClick={handleModalContentClick}
        >
          {/* Header with Image */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            {productImageUrl ? (
              <>
                <img 
                  src={productImageUrl} 
                  alt={productName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.error-placeholder')) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'error-placeholder w-full h-full flex items-center justify-center';
                      placeholder.innerHTML = '<svg class="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>';
                      parent.appendChild(placeholder);
                    }
                  }}
                />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Sparkles className="w-24 h-24 text-gray-300" />
              </div>
            )}
            {subcategory && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-widest rounded">
                {subcategory}
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 bg-white/90 backdrop-blur p-2 rounded-full hover:bg-white transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8">
            {/* Title */}
            <h2 className="text-3xl font-serif mb-4">{productName}</h2>

            {/* Price and Points */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold">{priceDisplay}</span>
              {productPrice > 0 && (
                <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                  <Coins className="w-4 h-4" />
                  可賺取 {calculatePoints(productPrice)} 積分
                </div>
              )}
            </div>

            {/* Description */}
            {productDescription && (
              <div className="prose max-w-none mb-6">
                <div 
                  className="text-gray-700 leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: productDescription.replace(/\n/g, '<br />') }}
                />
              </div>
            )}

            {/* Instagram Link */}
            {instagramUrl && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  查看 Instagram 詳細資訊
                </a>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              關閉
            </Button>
            {productPrice > 0 && (
              <Button onClick={handleAddToCart} className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {type === 'product' ? '加入購物車' : '加入預約'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailModal;

