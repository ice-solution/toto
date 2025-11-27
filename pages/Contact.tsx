import React from 'react';
import { SectionTitle, Button } from '../components/UIComponents';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-24 animate-fade-in">
      <div className="container mx-auto px-6">
        <SectionTitle title="聯絡我們" subtitle="Get in Touch" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-serif mb-6">訪客資訊</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                無論是預約諮詢、課程報名，或是商業合作，歡迎隨時與我們聯繫。我們的團隊會盡快回覆您的查詢。
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <MapPin className="w-5 h-5 text-accent mt-1" />
                   <div>
                     <p className="font-bold text-sm uppercase tracking-widest mb-1">Address</p>
                     <p className="text-gray-600">香港觀塘某商業大廈 (預約後提供詳細地址)</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <Phone className="w-5 h-5 text-accent mt-1" />
                   <div>
                     <p className="font-bold text-sm uppercase tracking-widest mb-1">Phone</p>
                     <p className="text-gray-600">+852 1234 5678</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <Mail className="w-5 h-5 text-accent mt-1" />
                   <div>
                     <p className="font-bold text-sm uppercase tracking-widest mb-1">Email</p>
                     <p className="text-gray-600">contact@masterdu.hk</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-paper p-8">
               <h4 className="font-bold text-sm uppercase tracking-widest mb-4">服務時間</h4>
               <div className="flex justify-between text-sm text-gray-600 mb-2">
                 <span>週一至週五</span>
                 <span>10:00 - 19:00</span>
               </div>
               <div className="flex justify-between text-sm text-gray-600">
                 <span>週六及週日</span>
                 <span>12:00 - 18:00 (敬請預約)</span>
               </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-12 border border-gray-200 shadow-lg">
             <h3 className="text-xl font-serif mb-8">發送訊息</h3>
             <form className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-xs uppercase tracking-widest text-gray-500">姓名</label>
                   <input type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs uppercase tracking-widest text-gray-500">電話</label>
                   <input type="tel" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent" />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs uppercase tracking-widest text-gray-500">電郵</label>
                 <input type="email" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs uppercase tracking-widest text-gray-500">查詢事項</label>
                 <select className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-gray-600">
                   <option>預約玄學服務</option>
                   <option>報名靈修課程</option>
                   <option>會員制度查詢</option>
                   <option>商業合作</option>
                   <option>其他</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-xs uppercase tracking-widest text-gray-500">訊息內容</label>
                 <textarea rows={4} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent resize-none"></textarea>
               </div>

               <Button className="w-full mt-4">提交查詢</Button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
