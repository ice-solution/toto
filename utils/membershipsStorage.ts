import { MembershipApplication } from '../types';

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

// 從 API 讀取 Memberships
export const getMemberships = async (): Promise<MembershipApplication[]> => {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/memberships`);
    if (!response.ok) {
      throw new Error('Failed to load memberships');
    }
    const data = await response.json();
    return data as MembershipApplication[];
  } catch (error) {
    console.error('Error reading memberships from API:', error);
    return [];
  }
};

// 保存 Memberships 到 JSON 文件（通過 API）
export const saveMemberships = async (memberships: MembershipApplication[]): Promise<boolean> => {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/memberships`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberships),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save memberships');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving memberships to API:', error);
    return false;
  }
};

// 添加或更新 Membership
export const saveMembership = async (membership: MembershipApplication): Promise<boolean> => {
  const memberships = await getMemberships();
  const existingIndex = memberships.findIndex(m => m.id === membership.id);
  
  if (existingIndex >= 0) {
    memberships[existingIndex] = { ...membership, updatedAt: new Date().toISOString() };
  } else {
    memberships.push(membership);
  }
  
  return await saveMemberships(memberships);
};

// 刪除 Membership
export const deleteMembership = async (id: string): Promise<boolean> => {
  const memberships = await getMemberships();
  const filtered = memberships.filter(m => m.id !== id);
  return await saveMemberships(filtered);
};

// 根據 ID 獲取單個 Membership
export const getMembershipById = async (id: string): Promise<MembershipApplication | undefined> => {
  const memberships = await getMemberships();
  return memberships.find(m => m.id === id);
};

