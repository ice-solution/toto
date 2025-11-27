import React, { useState } from 'react';
import { SectionTitle, Card, Button } from '../components/UIComponents';
import { SERVICES, calculatePoints } from '../data';
import { useShop } from '../context/ShopContext';
import { Coins } from 'lucide-react';

const Services = () => {
  const { addToCart } = useShop();
  const [filter, setFilter] = useState('All');

  // Extract unique categories from new data
  const categories = ['All', ...Array.from(new Set(SERVICES.map(s => s.category)))];
  
  const filteredServices = filter === 'All' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === filter);

  return (
    <div className="pt-32 pb-24 animate-fade-in">
      <div className="container mx-auto px-6">
        <SectionTitle title="玄學服務" subtitle="Sacred Services" />

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-xs md:text-sm uppercase tracking-widest transition-colors border ${filter === cat ? 'bg-black text-white border-black' : 'bg-transparent text-gray-500 border-gray-200 hover:border-black'}`}
            >
              {cat === 'All' ? '全部服務' : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <Card key={service.id} className="flex flex-col h-full group">
              <div className="relative overflow-hidden mb-6 h-64">
                <img 
                  src={service.imageUrl} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-widest">
                  {service.category}
                </div>
              </div>
              
              <h3 className="text-xl font-serif mb-2">{service.name}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {service.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-gray-100 px-2 py-1 text-gray-600 rounded-full">{tag}</span>
                ))}
              </div>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow line-clamp-4">
                {service.description}
              </p>
              
              <div className="mt-auto border-t border-gray-100 pt-4">
                 <div className="flex items-center gap-2 mb-3 text-xs text-yellow-600 bg-yellow-50 w-fit px-2 py-1 rounded">
                   <Coins className="w-3 h-3" />
                   可賺取 {calculatePoints(service.price)} 積分
                 </div>
                 <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">
                    {typeof service.price === 'number' ? `HK$${service.price.toLocaleString()}` : `HK$${service.price}`}
                  </span>
                  <Button 
                    variant="primary" 
                    className="py-2 px-4 text-xs"
                    onClick={() => addToCart({
                      id: service.id,
                      name: service.name,
                      price: typeof service.price === 'number' ? service.price : 0, // Handle range price for cart logic
                      quantity: 1,
                      type: 'service'
                    })}
                  >
                    加入預約
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;