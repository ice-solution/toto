import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { getBlogPosts } from '../utils/blogStorage';
import { findPostBySlug } from '../utils/slug';
import { BlogPost } from '../types';
import { Button } from '../components/UIComponents';

const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      const posts = await getBlogPosts();
      if (slug) {
        const foundPost = findPostBySlug(posts, slug);
        if (foundPost) {
          setPost(foundPost);
        }
      }
      setIsLoading(false);
    };
    loadPost();
  }, [slug]);

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {
        // 如果分享失敗，複製鏈接到剪貼板
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('鏈接已複製到剪貼板！');
    }).catch(() => {
      alert('無法複製鏈接，請手動複製：' + window.location.href);
    });
  };

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-paper">
        <div className="container mx-auto px-6">
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg mb-2">載入中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-paper">
        <div className="container mx-auto px-6">
          <div className="text-center py-16">
            <h1 className="text-2xl font-serif mb-4">文章不存在</h1>
            <p className="text-gray-500 mb-6">找不到您要查看的文章</p>
            <Link to="/blog">
              <Button variant="outline">返回文章列表</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-paper animate-fade-in">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* 返回按鈕 */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">返回文章列表</span>
          </button>
        </div>

        {/* 文章圖片 */}
        <div className="relative h-96 mb-8 overflow-hidden rounded-lg">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          {post.category && (
            <div className="absolute bottom-4 left-4 bg-black text-white text-sm px-4 py-2">
              {post.category}
            </div>
          )}
        </div>

        {/* 文章標題 */}
        <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
          {post.title}
        </h1>

        {/* 文章元信息 */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          {post.category && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Tag className="w-4 h-4" />
              <span>{post.category}</span>
            </div>
          )}
          <button
            onClick={handleShare}
            className="ml-auto flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>分享</span>
          </button>
        </div>

        {/* 文章摘要 */}
        {post.excerpt && (
          <div className="mb-8 p-6 bg-gray-50 border-l-4 border-black">
            <p className="text-lg text-gray-700 leading-relaxed italic">
              {post.excerpt}
            </p>
          </div>
        )}

        {/* 文章內容 */}
        <div 
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* 標籤 */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span 
                  key={tag} 
                  className="text-xs border border-gray-200 px-3 py-1 text-gray-500 rounded-full hover:border-black hover:text-black transition-colors cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 返回按鈕 */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">返回文章列表</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;

