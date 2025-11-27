import React from 'react';
import { SectionTitle } from '../components/UIComponents';
import { CERTIFICATIONS } from '../data';

const About = () => {
  return (
    <div className="pt-32 pb-24 animate-fade-in">
      <div className="container mx-auto px-6">
        <SectionTitle title="關於杜乾彰師傅" subtitle="Profile & Qualifications" />
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
           <div>
             <img src="https://picsum.photos/id/1011/800/1000" alt="Master Ritual" className="w-full h-auto grayscale rounded-sm shadow-xl" />
           </div>
           <div className="flex flex-col justify-center">
             <h3 className="text-2xl font-serif mb-6">傳承與創新的結合</h3>
             <p className="text-gray-600 mb-6 leading-loose">
               杜乾彰師傅是一位跨越傳統與現代的玄學專家。他不僅擁有深厚的道家法科傳承，更積極融合西方心理學技術，創造出獨特的「身心靈整合療法」。
             </p>
             <p className="text-gray-600 mb-6 leading-loose">
               他的理念是：玄學不應是迷信，而是一種提升生活品質的環境科學與心理暗示技術。通過調整環境（風水）與調整心態（靈修/催眠），達到內外合一的最佳狀態。
             </p>
             
             <div className="bg-paper p-8 mt-4 border-l-4 border-accent">
               <h4 className="font-bold mb-4 uppercase tracking-widest text-sm">未來目標</h4>
               <ul className="space-y-3 text-sm text-gray-600">
                 <li>• 建立全球玄學數據庫，將傳統智慧系統化與現代化。</li>
                 <li>• 設立「杜乾彰慈善基金」，以玄學收益回饋社會，幫助弱勢社群。</li>
                 <li>• 發展線上元宇宙道場，突破地域限制，為全球華人提供心靈庇護。</li>
               </ul>
             </div>
           </div>
        </div>

        {/* Credentials Grid */}
        <div className="bg-black text-white p-12 md:p-24 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-serif mb-8 text-accent">個人資歷</h3>
              <ul className="space-y-4 font-light text-gray-300">
                <li>• 六壬伏英館 / 風火院 傳教師傅</li>
                <li>• 茅山總館五星教 傳法師傅</li>
                <li>• 江西龍虎山第六十八代法術弟子</li>
                <li>• 天庭藥王孫真教祝由術治療師</li>
                <li>• 楊公風水派第二十四代傳人</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-serif mb-8 text-accent">心理學專業資格</h3>
              <ul className="space-y-4 font-light text-gray-300">
                {CERTIFICATIONS.map((cert, idx) => (
                  <li key={idx}>• {cert}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Awards */}
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-serif mb-12">榮譽及獎項</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             <div className="p-6 border border-gray-100 rounded-lg hover:border-accent transition-colors">
               <div className="text-2xl font-bold mb-2 text-accent">2021</div>
               <div className="text-sm">亞洲年度最佳玄學家</div>
             </div>
             <div className="p-6 border border-gray-100 rounded-lg hover:border-accent transition-colors">
               <div className="text-2xl font-bold mb-2 text-accent">2022</div>
               <div className="text-sm">卓越創新企業大獎</div>
             </div>
             <div className="p-6 border border-gray-100 rounded-lg hover:border-accent transition-colors">
               <div className="text-2xl font-bold mb-2 text-accent">2023</div>
               <div className="text-sm">港澳區一百強青年堪輿學家</div>
             </div>
             <div className="p-6 border border-gray-100 rounded-lg hover:border-accent transition-colors">
               <div className="text-2xl font-bold mb-2 text-accent">2024</div>
               <div className="text-sm">卓越堪輿及傳統文化企業大獎</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;