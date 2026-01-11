import { CourseItem } from '../types';

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

// 從 API 讀取 Courses
export const getCourses = async (): Promise<CourseItem[]> => {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/courses`);
    if (!response.ok) {
      throw new Error('Failed to load courses');
    }
    const data = await response.json();
    return data as CourseItem[];
  } catch (error) {
    console.error('Error reading courses from API:', error);
    return [];
  }
};

// 保存 Courses 到 JSON 文件（通過 API）
export const saveCourses = async (courses: CourseItem[]): Promise<boolean> => {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courses),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save courses');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving courses to courses.json:', error);
    return false;
  }
};

// 添加或更新 Course
export const saveCourse = async (course: CourseItem): Promise<boolean> => {
  const courses = await getCourses();
  const existingIndex = courses.findIndex(c => c.id === course.id);
  
  if (existingIndex >= 0) {
    courses[existingIndex] = course;
  } else {
    courses.push(course);
  }
  
  return await saveCourses(courses);
};

// 刪除 Course
export const deleteCourse = async (id: string): Promise<boolean> => {
  const courses = await getCourses();
  const filtered = courses.filter(c => c.id !== id);
  return await saveCourses(filtered);
};

// 根據 ID 獲取單個 Course
export const getCourseById = async (id: string): Promise<CourseItem | undefined> => {
  const courses = await getCourses();
  return courses.find(c => c.id === id);
};

