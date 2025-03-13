"use client"


import Image from 'next/image'
import type { Testimonial } from '@/types'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
    <section id="testimonios" className="py-20 bg-[#121212]">
    <div className="max-w-[1440px] mx-auto px-6">
      <h2 className="mb-16 text-4xl font-bold text-center">
        Lo Que Dicen Nuestros Clientes
      </h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        spaceBetween={30}
        slidesPerView={1}
        className="mb-12"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.name}>
            <div className="px-4 py-8 text-center">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                className="object-cover mx-auto mb-6 w-24 h-24 rounded-full"
                width={96}
                height={96}
              />
              <p className="mb-4 text-xl italic">{testimonial.quote}</p>
              <h4 className="font-bold">{testimonial.name}</h4>
              <p className="text-gray-400">{testimonial.event}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
  )
}
