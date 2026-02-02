import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif mb-6 text-greenJade">杜乾彰師傅</h3>
            <p className="text-greenLight/80 leading-relaxed mb-6 max-w-md text-sm">
              融合中式法科、Reiki、塔羅與現代心理學。致力於為個人及企業提供全方位的玄學解決方案，提升生活品質，創造更精彩的人生。
            </p>
          </div>
          
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 font-bold text-greenJade">快速連結</h4>
            <ul className="space-y-4 text-sm text-greenLight/80">
              <li><a href="/membership" className="hover:text-greenJade transition-colors">會員制度</a></li>
              <li><a href="/services" className="hover:text-greenJade transition-colors">玄學服務</a></li>
              <li><a href="/courses" className="hover:text-greenJade transition-colors">靈修課程</a></li>
              <li><a href="/about" className="hover:text-greenJade transition-colors">關於師傅</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 font-bold text-greenJade">聯絡與追蹤</h4>
            <div className="flex space-x-6 mb-6">
              <a href="#" className="hover:text-greenJade transition-colors text-greenLight/80"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-greenJade transition-colors text-greenLight/80"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-greenJade transition-colors text-greenLight/80"><Mail className="w-5 h-5" /></a>
            </div>
            <p className="text-xs text-greenLight/60">Instagram: REIKI_TAROTO</p>
          </div>
        </div>

        <div className="border-t border-accent/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-greenLight/60">© 2026 Master Du Qianzhang. All rights reserved.</p>
          <p className="text-xs text-greenLight/60 mt-2 md:mt-0">Designed by Strategic Architect</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
