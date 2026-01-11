import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionTitle, Button } from '../components/UIComponents';
import { MEMBERSHIP_TIERS, TESTIMONIALS } from '../data';
import { Check, Star, Crown, Shield, Gift, Calendar, TrendingUp, Clock } from 'lucide-react';
import { saveMembership } from '../utils/membershipsStorage';
import { MembershipApplication } from '../types';

const Membership = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    time: '',
    tier: 'love'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedTier = MEMBERSHIP_TIERS.find(t => t.id === formData.tier);
      if (!selectedTier) {
        alert('請選擇有效的會員等級');
        setIsSubmitting(false);
        return;
      }

      const now = new Date().toISOString();
      const membership: MembershipApplication = {
        id: `membership-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        time: formData.time || undefined,
        tier: formData.tier,
        status: 'pending',
        createdAt: now,
        updatedAt: now,
      };

      const saved = await saveMembership(membership);
      
      if (!saved) {
        alert('保存會員申請失敗，請稍後再試');
        setIsSubmitting(false);
        return;
      }
      
      // 導航到付款頁面，傳遞會員申請 ID
      navigate(`/payment/${membership.id}`);
    } catch (error) {
      console.error('Error submitting membership application:', error);
      alert('提交申請時發生錯誤，請稍後再試');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 animate-fade-in bg-paper">
      <div className="container mx-auto px-6">
        <SectionTitle title="年度會員制度" subtitle="Exclusive Membership" />
        
        <p className="text-center max-w-2xl mx-auto mb-16 text-gray-600 leading-loose">
          杜乾彰師傅推出年度收費的會員制度，旨在為每一位會員提供全面的玄學服務，幫助您在生活各方面提升運氣，創造更精彩的人生。
        </p>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {MEMBERSHIP_TIERS.map((tier) => (
            <div 
              key={tier.id} 
              className={`relative bg-white border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col ${tier.id === 'the-one' ? 'bg-gradient-to-b from-gray-900 to-black text-white border-none ring-4 ring-yellow-500/30' : ''}`}
              style={{ borderTop: tier.id !== 'the-one' ? `4px solid ${tier.color}` : '' }}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-0 bg-accent text-white text-[10px] px-3 py-1 uppercase tracking-widest font-bold">
                  Most Popular
                </div>
              )}
              {tier.id === 'the-one' && (
                 <div className="absolute -top-6 left-0 w-full flex justify-center">
                   <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-black px-6 py-2 rounded-t-lg flex items-center gap-2 shadow-lg">
                     <Crown className="w-4 h-4" />
                     <span className="text-xs tracking-widest uppercase font-bold">Supreme Experience</span>
                   </div>
                 </div>
              )}
              
              <h3 className={`text-xl font-serif mb-2 text-center font-bold ${tier.id === 'the-one' ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-300' : ''}`}>{tier.name}</h3>
              <div className="text-center mb-8 mt-4">
                <span className={`text-3xl font-bold ${tier.id === 'the-one' ? 'text-yellow-100' : ''}`}>HK${tier.price.toLocaleString()}</span>
                <span className={`text-sm ${tier.id === 'the-one' ? 'text-gray-400' : 'text-gray-500'}`}> / 年</span>
              </div>
              
              <div className="flex-grow space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                  <div key={i} className={`flex items-start text-sm ${tier.id === 'the-one' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Check className={`w-4 h-4 mt-1 mr-3 flex-shrink-0 ${tier.id === 'the-one' ? 'text-yellow-400' : 'text-accent'}`} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => {
                  setFormData(prev => ({ ...prev, tier: tier.id }));
                  document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full ${tier.id === 'the-one' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500 font-bold border-none' : 'bg-black text-white'}`}
              >
                {tier.id === 'the-one' ? '申請審核' : '立即加入'}
              </Button>
            </div>
          ))}
        </div>

        {/* Detailed Policies Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          
          {/* Core Benefits */}
          <div className="bg-white p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-serif mb-6 flex items-center gap-3">
              <Shield className="w-5 h-5 text-accent" />
              年度核心權益總覽
            </h3>
            <p className="text-gray-500 text-sm mb-6">所有會員（無論等級）均享有的基本尊榮禮遇。</p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">專屬玄學日曆</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">每日透過 WhatsApp 接收個人化宜忌提示，掌握每日運勢。</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">生日月驚喜禮遇</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">生日月份可獲贈師傅加持之護身平安符乙道及法事折扣。</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">玄學急救支援</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">遇突發靈異或運勢危急狀況，享有緊急諮詢通道。</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Renewal & Upgrade */}
          <div className="bg-white p-8 border border-gray-100 shadow-sm">
             <h3 className="text-xl font-serif mb-6 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-accent" />
              續會與升級政策
            </h3>
            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-2 border-b border-gray-100 pb-2">續會優惠</h4>
                <p className="text-sm text-gray-600 leading-loose">
                  會員會籍有效期為一年。於到期前 30 天內續會，可享 <span className="font-bold text-black">95折</span> 優惠，並保留累積之會員積分。
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-2 border-b border-gray-100 pb-2">積分與升級</h4>
                <p className="text-sm text-gray-600 leading-loose mb-2">
                  每消費 HK$1 可獲 1 分。積分可用於兌換靈物或抵扣服務費用 (5000分 = HK$1)。
                </p>
                <p className="text-sm text-gray-600 leading-loose">
                  年度累積消費滿 <span className="font-bold text-black">HK$50,000</span> 或積分達標，下年度將自動升級至高一級會員，解鎖更多權益。
                </p>
              </div>
            </div>
          </div>

          {/* Priority */}
          <div className="bg-white p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-serif mb-6 flex items-center gap-3">
              <Clock className="w-5 h-5 text-accent" />
              服務預約優先權
            </h3>
            <p className="text-gray-500 text-sm mb-6">不同等級會員在預約師傅親算服務時享有不同的優先順序。</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded border-l-4 border-gray-300">
                <span className="text-sm font-bold">愛心會員</span>
                <span className="text-xs text-gray-500">標準預約 (需提前 14 天)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded border-l-4 border-[#d4c4a8]">
                <span className="text-sm font-bold">全面貼心會員</span>
                <span className="text-xs text-gray-500">優先預約 (需提前 7 天)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded border-l-4 border-[#8b5a2b]">
                <span className="text-sm font-bold">萬事俱有滔滔</span>
                <span className="text-xs text-gray-500">特快預約 (需提前 3 天)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black text-white rounded border-l-4 border-yellow-400">
                <span className="text-sm font-bold text-yellow-400">尊貴傳承</span>
                <span className="text-xs text-gray-300">隨時預約 (24小時響應)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div id="application-form" className="max-w-4xl mx-auto bg-white shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-black text-white p-8 text-center">
            <h3 className="text-2xl font-serif mb-2">立即申請加入</h3>
            <p className="text-gray-400 text-sm tracking-widest uppercase">Begin Your Spiritual Journey</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">真實姓名</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-lg" 
                  placeholder="陳大文"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">聯絡電話</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-lg" 
                  placeholder="+852 1234 5678"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">電子郵件</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-lg" 
                placeholder="example@email.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">出生日期 (新曆)</label>
                <input 
                  type="date" 
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-lg text-gray-600" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">出生時間 (選填)</label>
                <input 
                  type="time" 
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-lg text-gray-600" 
                />
                <p className="text-[10px] text-gray-400">*提供準確時間有助於師傅建立您的個人檔案</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">選擇會員等級</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {MEMBERSHIP_TIERS.map(tier => (
                  <label 
                    key={tier.id}
                    className={`border p-4 cursor-pointer transition-all duration-300 flex flex-col justify-center items-center text-center ${formData.tier === tier.id ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-400'}`}
                  >
                    <input 
                      type="radio" 
                      name="tier" 
                      value={tier.id} 
                      checked={formData.tier === tier.id} 
                      onChange={handleInputChange}
                      className="hidden" 
                    />
                    <span className="font-serif font-bold mb-1">{tier.name}</span>
                    <span className="text-xs text-gray-500">HK${tier.price.toLocaleString()}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Button type="submit" className="w-full py-4 text-lg" disabled={isSubmitting}>
                {isSubmitting ? '提交中...' : '提交申請'}
              </Button>
              <p className="text-center text-xs text-gray-400 mt-4">
                提交後將進入付款頁面，請選擇付款方式完成付款。資料僅供大師建檔使用，絕對保密。
              </p>
            </div>
          </form>
        </div>

        {/* Testimonials Section */}
        <div className="mt-24 bg-secondary text-white p-12 shadow-sm border border-gray-800">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-serif mb-4">會員真實反饋</h3>
            <p className="text-gray-400 text-sm tracking-widest uppercase">Words from our community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="flex mb-4 text-accent">
                   {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="italic text-gray-300 mb-6 leading-relaxed">"{t.content}"</p>
                <div>
                   <h4 className="font-serif font-bold">{t.name}</h4>
                   <p className="text-xs text-gray-500 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Membership;