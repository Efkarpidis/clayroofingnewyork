"use client";
import React from 'react';

const slides = [
  { image: 'https://st.hzcdn.com/simgs/d1b11d4e02dd5fe7_4-6933/mediterranean-exterior.jpg', text: 'Keeping European Traditions Alive' },
  { image: 'https://cdn.homedit.com/wp-content/uploads/2022/05/The-terracotta-roof.jpg', text: 'Join the Trend: Iconic Clay Roofs' },
  { image: 'https://www.thehousedesigners.com/articles/images/clay-roof-tiles-3-2015.jpg', text: 'Vibrant Homes, Timeless Style' },
  { image: 'https://i.pinimg.com/736x/5b/13/0e/5b130e282a1999a80c0e03ea6916be9d.jpg', text: 'Be Part of the European Revival' },
  { image: 'https://westlakeroyalroofing.com/wp-content/uploads/2023/05/ClayLite-40Merlt-30CrnaDeOro-30Viejo-220-cg.jpg', text: 'Bold, Beautiful, Built to Last' },
];

export default function Draft3() {
  return (
    <div className="min-h-screen bg-white text-orange-900 font-bold">
      <header className="p-4 text-center bg-orange-200">
        <h1 className="text-5xl tracking-tight">Clay Roofing New York</h1>
      </header>
      <section className="relative h-[70vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center animate-fade"
            style={{
              backgroundImage: `url(${slide.image})`,
              animationDelay: `${index * 6}s`,
              animationDuration: `${slides.length * 6}s`,
            }}
          >
            <div className="absolute inset-0 bg-orange-500/30 flex items-center justify-center">
              <p className="text-white text-4xl drop-shadow-lg text-center px-6 animate-pulse">{slide.text}</p>
            </div>
          </div>
        ))}
        <style jsx>{`
          @keyframes fade {
            0% { opacity: 0; }
            5% { opacity: 1; }
            15% { opacity: 1; }
            20% { opacity: 0; }
            100% { opacity: 0; }
          }
          .animate-fade {
            animation: fade infinite;
          }
        `}</style>
      </section>
      <main className="max-w-5xl mx-auto p-10 text-center">
        <p className="text-2xl mb-6">Trendy tiles for your dream home!</p>
        <button className="bg-orange-500 text-white px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition">Explore Now</button>
      </main>
    </div>
  );
}
