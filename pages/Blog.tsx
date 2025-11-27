import React from 'react';
import { SectionTitle, Card, Button } from '../components/UIComponents';
import { BLOG_POSTS } from '../data';
import { Calendar, Tag } from 'lucide-react';

const Blog = () => {
  return (
    <div className="pt-32 pb-24 animate-fade-in bg-paper">
      <div className="container mx-auto px-6">
        <SectionTitle title="命運專題" subtitle="Destiny & Wisdom" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map((post, index) => (
            <div key={post.id} className="bg-white group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 bg-black text-white text-xs px-3 py-1">
                  {post.tags[0]}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4 uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  {post.date}
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

        <div className="text-center mt-16">
          <p className="text-gray-500 italic mb-6">想了解更多玄學知識？</p>
          <Button variant="outline">訂閱電子報</Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;