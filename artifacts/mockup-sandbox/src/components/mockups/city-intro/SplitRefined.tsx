import React from 'react';

export default function SplitRefined() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
      `}} />
      <section 
        className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden" 
        style={{ backgroundColor: '#f5f0e8' }}
      >
        <div className="max-w-[1400px] mx-auto relative flex flex-col md:flex-row items-stretch">
          
          {/* Hairline Divider (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-[#d9d1c7]"></div>
          
          {/* Left Column (Text) */}
          <div className="w-full md:w-1/2 flex flex-col justify-center pr-0 md:pr-16 lg:pr-24 xl:pr-32 py-10">
            <span 
              className="text-xs font-semibold tracking-[0.25em] text-[#8a7f72] mb-6 uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Scottsdale, AZ
            </span>
            
            <h2 
              className="text-5xl md:text-5xl lg:text-[4rem] text-[#2c2825] leading-[1.05] mb-8 tracking-tighter"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              BUILD A HOME IN SCOTTSDALE
            </h2>
            
            <p 
              className="text-[#59524c] text-lg lg:text-[1.1rem] leading-[1.8] font-light"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Scottsdale, Arizona offers luxury living, stunning desert landscapes, and vibrant amenities. 
              Known for upscale neighborhoods, golf courses, and year-round sunshine, Scottsdale is ideal for custom home building. 
              Jematell Homes is a trusted Scottsdale home builder known for exceptional craftsmanship, personalized design, and deep local expertise. 
              We deliver high-quality custom homes tailored to your lifestyle in premier Scottsdale neighborhoods.
            </p>
          </div>
          
          {/* Right Column (Image) */}
          <div className="w-full md:w-1/2 pl-0 md:pl-16 lg:pl-24 xl:pl-32 mt-12 md:mt-0 flex items-center justify-center">
            <div className="w-full max-w-lg xl:max-w-[28rem] aspect-[4/5] relative rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden">
              <img 
                src="/__mockup/images/city-intro-scottsdale.jpg" 
                alt="Luxury home in Scottsdale"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
}