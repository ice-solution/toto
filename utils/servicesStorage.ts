import { ServiceItem } from '../types';

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

// 從 API 讀取 Services
export const getServices = async (): Promise<ServiceItem[]> => {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/services`);
    if (!response.ok) {
      throw new Error('Failed to load services');
    }
    const data = await response.json();
    return data as ServiceItem[];
  } catch (error) {
    console.error('Error reading services from API:', error);
    return [];
  }
};

// 保存 Services 到 JSON 文件（通過 API）
export const saveServices = async (services: ServiceItem[]): Promise<boolean> => {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(services),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save services');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving services to services.json:', error);
    return false;
  }
};

// 添加或更新 Service
export const saveService = async (service: ServiceItem): Promise<boolean> => {
  const services = await getServices();
  const existingIndex = services.findIndex(s => s.id === service.id);
  
  if (existingIndex >= 0) {
    services[existingIndex] = service;
  } else {
    services.push(service);
  }
  
  return await saveServices(services);
};

// 刪除 Service
export const deleteService = async (id: string): Promise<boolean> => {
  const services = await getServices();
  const filtered = services.filter(s => s.id !== id);
  return await saveServices(filtered);
};

// 根據 ID 獲取單個 Service
export const getServiceById = async (id: string): Promise<ServiceItem | undefined> => {
  const services = await getServices();
  return services.find(s => s.id === id);
};

