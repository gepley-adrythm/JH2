import React from "react";
import { cn } from "@/lib/utils";

export default function Editorial() {
  return (
    <div className="w-full min-h-screen bg-[#f5f0e8] text-[#2c2a26] flex flex-col items-center justify-center py-20 px-4 sm:px-8 relative overflow-hidden">
      {/* Font imports */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Jost:wght@300;400;500&display=swap');
      `}} />
      
      <div className="max-w-[1400px] w-full mx-auto" style={{ fontFamily: "'Jost', sans-serif" }}>
        {/* Top Headline */}
        <div className="mb-16 border-b border-[#2c2a26]/20 pb-8 relative">
          <div className="absolute top-0 right-0 text-xs tracking-widest uppercase font-medium text-[#2c2a26]/50 hidden md:block">
            Location Spotlight
          </div>
          <h2 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.85] tracking-tight uppercase font-medium"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Build a home<br className="hidden md:block"/> in Scottsdale
          </h2>
        </div>

        {/* Two column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-stretch">
          {/* Left: Image (60%) */}
          <div className="w-full lg:w-[60%] relative aspect-[4/5] lg:aspect-auto">
            <img 
              src="/__mockup/images/city-intro-scottsdale.jpg" 
              alt="Luxury home in Scottsdale" 
              className="w-full h-full object-cover grayscale-[20%] sepia-[10%] contrast-[1.1] transition-all duration-700 hover:grayscale-0 hover:sepia-0"
              style={{ minHeight: '600px' }}
            />
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] tracking-[0.3em] text-[#2c2a26]/40 uppercase hidden xl:block whitespace-nowrap">
              Scottsdale, AZ — Editorial Feature
            </div>
          </div>

          {/* Right: Body copy (40%) mid-height */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center py-10 lg:py-20">
            <div className="max-w-md">
              <div className="w-16 h-[1px] bg-[#2c2a26] mb-10"></div>
              
              <div className="space-y-8">
                <p className="text-xl leading-relaxed text-[#2c2a26]/90 font-light first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:mt-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Scottsdale, Arizona offers luxury living, stunning desert landscapes, and vibrant amenities. Known for upscale neighborhoods, golf courses, and year-round sunshine, Scottsdale is ideal for custom home building.
                </p>
                <p className="text-lg leading-relaxed text-[#2c2a26]/70 font-light">
                  Jematell Homes is a trusted Scottsdale home builder known for exceptional craftsmanship, personalized design, and deep local expertise. We deliver high-quality custom homes tailored to your lifestyle in premier Scottsdale neighborhoods.
                </p>
              </div>
              
              <div className="mt-16">
                <button className="group flex items-center gap-4 text-xs tracking-[0.2em] uppercase font-medium hover:text-[#2c2a26]/60 transition-colors">
                  <span className="relative overflow-hidden">
                    <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">Explore The Area</span>
                    <span className="inline-block absolute left-0 top-full transition-transform duration-500 group-hover:-translate-y-full">Explore The Area</span>
                  </span>
                  <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
