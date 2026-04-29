import React, { useState, useEffect } from 'react';
import { Button, Card } from './UIComponents';
import { Save, Home, ArrowUp, ArrowDown, X } from 'lucide-react';
import { ServiceItem } from '../types';
import { getHomepageSettings, saveHomepageSettings, HomepageSettings } from '../utils/homepageSettingsStorage';

interface HomepageSettingsCMSProps {
  services: ServiceItem[];
}

const HomepageSettingsCMS: React.FC<HomepageSettingsCMSProps> = ({ services }) => {
  const [featuredServiceIds, setFeaturedServiceIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 載入當前設置
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getHomepageSettings();
        setFeaturedServiceIds(settings.featuredServiceIds || []);
      } catch (error) {
        console.error('Error loading homepage settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSettings();
  }, []);

  // 切換服務的精選狀態
  const toggleService = (serviceId: string) => {
    setFeaturedServiceIds(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  // 移動服務順序
  const moveService = (index: number, direction: 'up' | 'down') => {
    setFeaturedServiceIds(prev => {
      const newIds = [...prev];
      if (direction === 'up' && index > 0) {
        [newIds[index], newIds[index - 1]] = [newIds[index - 1], newIds[index]];
      } else if (direction === 'down' && index < newIds.length - 1) {
        [newIds[index], newIds[index + 1]] = [newIds[index + 1], newIds[index]];
      }
      return newIds;
    });
  };

  // 移除服務
  const removeService = (serviceId: string) => {
    setFeaturedServiceIds(prev => prev.filter(id => id !== serviceId));
  };

  // 保存設置
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const settings: HomepageSettings = {
        featuredServiceIds: featuredServiceIds
      };
      const success = await saveHomepageSettings(settings);
      if (success) {
        alert('首頁設置已保存！');
      } else {
        alert('保存失敗，請稍後再試');
      }
    } catch (error) {
      console.error('Error saving homepage settings:', error);
      alert('保存時發生錯誤');
    } finally {
      setIsSaving(false);
    }
  };

  // 獲取已選中的服務
  const getFeaturedServices = () => {
    return featuredServiceIds
      .map(id => services.find(s => s.id === id))
      .filter(Boolean) as ServiceItem[];
  };

  if (isLoading) {
    return (
      <div className="text-center py-16 text-secondary/60">
        <p>載入中...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Home className="w-6 h-6 text-accent" />
        <h2 className="text-2xl font-serif">首頁精選服務設置</h2>
      </div>

      <Card className="p-6 mb-6">
        <p className="text-sm text-secondary/70 mb-4">
          選擇要在首頁「精選玄學服務」區塊顯示的服務。可以選擇多個服務，並調整顯示順序。
        </p>
        <p className="text-xs text-secondary/60">
          提示：建議選擇 3-6 個服務，過多可能會影響頁面載入速度。
        </p>
      </Card>

      {/* 已選中的服務（顯示順序） */}
      {featuredServiceIds.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 text-primary">已選中的服務（按顯示順序）</h3>
          <div className="space-y-3">
            {getFeaturedServices().map((service, index) => (
              <div 
                key={service.id} 
                className="flex items-center gap-4 p-4 bg-paper border-2 border-greenLight rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveService(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-secondary/60 hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed"
                    title="上移"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveService(index, 'down')}
                    disabled={index === featuredServiceIds.length - 1}
                    className="p-1 text-secondary/60 hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed"
                    title="下移"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-secondary/60 w-6 text-center">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-serif font-bold text-primary">{service.name}</h4>
                  <p className="text-xs text-secondary/70 line-clamp-1">{service.description}</p>
                </div>
                <button
                  onClick={() => removeService(service.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                  title="移除"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 所有服務列表 */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 text-primary">所有服務</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(service => {
            const isSelected = featuredServiceIds.includes(service.id);
            return (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'border-accent bg-greenLight/20'
                    : 'border-greenLight hover:border-accent/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-serif font-bold text-primary">{service.name}</h4>
                      {isSelected && (
                        <span className="px-2 py-0.5 bg-accent text-white text-xs rounded">
                          已選中
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-secondary/70 line-clamp-2 mb-2">{service.description}</p>
                    {service.category && (
                      <span className="inline-block px-2 py-0.5 bg-greenLight text-secondary text-xs rounded">
                        {service.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 保存按鈕 */}
      <div className="flex justify-end gap-4 pt-6">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? '保存中...' : '保存設置'}
        </Button>
      </div>

      {/* 預覽提示 */}
      {featuredServiceIds.length > 0 && (
        <Card className="p-6 bg-greenLight/20 border-2 border-accent">
          <p className="text-sm text-primary">
            <strong>預覽：</strong>首頁將顯示 {featuredServiceIds.length} 個精選服務
          </p>
          <p className="text-xs text-secondary/70 mt-2">
            保存後，請刷新首頁查看效果
          </p>
        </Card>
      )}
    </div>
  );
};

export default HomepageSettingsCMS;
