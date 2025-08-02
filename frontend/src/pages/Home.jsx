import React, { useEffect, useState } from 'react';
import Backgound from '../component/Backgound';
import Hero from '../component/Hero';
import Product from './Product';
import OurPolicy from '../component/OurPolicy';
import NewLetterBox from '../component/NewLetterBox';
import Footer from '../component/Footer';

function Home() {
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fit", text2: "Now on Sale!" },
    { text1: "Unbox style,unwarp confidence", text2: "Hot Deals" },
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev === 4 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden relative top-[70px] w-full">
      {/* 📱 MOBILE: Top 30% text+image, Bottom 70% white */}
      <div className="flex sm:flex-row md:hidden w-full h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
        <div className="w-1/2 h-full">
          <Hero heroCount={heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]} />
        </div>
        <div className="w-1/2 h-full">
          <Backgound heroCount={heroCount} />
        </div>
      </div>
     

      {/* 🟨 TABLET: Top 50% text+image, Bottom 50% white */}
      <div className="hidden md:flex lg:hidden flex-row w-full h-[50vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
        <div className="w-1/2 h-full">
          <Hero heroCount={heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]} />
        </div>
        <div className="w-1/2 h-full">
          <Backgound heroCount={heroCount} />
        </div>
      </div>
     

      {/* 💻 DESKTOP: Full screen layout */}
      <div className="hidden lg:flex flex-row w-full h-screen">
        <div className="w-1/2 h-full bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
          <Hero heroCount={heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]} />
        </div>
        <div className="w-1/2 h-full">
          <Backgound heroCount={heroCount} />
        </div>
      </div>
      <Product/>
      <OurPolicy/>
      <NewLetterBox/>
      <Footer/>
    </div>
  );
}

export default Home;