import React, { useEffect, useState } from 'react';
import { SectionTitle } from '../components/UIComponents';
import { CERTIFICATIONS } from '../data';
import toto1 from '../about/toto_1.jpg';
import toto2 from '../about/toto_2.jpg';
import toto3 from '../about/toto_3.jpg';
import toto4 from '../about/toto_4.jpg';
import toto5 from '../about/toto_5.jpg';

const ABOUT_MAIN_PHOTO = { src: toto5, alt: '杜乾彰師傅' };
// `toto_2` 已用在 homepage 的 about 區塊；此頁只展示其他未使用的照片。
const ABOUT_GALLERY_PHOTOS = [
  { src: toto1, alt: '杜乾彰師傅' },
  { src: toto3, alt: '杜乾彰師傅' },
  { src: toto4, alt: '杜乾彰師傅' },
];

const About = () => {
  const [activePhotoSrc, setActivePhotoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!activePhotoSrc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePhotoSrc(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activePhotoSrc]);

  return (
    <div className="pt-32 pb-24 animate-fade-in">
      <div className="container mx-auto px-6">
        <SectionTitle title="關於杜乾彰師傅" subtitle="Profile & Qualifications" />
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
           <div>
             <button
               type="button"
               className="block w-full"
               onClick={() => setActivePhotoSrc(ABOUT_MAIN_PHOTO.src)}
               aria-label="放大主圖片"
             >
               <img
                 src={ABOUT_MAIN_PHOTO.src}
                 alt={ABOUT_MAIN_PHOTO.alt}
                 className="w-full h-auto rounded-sm shadow-xl"
               />
             </button>
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

        {/* Photo Gallery - other unused photos */}
        <div className="mb-24">
          <h3 className="text-2xl font-serif mb-8 text-center">相片集</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ABOUT_GALLERY_PHOTOS.map((photo, idx) => (
              <button
                key={idx}
                type="button"
                className="overflow-hidden rounded-sm shadow-lg hover:shadow-xl transition-shadow text-left relative p-0 border-0 bg-transparent"
                onClick={() => setActivePhotoSrc(photo.src)}
                aria-label="放大相片"
                style={{ aspectRatio: '4 / 3' }}
              >
                <img
                  src={photo.src}
                  alt={`${photo.alt} ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover object-[50%_30%] transition-all duration-300"
                />
              </button>
            ))}
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

      {/* Image Modal */}
      {activePhotoSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          onClick={() => setActivePhotoSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute -top-10 right-0 text-white/90 hover:text-white"
              onClick={() => setActivePhotoSrc(null)}
              aria-label="關閉放大視窗"
            >
              關閉
            </button>
            <img
              src={activePhotoSrc}
              alt="放大圖片"
              className="w-full max-h-[80vh] object-contain rounded-sm shadow-2xl bg-black"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;