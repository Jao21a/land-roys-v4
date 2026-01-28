import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import { supabase } from "../../../api/Supabase.provider";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Seccion_Slider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      const { data, error } = await supabase
        .from("slider")
        .select("*")
        .eq("estado", "activo")
        .order("orden", { ascending: true });

      if (error) console.error("Error al traer slides:", error);
      else setSlides(data);
    };
    fetchSlides();
  }, []);

  if (!slides.length) return null;

  return (
    <section className="relative w-full h-[600px] md:h-[85vh] bg-black overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.2) 60%), url(${slide.url_image})`
                }}
              />
              <div className="container mx-auto px-6 md:px-12 relative z-10 text-white">
                <div className="max-w-2xl space-y-6">
                  <span className="inline-block bg-yellow-400 text-black text-[10px] md:text-xs font-black px-3 py-1 rounded-sm tracking-widest">{slide.tag}</span>
                  <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-tight">{slide.title} <br /><span className="text-yellow-400">{slide.destacar}</span></h2>
                  <p className="text-gray-300 text-sm md:text-lg max-w-lg font-light leading-relaxed">{slide.descripcion}</p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-yellow-400/20">{slide.name_btn_1} <ArrowRight size={20} /></button>
                    <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold px-8 py-3 rounded-full transition-all active:scale-95">{slide.name_btn_2}</button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Seccion_Slider;
