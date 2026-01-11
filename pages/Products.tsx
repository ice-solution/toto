import React, { useState, useMemo, useEffect } from 'react';
import { SectionTitle, Card, Button } from '../components/UIComponents';
import { calculatePoints } from '../data';
import { useShop } from '../context/ShopContext';
import { Sparkles, Coins } from 'lucide-react';
import ProductDetailModal from '../components/ProductDetailModal';
import { 
  getProductsDataAsync,
  getCategoryByName,
  getItemsByCategoryAndSubcategory,
  getProductName,
  getProductDescription,
  getProductPrice,
  getSubcategoryForItem,
  getInstagramUrl,
  ProductItem,
  ProductsData
} from '../utils/productsData';

const Products = () => {
  const { addToCart } = useShop();
  const categoryName = '百子櫃產品'; // 固定只顯示百子櫃產品
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [productsData, setProductsData] = useState<ProductsData>({ categories: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ProductItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 載入 products.json 數據
  useEffect(() => {
    getProductsDataAsync().then(data => {
      setProductsData(data);
      setIsLoading(false);
    });
  }, []);

  // 獲取百子櫃產品分類的所有 subcategories
  const subcategories = useMemo(() => {
    const category = getCategoryByName(productsData, categoryName);
    if (!category) return [];
    return category.subcategories.map(sub => sub.name);
  }, [productsData]);

  // 獲取過濾後的產品
  const filteredItems = useMemo(() => {
    if (selectedSubcategory === 'All') {
      return getItemsByCategoryAndSubcategory(productsData, categoryName);
    }
    return getItemsByCategoryAndSubcategory(productsData, categoryName, selectedSubcategory);
  }, [productsData, selectedSubcategory]);

  // 生成產品 ID（用於購物車）
  const generateProductId = (item: ProductItem, index: number): string => {
    const name = getProductName(item);
    return `product-${categoryName}-${index}-${name.replace(/\s+/g, '-')}`;
  };

  return (
    <div className="pt-32 pb-24 animate-fade-in bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle title="靈物加持" subtitle="Spiritual Artifacts" />
        
        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600 leading-relaxed">
          由杜師傅親自開光加持的百子櫃靈物，每一件都蘊含著獨特的能量頻率。
          <br/>
          精選靈物系列，全方位守護您的財富、姻緣、健康與事業。
        </p>

        {/* Subcategory Filter */}
        {!isLoading && subcategories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button
              onClick={() => setSelectedSubcategory('All')}
              className={`px-6 py-2 text-xs md:text-sm uppercase tracking-widest transition-all duration-300 border ${
                selectedSubcategory === 'All'
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-gray-500 border-gray-200 hover:border-black hover:text-black'
              }`}
            >
              全部系列
            </button>
            {subcategories.map(subcategory => (
              <button
                key={subcategory}
                onClick={() => setSelectedSubcategory(subcategory)}
                className={`px-6 py-2 text-xs md:text-sm uppercase tracking-widest transition-all duration-300 border ${
                  selectedSubcategory === subcategory
                    ? 'bg-black text-white border-black'
                    : 'bg-transparent text-gray-500 border-gray-200 hover:border-black hover:text-black'
                }`}
              >
                {subcategory}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg mb-2">載入中...</p>
            <p className="text-sm">正在載入產品數據</p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredItems.map((item, index) => {
              const productName = getProductName(item);
              const productDescription = getProductDescription(item);
              const productPrice = getProductPrice(item);
              const productId = generateProductId(item, index);
              const priceDisplay = productPrice > 0 
                ? `HK$${productPrice.toLocaleString()}` 
                : '請查詢';

              // 獲取產品所屬的子分類名稱（如果是 'All' 則需要查找，否則直接使用選中的）
              const itemSubcategory = selectedSubcategory === 'All' 
                ? getSubcategoryForItem(productsData, categoryName, item) || ''
                : selectedSubcategory;

              const handleItemClick = () => {
                setSelectedItem(item);
                setIsModalOpen(true);
              };

              return (
                <Card 
                  key={productId} 
                  className="flex flex-col h-full group p-0 overflow-hidden border-0 shadow-none hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={handleItemClick}
                >
                    <div className="relative overflow-hidden aspect-square bg-gray-50">
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Sparkles className="w-16 h-16 text-gray-300" />
                      </div>
                      {itemSubcategory && (
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 text-[10px] uppercase tracking-widest">
                          {itemSubcategory}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-serif mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                        {productName}
                      </h3>
                    {productDescription && (
                      <p className="text-gray-500 text-xs mb-4 leading-relaxed line-clamp-3">
                        {productDescription.length > 100 
                          ? `${productDescription.substring(0, 100)}...` 
                          : productDescription}
                      </p>
                    )}
                    
                    <div className="mt-auto border-t border-gray-50 pt-4">
                      {productPrice > 0 && (
                        <div className="flex items-center gap-1 mb-2 text-[10px] text-yellow-600">
                          <Coins className="w-3 h-3" />
                          賺取 {calculatePoints(productPrice)} 積分
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">{priceDisplay}</span>
                        {productPrice > 0 && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart({
                                id: productId,
                                name: productName,
                                price: productPrice,
                                quantity: 1,
                                type: 'product'
                              });
                            }}
                            className="bg-black text-white p-2 rounded-full hover:bg-accent transition-colors"
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : !isLoading ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg mb-2">暫無產品</p>
            <p className="text-sm">此分類下目前沒有可用的產品</p>
          </div>
        ) : null}

        {/* Product Detail Modal */}
        {selectedItem && (
          <ProductDetailModal
            item={selectedItem}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedItem(null);
            }}
            type="product"
            subcategory={selectedSubcategory === 'All' 
              ? getSubcategoryForItem(productsData, categoryName, selectedItem) || ''
              : selectedSubcategory}
            instagramUrl={getInstagramUrl(selectedItem)}
          />
        )}
      </div>
    </div>
  );
};

export default Products;