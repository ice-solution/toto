import React, { useState } from 'react';
import { SectionTitle, Button, Card } from '../components/UIComponents';
import { SERVICES, COURSES, PRODUCTS } from '../data';
import { Users, ShoppingCart, FileText, Settings, Plus, Edit, Trash } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('services');

  const renderContent = () => {
    switch(activeTab) {
      case 'services':
        return (
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Manage Services</h3>
              <Button className="py-2 px-4 text-xs flex items-center gap-2"><Plus className="w-3 h-3"/> Add New</Button>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SERVICES.map(s => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium">{s.name}</td>
                    <td className="p-4 text-gray-500">{s.category}</td>
                    <td className="p-4">HK${s.price}</td>
                    <td className="p-4 flex gap-2">
                      <button className="text-blue-500 hover:text-blue-700"><Edit className="w-4 h-4" /></button>
                      <button className="text-red-500 hover:text-red-700"><Trash className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'courses':
        return (
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Manage Courses</h3>
              <Button className="py-2 px-4 text-xs flex items-center gap-2"><Plus className="w-3 h-3"/> Add New</Button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {COURSES.map(c => (
                <div key={c.id} className="flex justify-between items-center p-4 border border-gray-100 rounded bg-white">
                  <div>
                    <h4 className="font-bold">{c.name}</h4>
                    <p className="text-xs text-gray-500">{c.level} | {c.duration}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">HK${c.price}</span>
                    <button className="text-blue-500"><Edit className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
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
             <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </header>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;