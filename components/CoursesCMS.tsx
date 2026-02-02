import React, { useState, useEffect } from 'react';
import { Button, Card } from './UIComponents';
import { Plus, Edit, Trash, Save, X } from 'lucide-react';
import { CourseItem } from '../types';
import ImageUpload from './ImageUpload';

interface CoursesCMSProps {
  courses: CourseItem[];
  onSave: (course: CourseItem) => void;
  onDelete: (id: string) => void;
}

const CoursesCMS: React.FC<CoursesCMSProps> = ({ courses, onSave, onDelete }) => {
  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    level: '',
    description: '',
    imageUrl: '',
    instagramUrl: '',
  });

  const handleCreate = () => {
    setIsCreating(true);
    setEditingCourse(null);
    setFormData({
      name: '',
      price: '',
      duration: '',
      level: '',
      description: '',
      imageUrl: '',
      instagramUrl: '',
    });
  };

  const handleEdit = (course: CourseItem) => {
    setEditingCourse(course);
    setIsCreating(false);
    setFormData({
      name: course.name,
      price: String(course.price),
      duration: course.duration,
      level: course.level,
      description: course.description,
      imageUrl: course.imageUrl,
      instagramUrl: course.instagramUrl || '',
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingCourse(null);
    setFormData({
      name: '',
      price: '',
      duration: '',
      level: '',
      description: '',
      imageUrl: '',
      instagramUrl: '',
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.description) {
      alert('請填寫名稱和描述');
      return;
    }

    const priceValue = formData.price.trim() === '' ? 0 : (isNaN(Number(formData.price)) ? formData.price : Number(formData.price));

    const course: CourseItem = {
      id: editingCourse?.id || `course-${Date.now()}`,
      name: formData.name,
      price: priceValue,
      duration: formData.duration,
      level: formData.level,
      description: formData.description,
      imageUrl: formData.imageUrl || 'https://picsum.photos/400/400',
      instagramUrl: formData.instagramUrl || undefined,
    };

    onSave(course);
    handleCancel();
  };

  return (
    <div className="space-y-6">
      {/* 課程列表或編輯表單 */}
      {(isCreating || editingCourse) ? (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">
              {isCreating ? '創建新課程' : '編輯課程'}
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
                placeholder="輸入課程名稱"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">價錢</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  placeholder="輸入價錢"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">時長</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  placeholder="例如：兩天"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">級別</label>
                <input
                  type="text"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  placeholder="例如：入門"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">描述 *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                rows={4}
                placeholder="輸入課程描述"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <ImageUpload
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                type="course"
              />

              <div>
                <label className="block text-sm font-medium mb-2">Instagram URL</label>
                <input
                  type="text"
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-greenLight rounded focus:outline-none focus:border-accent"
                  placeholder="輸入 Instagram URL"
                />
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
            <h3 className="text-lg font-bold">課程列表 ({courses && Array.isArray(courses) ? courses.length : 0})</h3>
            <Button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2 text-xs">
              <Plus className="w-4 h-4" /> 創建新課程
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {courses && Array.isArray(courses) && courses.map(course => (
              <Card key={course.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold">{course.name}</h4>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {course.level}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {course.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>
                    <div className="text-sm">
                      <span className="font-medium">價錢: HK${course.price}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(course)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('確定要刪除此課程嗎？')) {
                          onDelete(course.id);
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
            {(!courses || !Array.isArray(courses) || courses.length === 0) && (
              <Card className="p-12 text-center text-gray-400">
                <p>暫無課程，點擊「創建新課程」開始</p>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesCMS;

