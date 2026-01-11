import React, { useState, useEffect } from 'react';
import { SectionTitle, Card, Button } from '../components/UIComponents';
import { calculatePoints } from '../data';
import { useShop } from '../context/ShopContext';
import { Clock, BookOpen, ExternalLink, Coins } from 'lucide-react';
import { getCourses } from '../utils/coursesStorage';
import { CourseItem } from '../types';

const Courses = () => {
  const { addToCart } = useShop();
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCourses().then(data => {
      setCourses(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="pt-32 pb-24 animate-fade-in bg-paper">
      <div className="container mx-auto px-6">
        <SectionTitle title="靈修課程" subtitle="Spiritual Courses" />

        {isLoading ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg mb-2">載入中...</p>
            <p className="text-sm">正在載入課程數據</p>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {courses.map(course => (
            <div key={course.id} className="bg-white flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 group">
              <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden relative">
                <img 
                  src={course.imageUrl} 
                  alt={course.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                {course.instagramUrl && (
                  <a href={course.instagramUrl} target="_blank" rel="noreferrer" className="absolute bottom-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white text-black">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <div className="p-8 w-full md:w-3/5 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                   <h3 className="text-xl font-serif w-3/4">{course.name}</h3>
                   <span className="text-xs bg-accent text-white px-2 py-1 rounded">{course.level}</span>
                </div>
                
                <div className="flex gap-4 mb-4 text-xs text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> 線下教學
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">
                  {course.description}
                </p>

                <div className="mt-auto border-t border-gray-50 pt-4">
                   <div className="flex items-center gap-2 mb-3 text-xs text-yellow-600 bg-yellow-50 w-fit px-2 py-1 rounded">
                     <Coins className="w-3 h-3" />
                     可賺取 {calculatePoints(course.price)} 積分
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-xl font-bold">
                       {typeof course.price === 'number' ? `HK$${course.price.toLocaleString()}` : `HK$${course.price}`}
                     </span>
                     <Button 
                       variant="outline" 
                       className="py-2 px-6 text-xs"
                       onClick={() => addToCart({
                         id: course.id,
                         name: course.name,
                         price: typeof course.price === 'number' ? course.price : 0,
                         quantity: 1,
                         type: 'course'
                       })}
                     >
                       報名
                     </Button>
                   </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg mb-2">暫無課程</p>
            <p className="text-sm">目前沒有可用的課程</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;