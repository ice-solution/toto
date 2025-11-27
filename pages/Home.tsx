import React from 'react';
import { SectionTitle, Button, Card } from '../components/UIComponents';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES, PROFILE_STATS } from '../data';

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80 grayscale-[30%]"
        >
          <source src="/banner.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white p-6 max-w-4xl">
            <h2 className="text-sm md:text-base tracking-[0.5em] mb-4 uppercase text-gray-200">Metaphysics & Spirituality</h2>
            <h1 className="text-5xl md:text-7xl font-serif font-light mb-8 leading-tight">
              提升生活品質的<br/>玄學之選
            </h1>
            <p className="text-lg md:text-xl font-light mb-10 text-gray-200 max-w-2xl mx-auto">
              杜乾彰師傅為您提供專業風水設計、玄學諮詢及傳統祭祀儀式，<br/>融合心理學與傳統智慧，助您創造順利和諧的人生。
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link to="/membership">
                <Button variant="primary" className="bg-white !text-black font-bold hover:bg-gray-800 hover:!text-white tracking-widest">
                  探索會員制度
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black tracking-widest">
                  預約服務
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Story / Introduction */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-accent opacity-50"></div>
                <img 
                  src="https://picsum.photos/id/1005/600/800" 
                  alt="Master Du" 
                  className="w-full h-[600px] object-cover grayscale"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-accent opacity-50"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-sm text-accent tracking-widest mb-4">THE MASTER</h3>
              <h2 className="text-4xl font-serif mb-8">杜乾彰師傅 <span className="text-xl block mt-2 text-gray-400">Master Du Qianzhang</span></h2>
              <p className="text-gray-600 leading-loose mb-6 font-light text-justify">
                作為六壬伏英館及風火院傳教師傅，杜乾彰師傅不僅承襲了深厚的道教傳統，更具備國際認證催眠師及心理學專業資格。
              </p>
              <p className="text-gray-600 leading-loose mb-8 font-light text-justify">
                杜師傅獨創「科學玄學」理念，摒棄迷信，以理性的角度結合環境心理學與能量場調整，為現代都市人解決事業、感情及健康上的困擾。從企業風水佈局到個人靈性成長，杜師傅都是您值得信賴的人生導師。
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                {PROFILE_STATS.map((stat, idx) => (
                  <div key={idx}>
                    <p className="text-3xl font-serif">{stat.value}<span className="text-sm ml-1">{stat.suffix}</span></p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>

              <Link to="/about" className="group flex items-center text-sm tracking-widest border-b border-black pb-1 w-fit">
                了解更多資歷 <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-paper">
        <div className="container mx-auto px-6">
          <SectionTitle title="精選玄學服務" subtitle="Sacred Services" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map(service => (
              <Card key={service.id} className="group cursor-pointer h-full flex flex-col">
                <div className="overflow-hidden mb-6 h-64">
                  <img 
                    src={service.imageUrl} 
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-serif mb-2 group-hover:text-accent transition-colors">{service.name}</h3>
                <p className="text-gray-500 text-sm mb-4 flex-grow line-clamp-3">{service.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-lg font-medium">HK${service.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">了解詳情</span>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline">查看所有服務</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Snippet */}
      <section className="py-24 bg-secondary text-white relative">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <div className="flex justify-center mb-8">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-accent fill-current" />)}
          </div>
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-8">
            "成為「全面貼心」會員後，我的事業和人際關係都有明顯改善。杜師傅的季度諮詢幫助我及時調整生活方向，讓我避開了許多潛在問題。"
          </p>
          <div className="text-sm tracking-widest uppercase text-accent">
            — 陳先生，金融業專業人士
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;