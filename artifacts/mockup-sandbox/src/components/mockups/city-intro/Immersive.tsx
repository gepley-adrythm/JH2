import React from 'react';

export default function Immersive() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Montserrat:wght@300;400;500&display=swap');
      `}} />
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/__mockup/images/city-intro-scottsdale.jpg" 
          alt="Luxury home in Scottsdale, Arizona" 
          className="w-full h-full object-cover object-center"
        />
        {/* Dramatic cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent sm:w-3/4 md:w-2/3"></div>
        {/* Subtle overall dark overlay to ensure the left text panel stands out */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 py-20">
        <div className="max-w-[600px]">
          
          <div className="backdrop-blur-sm bg-black/20 border-l border-t border-white/10 p-8 sm:p-12 lg:p-16 text-white/90 shadow-2xl relative">
            {/* Decorative corner accent */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#d4af37] opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#d4af37] opacity-60"></div>

            <div className="flex items-center gap-4 mb-6">
              <span className="h-[1px] w-12 bg-[#d4af37]"></span>
              <span 
                className="uppercase tracking-[0.3em] text-[#d4af37] text-xs font-semibold"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Arizona Luxury
              </span>
            </div>

            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-medium mb-8 uppercase leading-tight tracking-wide text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Build a Home in Scottsdale
            </h2>
            
            <div 
              className="space-y-6 text-sm sm:text-base leading-loose font-light text-white/80"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <p>
                Scottsdale, Arizona offers luxury living, stunning desert landscapes, and vibrant amenities. Known for upscale neighborhoods, golf courses, and year-round sunshine, Scottsdale is ideal for custom home building.
              </p>
              <p>
                Jematell Homes is a trusted Scottsdale home builder known for exceptional craftsmanship, personalized design, and deep local expertise. We deliver high-quality custom homes tailored to your lifestyle in premier Scottsdale neighborhoods.
              </p>
            </div>
            
            <div className="mt-12">
              <button 
                className="group relative px-8 py-4 bg-transparent text-white text-xs uppercase tracking-[0.25em] transition-all duration-500 overflow-hidden"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <div className="absolute inset-0 w-full h-full border border-white/30 group-hover:border-white/0 transition-colors duration-300"></div>
                <div className="absolute inset-0 w-0 h-full bg-white group-hover:w-full transition-all duration-500 ease-out z-0"></div>
                <span className="relative z-10 group-hover:text-black transition-colors duration-300 font-medium">
                  Discover Our Process
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}