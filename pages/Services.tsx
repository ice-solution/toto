import React, { useState, useMemo, useEffect } from 'react';
import { SectionTitle, Card, Button } from '../components/UIComponents';
import { calculatePoints } from '../data';
import { useShop } from '../context/ShopContext';
import { Coins, Sparkles, ExternalLink } from 'lucide-react';
import { getServices } from '../utils/servicesStorage';
import { ServiceItem } from '../types';
import ProductDetailModal from '../components/ProductDetailModal';
import { ProductItem } from '../utils/productsData';

const Services = () => {
  const { addToCart } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 載入 services.json 數據
  useEffect(() => {
    getServices().then(data => {
      setServices(data);
      setIsLoading(false);
    });
  }, []);

  // 獲取所有 categories
  const categories = useMemo(() => {
    const cats = new Set(services.map(s => s.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [services]);

  // 獲取過濾後的服務
  const filteredServices = useMemo(() => {
    if (selectedCategory === 'All') {
      return services;
    }
    return services.filter(s => s.category === selectedCategory);
  }, [services, selectedCategory]);

  // 將 ServiceItem 轉換為 ProductItem 格式（用於 ProductDetailModal）
  const serviceToProductItem = (service: ServiceItem): ProductItem => {
    return {
      儀式名稱: service.name,
      紅兒價錢: typeof service.price === 'number' ? service.price : (typeof service.price === 'string' ? service.price : 0),
      儀式內容: service.description,
      "Instagram 網址": service.instagramUrl,
      圖片網址: service.imageUrl, // 添加圖片 URL
    };
  };

  const handleServiceClick = (service: ServiceItem) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-32 pb-24 animate-fade-in bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle title="玄學服務" subtitle="Sacred Services" />
        
        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600 leading-relaxed">
          由杜師傅親自執行的傳統六壬神功儀式，每一項服務都經過精心設計，針對不同需求提供專業的法事服務。
          <br/>
          根據您的需求選擇合適的分類，找到最適合您的儀式服務。
        </p>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg mb-2">載入中...</p>
            <p className="text-sm">正在載入服務數據</p>
          </div>
        )}

        {/* Category Filter */}
        {!isLoading && categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-xs md:text-sm uppercase tracking-widest transition-all duration-300 border ${
                  selectedCategory === category
                    ? 'bg-black text-white border-black'
                    : 'bg-transparent text-gray-500 border-gray-200 hover:border-black hover:text-black'
                }`}
              >
                {category === 'All' ? '全部服務' : category}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {!isLoading && filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
              const priceValue = typeof service.price === 'number' ? service.price : 0;
              const priceDisplay = priceValue > 0 
                ? `HK$${priceValue.toLocaleString()}` 
                : typeof service.price === 'string' ? `HK$${service.price}` : '請查詢';

              return (
                <Card 
                  key={service.id} 
                  className="flex flex-col h-full group cursor-pointer"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="relative overflow-hidden mb-6 aspect-square bg-gray-50">
                    <img 
                      src={service.imageUrl} 
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.classList.add('bg-gradient-to-br', 'from-gray-100', 'to-gray-200');
                        }
                      }}
                    />
                    {service.category && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-widest">
                        {service.category}
                      </div>
                    )}
                    {!service.imageUrl && (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Sparkles className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-serif mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow line-clamp-4">
                    {service.description}
                  </p>
                  
                  <div className="mt-auto border-t border-gray-100 pt-4">
                    {priceValue > 0 && (
                      <div className="flex items-center gap-2 mb-3 text-xs text-yellow-600 bg-yellow-50 w-fit px-2 py-1 rounded">
                        <Coins className="w-3 h-3" />
                        可賺取 {calculatePoints(priceValue)} 積分
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">{priceDisplay}</span>
                      {priceValue > 0 && (
                        <Button 
                          variant="primary" 
                          className="py-2 px-4 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              id: service.id,
                              name: service.name,
                              price: priceValue,
                              quantity: 1,
                              type: 'service'
                            });
                          }}
                        >
                          加入預約
                        </Button>
                      )}
                    </div>
                    {service.tags && service.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {service.tags.map(tag => (
                          <span key={tag} className="text-[10px] border border-gray-200 px-2 py-1 text-gray-500 rounded-full">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        ) : !isLoading ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg mb-2">暫無服務</p>
            <p className="text-sm">此分類下目前沒有可用的服務</p>
          </div>
        ) : null}

        {/* Service Detail Modal */}
        {selectedService && (
          <ProductDetailModal
            item={serviceToProductItem(selectedService)}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedService(null);
            }}
            type="service"
            subcategory={selectedService.category}
            instagramUrl={selectedService.instagramUrl}
            imageUrl={selectedService.imageUrl}
          />
        )}
      </div>
    </div>
  );
};

export default Services;
