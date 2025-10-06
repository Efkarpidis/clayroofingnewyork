"use client";
import React from 'react';

const slides = [
  { image: 'https://cdn.homedit.com/wp-content/uploads/2022/05/terracotta-roofing.jpg', text: 'Keeping European Traditions Alive' },
  { image: 'https://www.thehousedesigners.com/articles/images/clay-roof-tiles-2-2015.jpg', text: 'Timeless Elegance in Every Tile' },
  { image: 'https://st.hzcdn.com/simgs/d1b11d4e02dd5fe7_4-6933/mediterranean-exterior.jpg', text: 'Heritage Meets Modern Craftsmanship' },
  { image: 'https://cdn.homedit.com/wp-content/uploads/2022/05/The-terracotta-roof.jpg', text: 'Enduring Beauty for Generations' },
  { image: 'https://www.thehousedesigners.com/articles/images/clay-roof-tiles-3-2015.jpg', text: 'Revive the Old-World Charm' },
];

export default function Draft1() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-white text-neutral-800 font-serif">
      <header className="p-4 text-center">
        <h1 className="text-4xl font-bold text-orange-800">Clay Roofing New York</h1>
      </header>
      <section className="relative h-[60vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center animate-fade"
            style={{
              backgroundImage: `url(${slide.image})`,
              animationDelay: `${index * 5}s`,
              animationDuration: `${slides.length * 5}s`,
            }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <p className="text-white text-3xl font-bold text-center px-4">{slide.text}</p>
            </div>
          </div>
        ))}
        <style jsx>{`
          @keyframes fade {
            0% { opacity: 0; }
            5% { opacity: 1; }
            20% { opacity: 1; }
            25% { opacity: 0; }
            100% { opacity: 0; }
          }
          .animate-fade {
            animation: fade infinite;
          }
        `}</style>
      </section>
      <main className="max-w-4xl mx-auto p-8 text-center">
        <p className="text-xl mb-4">Discover the artistry of clay tile roofing.</p>
        <button className="bg-orange-600 text-white px-6 py-3 rounded-full">Get a Quote</button>
      </main>
    </div>
  );
}
