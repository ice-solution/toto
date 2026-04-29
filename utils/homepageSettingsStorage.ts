// 首頁設置存儲工具

export interface HomepageSettings {
  featuredServiceIds: string[]; // 精選服務的 ID 列表
}

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

// 從 API 讀取首頁設置
export const getHomepageSettings = async (): Promise<HomepageSettings> => {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/homepage-settings`);
    if (!response.ok) {
      throw new Error('Failed to load homepage settings');
    }
    const data = await response.json();
    return data as HomepageSettings;
  } catch (error) {
    console.error('Error reading homepage settings from API:', error);
    // 返回默認值
    return { featuredServiceIds: [] };
  }
};

// 保存首頁設置到 JSON 文件（通過 API）
export const saveHomepageSettings = async (settings: HomepageSettings): Promise<boolean> => {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/homepage-settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save homepage settings');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving homepage settings:', error);
    return false;
  }
};
