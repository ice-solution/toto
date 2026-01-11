import React, { useState, useEffect, useMemo } from 'react';
import { Button, Card } from './UIComponents';
import { Plus, Edit, Trash, Save, X, Tag as TagIcon, Folder } from 'lucide-react';
import { BlogPost } from '../types';
import QuillEditor from './QuillEditor';
import { getBlogCategories, saveBlogCategories, getBlogTags, saveBlogTags } from '../utils/blogStorage';

interface BlogCMSProps {
  posts: BlogPost[];
  onSave: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

const BlogCMS: React.FC<BlogCMSProps> = ({ posts, onSave, onDelete }) => {
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    category: '',
    tags: [] as string[],
  });

  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');

  // 從 JSON 文件載入 categories 和 tags
  useEffect(() => {
    const loadData = async () => {
      const [categoriesData, tagsData] = await Promise.all([
        getBlogCategories(),
        getBlogTags()
      ]);
      setCategories(categoriesData);
      setTags(tagsData);
    };
    loadData();
  }, []);

  // 從現有 posts 中提取所有 categories 和 tags
  useEffect(() => {
    if (!posts || !Array.isArray(posts)) return;
    
    const allCategories = new Set<string>();
    const allTags = new Set<string>();
    
    posts.forEach(post => {
      if (post.category) allCategories.add(post.category);
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => allTags.add(tag));
      }
    });
    
    setCategories(prev => {
      const combined = new Set([...prev, ...Array.from(allCategories)]);
      return Array.from(combined);
    });
    
    setTags(prev => {
      const combined = new Set([...prev, ...Array.from(allTags)]);
      return Array.from(combined);
    });
  }, [posts]);

  // Quill 編輯器配置
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'link', 'image'
  ];

  const handleCreate = () => {
    setIsCreating(true);
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      imageUrl: '',
      category: '',
      tags: [],
    });
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreating(false);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl,
      category: post.category || '',
      tags: post.tags || [],
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      imageUrl: '',
      category: '',
      tags: [],
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      alert('請填寫標題和內容');
      return;
    }

    const post: BlogPost = {
      id: editingPost?.id || `post-${Date.now()}`,
      title: formData.title,
      excerpt: formData.excerpt || formData.content.substring(0, 150),
      content: formData.content,
      imageUrl: formData.imageUrl || 'https://picsum.photos/800/400',
      date: editingPost?.date || new Date().toISOString().split('T')[0],
      tags: formData.tags,
      category: formData.category || undefined,
    };

    onSave(post);
    handleCancel();
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updated = [...categories, newCategory.trim()];
      setCategories(updated);
      await saveBlogCategories(updated);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = async (category: string) => {
    const updated = categories.filter(c => c !== category);
    setCategories(updated);
    await saveBlogCategories(updated);
  };

  const handleAddTag = async () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updated = [...tags, newTag.trim()];
      setTags(updated);
      await saveBlogTags(updated);
      setNewTag('');
    }
  };

  const handleDeleteTag = async (tag: string) => {
    const updated = tags.filter(t => t !== tag);
    setTags(updated);
    await saveBlogTags(updated);
  };

  const handleToggleTag = (tag: string) => {
    if (formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
    } else {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  return (
    <div className="space-y-6">
      {/* 分類和標籤管理 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 分類管理 */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Folder className="w-5 h-5" />
            <h3 className="text-lg font-bold">分類管理</h3>
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
              placeholder="輸入新分類名稱"
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
            />
            <Button onClick={handleAddCategory} className="px-4 py-2 text-xs">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <span
                key={category}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {category}
                <button
                  onClick={() => handleDeleteCategory(category)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </Card>

        {/* 標籤管理 */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TagIcon className="w-5 h-5" />
            <h3 className="text-lg font-bold">標籤管理</h3>
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="輸入新標籤名稱"
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
            />
            <Button onClick={handleAddTag} className="px-4 py-2 text-xs">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {tag}
                <button
                  onClick={() => handleDeleteTag(tag)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* 文章列表或編輯表單 */}
      {(isCreating || editingPost) ? (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">
              {isCreating ? '創建新文章' : '編輯文章'}
            </h3>
            <Button variant="outline" onClick={handleCancel} className="px-4 py-2 text-xs">
              <X className="w-4 h-4" /> 取消
            </Button>
          </div>

          <div className="space-y-6">
            {/* 標題 */}
            <div>
              <label className="block text-sm font-medium mb-2">標題 *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="輸入文章標題"
              />
            </div>

            {/* 摘要 */}
            <div>
              <label className="block text-sm font-medium mb-2">摘要</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                rows={3}
                placeholder="輸入文章摘要（如不填寫，將自動從內容中提取）"
              />
            </div>

            {/* 分類選擇 */}
            <div>
              <label className="block text-sm font-medium mb-2">分類</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              >
                <option value="">選擇分類</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* 標籤選擇 */}
            <div>
              <label className="block text-sm font-medium mb-2">標籤</label>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleToggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs transition-colors ${
                      formData.tags.includes(tag)
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 圖片 URL */}
            <div>
              <label className="block text-sm font-medium mb-2">圖片 URL</label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="輸入圖片 URL（如不填寫，將使用預設圖片）"
              />
              {formData.imageUrl && (
                <img src={formData.imageUrl} alt="Preview" className="mt-2 max-w-xs rounded" />
              )}
            </div>

            {/* WYSIWYG 編輯器 */}
            <div>
              <label className="block text-sm font-medium mb-2">內容 *</label>
              <div className="border border-gray-300 rounded">
                <QuillEditor
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="輸入文章內容..."
                  className="bg-white"
                />
              </div>
            </div>

            {/* 保存按鈕 */}
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={handleCancel}>取消</Button>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="w-4 h-4" /> 保存
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">文章列表 ({posts && Array.isArray(posts) ? posts.length : 0})</h3>
            <Button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2 text-xs">
              <Plus className="w-4 h-4" /> 創建新文章
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {posts && Array.isArray(posts) && posts.map(post => (
              <Card key={post.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold">{post.title}</h4>
                      {post.category && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {post.category}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">{post.date}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{post.excerpt}</p>
                    {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('確定要刪除此文章嗎？')) {
                          onDelete(post.id);
                        }
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
            {(!posts || !Array.isArray(posts) || posts.length === 0) && (
              <Card className="p-12 text-center text-gray-400">
                <p>暫無文章，點擊「創建新文章」開始</p>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogCMS;

