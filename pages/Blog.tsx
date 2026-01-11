import React, { useState, useEffect } from 'react';
import { SectionTitle, Card, Button } from '../components/UIComponents';
import { Calendar, Tag } from 'lucide-react';
import { getBlogPosts } from '../utils/blogStorage';
import { BlogPost } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { createSlug } from '../utils/slug';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getBlogPosts().then(setPosts);
  }, [location]);

  // 提取所有 categories 和 tags
  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category).filter(Boolean) as string[]))];
  const tags = Array.from(new Set(posts.flatMap(p => p.tags)));

  // 根據 filter 過濾文章
  const filteredPosts = filter === 'All' 
    ? posts 
    : posts.filter(post => post.category === filter || post.tags.includes(filter));

  return (
    <div className="pt-32 pb-24 animate-fade-in bg-paper">
      <div className="container mx-auto px-6">
        <SectionTitle title="命運專題" subtitle="Destiny & Wisdom" />

        {/* 過濾器 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('All')}
            className={`px-4 py-2 text-xs md:text-sm uppercase tracking-widest transition-colors border ${
              filter === 'All' 
                ? 'bg-black text-white border-black' 
                : 'bg-transparent text-gray-500 border-gray-200 hover:border-black'
            }`}
          >
            全部
          </button>
          {categories.slice(1).map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 text-xs md:text-sm uppercase tracking-widest transition-colors border ${
                filter === category 
                  ? 'bg-black text-white border-black' 
                  : 'bg-transparent text-gray-500 border-gray-200 hover:border-black'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post, index) => (
            <div 
              key={post.id} 
              className="bg-white group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
              onClick={() => navigate(`/blog/${createSlug(post.title)}`)}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {post.category && (
                  <div className="absolute bottom-0 left-0 bg-black text-white text-xs px-3 py-1">
                    {post.category}
                  </div>
                )}
                {!post.category && post.tags.length > 0 && (
                  <div className="absolute bottom-0 left-0 bg-black text-white text-xs px-3 py-1">
                    {post.tags[0]}
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4 uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                  {post.category && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span>{post.category}</span>
                    </>
                  )}
                </div>
                
                <h3 className="text-xl font-serif mb-4 leading-snug group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                   {post.tags.map(tag => (
                     <span key={tag} className="text-[10px] border border-gray-200 px-2 py-1 text-gray-500 rounded-full">#{tag}</span>
                   ))}
                </div>
              </div>
            </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg mb-2">暫無文章</p>
            <p className="text-sm">此分類下目前沒有可用的文章</p>
          </div>
        )}

        <div className="text-center mt-16">
          <p className="text-gray-500 italic mb-6">想了解更多玄學知識？</p>
          <Button variant="outline">訂閱電子報</Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;