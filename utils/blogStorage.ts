import { BlogPost } from '../types';

// 獲取 API Base URL
const getApiBaseUrl = (): string => {
  // 如果環境變量設置了 VITE_API_BASE_URL，使用它（用於生產環境）
  const envApiUrl = import.meta.env.VITE_API_BASE_URL;
  if (envApiUrl && envApiUrl.trim() !== '' && envApiUrl !== 'undefined') {
    // 如果是完整 URL，確保包含 /api 前綴
    if (envApiUrl.startsWith('http')) {
      return envApiUrl.endsWith('/api') ? envApiUrl : `${envApiUrl}/api`;
    }
    // 如果是相對路徑，直接返回
    return envApiUrl;
  }
  // 開發環境默認使用相對路徑（通過 Vite proxy）
  return '/api';
};

// 從 API 讀取 Blog 文章
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/blog`);
    if (!response.ok) {
      throw new Error('Failed to load blog posts');
    }
    const data = await response.json();
    return data as BlogPost[];
  } catch (error) {
    console.error('Error reading blog posts from API:', error);
    return [];
  }
};

// 同步版本（用於兼容現有代碼）
export const getBlogPostsSync = (): BlogPost[] => {
  // 這個函數保留用於向後兼容，但實際上會返回空數組
  // 建議使用異步版本 getBlogPosts()
  console.warn('getBlogPostsSync is deprecated, use getBlogPosts() instead');
  return [];
};

// 保存 Blog 文章到 JSON 文件（通過 API）
export const saveBlogPosts = async (posts: BlogPost[]): Promise<boolean> => {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(posts),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save blog posts');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving blog posts to blog.json:', error);
    return false;
  }
};

// 添加或更新 Blog 文章
export const saveBlogPost = async (post: BlogPost): Promise<boolean> => {
  const posts = await getBlogPosts();
  const existingIndex = posts.findIndex(p => p.id === post.id);
  
  if (existingIndex >= 0) {
    // 更新現有文章
    posts[existingIndex] = post;
  } else {
    // 添加新文章
    posts.push(post);
  }
  
  return await saveBlogPosts(posts);
};

// 刪除 Blog 文章
export const deleteBlogPost = async (id: string): Promise<boolean> => {
  const posts = await getBlogPosts();
  const filtered = posts.filter(p => p.id !== id);
  return await saveBlogPosts(filtered);
};

// 根據 ID 獲取單個 Blog 文章
export const getBlogPostById = async (id: string): Promise<BlogPost | undefined> => {
  const posts = await getBlogPosts();
  return posts.find(p => p.id === id);
};

// 從 API 讀取 Categories
export const getBlogCategories = async (): Promise<string[]> => {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/blog/categories`);
    if (!response.ok) {
      return ['流年運程', '靈性科學', '風水']; // 默認值
    }
    const data = await response.json();
    return data as string[];
  } catch (error) {
    console.error('Error reading blog categories from API:', error);
    return ['流年運程', '靈性科學', '風水'];
  }
};

// 保存 Categories
export const saveBlogCategories = async (categories: string[]): Promise<boolean> => {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/blog/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categories),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save categories');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving blogCategories.json:', error);
    return false;
  }
};

// 從 API 讀取 Tags
export const getBlogTags = async (): Promise<string[]> => {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/blog/tags`);
    if (!response.ok) {
      return ['感情', '儀式', '靈物', '能量']; // 默認值
    }
    const data = await response.json();
    return data as string[];
  } catch (error) {
    console.error('Error reading blog tags from API:', error);
    return ['感情', '儀式', '靈物', '能量'];
  }
};

// 保存 Tags
export const saveBlogTags = async (tags: string[]): Promise<boolean> => {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/blog/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tags),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save tags');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving blogTags.json:', error);
    return false;
  }
};
