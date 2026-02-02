import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from './UIComponents';

interface ImageUploadProps {
  value: string; // 當前圖片 URL
  onChange: (url: string) => void; // 當圖片上傳成功後調用
  type?: 'service' | 'course' | 'general'; // 圖片類型，用於文件命名
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  value, 
  onChange, 
  type = 'general',
  className = '' 
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 同步外部 value 變化到內部 preview
  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  // 獲取 API Base URL
  const getApiBaseUrl = (): string => {
    const envApiUrl = import.meta.env.VITE_API_BASE_URL;
    if (envApiUrl && envApiUrl.trim() !== '' && envApiUrl !== 'undefined') {
      if (envApiUrl.startsWith('http')) {
        return envApiUrl.endsWith('/api') ? envApiUrl : `${envApiUrl}/api`;
      }
      return envApiUrl;
    }
    return '/api';
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 驗證文件類型
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('只允許上傳圖片文件 (JPEG, JPG, PNG, GIF, WEBP)');
      return;
    }

    // 驗證文件大小 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('圖片大小不能超過 10MB');
      return;
    }

    // 顯示預覽
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // 上傳文件
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', type);

      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/upload-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '上傳失敗');
      }

      const data = await response.json();
      if (data.success && data.imageUrl) {
        onChange(data.imageUrl);
        setPreview(data.imageUrl);
      } else {
        throw new Error('上傳失敗：服務器未返回圖片 URL');
      }
    } catch (error) {
      console.error('圖片上傳錯誤:', error);
      alert(error instanceof Error ? error.message : '圖片上傳失敗，請稍後再試');
      setPreview(value || null);
    } finally {
      setUploading(false);
      // 重置 file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-2">圖片</label>
      
      <div className="space-y-3">
        {/* 預覽區域 */}
        {preview && (
          <div className="relative w-full h-48 border-2 border-greenLight rounded-lg overflow-hidden bg-paper">
            <img
              src={preview}
              alt="預覽"
              className="w-full h-full object-cover"
              onError={() => {
                // 如果圖片加載失敗，顯示占位符
                setPreview(null);
              }}
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 上傳按鈕 */}
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <Button
            type="button"
            variant="outline"
            onClick={handleClick}
            disabled={uploading}
            className="flex items-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                上傳中...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                {preview ? '更換圖片' : '上傳圖片'}
              </>
            )}
          </Button>

          {preview && (
            <span className="text-xs text-secondary/70">
              點擊「更換圖片」可重新上傳
            </span>
          )}
        </div>

        {/* URL 輸入框（手動輸入） */}
        <div>
          <label className="block text-xs text-secondary/70 mb-1">
            或直接輸入圖片 URL
          </label>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => {
              onChange(e.target.value);
              setPreview(e.target.value || null);
            }}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 text-sm border-2 border-greenLight rounded focus:outline-none focus:border-accent"
          />
        </div>

        {preview && (
          <p className="text-xs text-secondary/60">
            當前圖片: {preview}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
