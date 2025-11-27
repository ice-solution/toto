import React, { useState } from 'react';
import { SectionTitle, Card, Button } from '../components/UIComponents';
import { PRODUCTS, calculatePoints } from '../data';
import { useShop } from '../context/ShopContext';
import { Sparkles, Coins } from 'lucide-react';

const Products = () => {
  const { addToCart } = useShop();
  const [filter, setFilter] = useState('All');

  // Extract unique series
  const seriesList = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.series)))];
  
  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.series === filter);

  return (
    <div className="pt-32 pb-24 animate-fade-in bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle title="靈物加持" subtitle="Spiritual Artifacts" />
        
        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600 leading-relaxed">
          由杜師傅親自開光加持的風水靈物，每一件都蘊含著獨特的能量頻率。
          <br/>
          精選五大系列，全方位守護您的財富、姻緣、健康與事業。
        </p>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {seriesList.map(series => (
            <button
              key={series}
              onClick={() => setFilter(series)}
              className={`px-6 py-2 text-xs md:text-sm uppercase tracking-widest transition-all duration-300 border ${filter === series ? 'bg-black text-white border-black' : 'bg-transparent text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}
            >
              {series === 'All' ? '全部系列' : series}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <Card key={product.id} className="flex flex-col h-full group p-0 overflow-hidden border-0 shadow-none hover:shadow-xl transition-shadow">
              <div className="relative overflow-hidden aspect-square bg-gray-50">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                />
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 text-[10px] uppercase tracking-widest">
                  {product.series}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-serif mb-2 line-clamp-1 group-hover:text-accent transition-colors">{product.name}</h3>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                
                <div className="mt-auto border-t border-gray-50 pt-4">
                  <div className="flex items-center gap-1 mb-2 text-[10px] text-yellow-600">
                     <Coins className="w-3 h-3" />
                     賺取 {calculatePoints(product.price)} 積分
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">HK${product.price.toLocaleString()}</span>
                    <button 
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        type: 'product'
                      })}
                      className="bg-black text-white p-2 rounded-full hover:bg-accent transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;