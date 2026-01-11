import React, { useState, useEffect } from 'react';
import { Button, Card } from './UIComponents';
import { Plus, Edit, Trash, Save, X, Tag as TagIcon, Folder } from 'lucide-react';
import { ServiceItem } from '../types';
import { getServices, saveService, deleteService } from '../utils/servicesStorage';

interface ServicesCMSProps {
  services: ServiceItem[];
  onSave: (service: ServiceItem) => void;
  onDelete: (id: string) => void;
}

const ServicesCMS: React.FC<ServicesCMSProps> = ({ services, onSave, onDelete }) => {
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    imageUrl: '',
    instagramUrl: '',
    tags: [] as string[],
  });

  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');

  // 從現有 services 中提取所有 categories 和 tags
  useEffect(() => {
    if (!services || !Array.isArray(services)) return;
    
    const allCategories = new Set<string>();
    const allTags = new Set<string>();
    
    services.forEach(service => {
      if (service.category) allCategories.add(service.category);
      if (service.tags && Array.isArray(service.tags)) {
        service.tags.forEach(tag => allTags.add(tag));
      }
    });
    
    setCategories(Array.from(allCategories));
    setTags(Array.from(allTags));
  }, [services]);

  const handleCreate = () => {
    setIsCreating(true);
    setEditingService(null);
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      imageUrl: '',
      instagramUrl: '',
      tags: [],
    });
  };

  const handleEdit = (service: ServiceItem) => {
    setEditingService(service);
    setIsCreating(false);
    setFormData({
      name: service.name,
      price: String(service.price),
      category: service.category,
      description: service.description,
      imageUrl: service.imageUrl,
      instagramUrl: service.instagramUrl || '',
      tags: service.tags || [],
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingService(null);
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      imageUrl: '',
      instagramUrl: '',
      tags: [],
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.description) {
      alert('請填寫名稱和描述');
      return;
    }

    const priceValue = formData.price.trim() === '' ? 0 : (isNaN(Number(formData.price)) ? formData.price : Number(formData.price));

    const service: ServiceItem = {
      id: editingService?.id || `service-${Date.now()}`,
      name: formData.name,
      price: priceValue,
      category: formData.category,
      description: formData.description,
      imageUrl: formData.imageUrl || 'https://picsum.photos/400/400',
      tags: formData.tags,
      instagramUrl: formData.instagramUrl || undefined,
    };

    onSave(service);
    handleCancel();
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (category: string) => {
    setCategories(categories.filter(c => c !== category));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleDeleteTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
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

      {/* 服務列表或編輯表單 */}
      {(isCreating || editingService) ? (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">
              {isCreating ? '創建新服務' : '編輯服務'}
            </h3>
            <Button variant="outline" onClick={handleCancel} className="px-4 py-2 text-xs">
              <X className="w-4 h-4" /> 取消
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">名稱 *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="輸入服務名稱"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">價錢</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  placeholder="輸入價錢或「請查詢」"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">分類</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                >
                  <option value="">選擇分類</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">描述 *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                rows={4}
                placeholder="輸入服務描述"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">圖片 URL</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  placeholder="輸入圖片 URL"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Instagram URL</label>
                <input
                  type="text"
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  placeholder="輸入 Instagram URL"
                />
              </div>
            </div>

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

            <div className="flex justify-end gap-4 pt-4">
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
            <h3 className="text-lg font-bold">服務列表 ({services && Array.isArray(services) ? services.length : 0})</h3>
            <Button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2 text-xs">
              <Plus className="w-4 h-4" /> 創建新服務
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {services && Array.isArray(services) && services.map(service => (
              <Card key={service.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold">{service.name}</h4>
                      {service.category && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {service.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{service.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-medium">價錢: HK${service.price}</span>
                    </div>
                    {service.tags && Array.isArray(service.tags) && service.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {service.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('確定要刪除此服務嗎？')) {
                          onDelete(service.id);
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
            {(!services || !Array.isArray(services) || services.length === 0) && (
              <Card className="p-12 text-center text-gray-400">
                <p>暫無服務，點擊「創建新服務」開始</p>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ServicesCMS;

