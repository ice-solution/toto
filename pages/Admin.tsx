import React, { useState, useEffect } from 'react';
import { SectionTitle, Button, Card } from '../components/UIComponents';
import { SERVICES, COURSES, PRODUCTS } from '../data';
import { Users, ShoppingCart, FileText, Settings, Plus, Edit, Trash, BookOpen, LogOut, UserCheck } from 'lucide-react';
import BlogCMS from '../components/BlogCMS';
import ServicesCMS from '../components/ServicesCMS';
import CoursesCMS from '../components/CoursesCMS';
import MembershipCMS from '../components/MembershipCMS';
import AdminLogin from '../components/AdminLogin';
import { BlogPost, ServiceItem, CourseItem, MembershipApplication } from '../types';
import { getBlogPosts, saveBlogPost, deleteBlogPost } from '../utils/blogStorage';
import { getServices, saveService, deleteService } from '../utils/servicesStorage';
import { getCourses, saveCourse, deleteCourse } from '../utils/coursesStorage';
import { getMemberships, saveMembership, deleteMembership } from '../utils/membershipsStorage';

const AUTH_STORAGE_KEY = 'adminAuth';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('blog');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [memberships, setMemberships] = useState<MembershipApplication[]>([]);

  // 檢查是否已登入
  useEffect(() => {
    const authStatus = localStorage.getItem(AUTH_STORAGE_KEY);
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // 驗證登入
  const handleLogin = (username: string, password: string): boolean => {
    // 從環境變量讀取（在 vite.config.ts 中已設置默認值）
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (username === adminUsername && password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      return true;
    }
    return false;
  };

  // 登出
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  // 載入 Blog 文章
  const loadBlogPosts = async () => {
    const posts = await getBlogPosts();
    setBlogPosts(posts);
  };

  // 載入 Services
  const loadServices = async () => {
    const servicesData = await getServices();
    setServices(servicesData);
  };

  // 載入 Courses
  const loadCourses = async () => {
    const coursesData = await getCourses();
    setCourses(coursesData);
  };

  // 載入 Memberships
  const loadMemberships = async () => {
    const membershipsData = await getMemberships();
    setMemberships(membershipsData);
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    
    if (activeTab === 'blog') {
      loadBlogPosts();
    } else if (activeTab === 'services') {
      loadServices();
    } else if (activeTab === 'courses') {
      loadCourses();
    } else if (activeTab === 'memberships') {
      loadMemberships();
    }
  }, [activeTab, isAuthenticated]);

  // 如果未登入，顯示登入界面
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const handleBlogSave = async (post: BlogPost) => {
    await saveBlogPost(post);
    await loadBlogPosts();
  };

  const handleBlogDelete = async (id: string) => {
    await deleteBlogPost(id);
    await loadBlogPosts();
  };

  const handleServiceSave = async (service: ServiceItem) => {
    await saveService(service);
    await loadServices();
  };

  const handleServiceDelete = async (id: string) => {
    await deleteService(id);
    await loadServices();
  };

  const handleCourseSave = async (course: CourseItem) => {
    await saveCourse(course);
    await loadCourses();
  };

  const handleCourseDelete = async (id: string) => {
    await deleteCourse(id);
    await loadCourses();
  };

  const handleMembershipSave = async (membership: MembershipApplication) => {
    await saveMembership(membership);
    await loadMemberships();
  };

  const handleMembershipDelete = async (id: string) => {
    await deleteMembership(id);
    await loadMemberships();
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'blog':
        return (
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <BlogCMS 
              posts={blogPosts}
              onSave={handleBlogSave}
              onDelete={handleBlogDelete}
            />
          </div>
        );
      case 'services':
        return (
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <ServicesCMS
              services={services}
              onSave={handleServiceSave}
              onDelete={handleServiceDelete}
            />
          </div>
        );
      case 'courses':
        return (
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <CoursesCMS
              courses={courses}
              onSave={handleCourseSave}
              onDelete={handleCourseDelete}
            />
          </div>
        );
      case 'memberships':
        return (
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <MembershipCMS
              memberships={memberships}
              onSave={handleMembershipSave}
              onDelete={handleMembershipDelete}
            />
          </div>
        );
      default:
        return <div className="p-12 text-center text-gray-500">Feature coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-6 hidden md:block">
        <h2 className="text-xl font-serif tracking-widest mb-10">MASTER CMS</h2>
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left p-3 rounded flex items-center gap-3 hover:bg-gray-900 ${activeTab === 'dashboard' ? 'bg-gray-800' : ''}`}
          >
            <Users className="w-4 h-4" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className={`w-full text-left p-3 rounded flex items-center gap-3 hover:bg-gray-900 ${activeTab === 'blog' ? 'bg-gray-800' : ''}`}
          >
            <BookOpen className="w-4 h-4" /> 命運專題
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full text-left p-3 rounded flex items-center gap-3 hover:bg-gray-900 ${activeTab === 'services' ? 'bg-gray-800' : ''}`}
          >
            <FileText className="w-4 h-4" /> Services
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={`w-full text-left p-3 rounded flex items-center gap-3 hover:bg-gray-900 ${activeTab === 'courses' ? 'bg-gray-800' : ''}`}
          >
            <FileText className="w-4 h-4" /> Courses
          </button>
          <button 
            onClick={() => setActiveTab('memberships')}
            className={`w-full text-left p-3 rounded flex items-center gap-3 hover:bg-gray-900 ${activeTab === 'memberships' ? 'bg-gray-800' : ''}`}
          >
            <UserCheck className="w-4 h-4" /> Memberships
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full text-left p-3 rounded flex items-center gap-3 hover:bg-gray-900 ${activeTab === 'products' ? 'bg-gray-800' : ''}`}
          >
            <ShoppingCart className="w-4 h-4" /> Products
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left p-3 rounded flex items-center gap-3 hover:bg-gray-900 ${activeTab === 'settings' ? 'bg-gray-800' : ''}`}
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold uppercase tracking-widest">{activeTab}</h1>
          <div className="flex items-center gap-4">
             <span className="text-sm text-gray-500">Admin User</span>
             <button
               onClick={handleLogout}
               className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-black transition-colors"
             >
               <LogOut className="w-4 h-4" />
               登出
             </button>
             <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </header>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;