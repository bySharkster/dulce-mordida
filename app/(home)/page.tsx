
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
// import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
// import type { Testimonial } from "@/types";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { products } from "@/data/products";

export default function Home() {

  // const testimonials: Testimonial[] = [
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1741073104186-81bd0fed603e?q=80&w=1315&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     quote:
  //       "El mejor servicio de DJ que podríamos haber pedido para nuestra boda. ¡Todos estuvieron bailando toda la noche!",
  //     name: "Alba Rodríguez",
  //     event: "Celebración de Boda",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1740459223350-0fc006bf870d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     quote:
  //       "Hizo que nuestro evento corporativo fuera verdaderamente memorable. Excelente profesionalismo y selección musical.",
  //     name: "Miguel Ojara",
  //     event: "Gala Corporativa",
  //   },
  // ];

  return (
    <div className="min-h-[1024px] w-full bg-background text-foreground">

      {/* Sección Hero */}
     <HeroSection/>

      {/* Sección de Servicios */}
     <ProductsSection products={products} />

      {/* Sección de Testimonios */}
      {/* <TestimonialsSection testimonials={testimonials} /> */}
      <AboutSection />
      {/* Sección de Contacto */}
      <ContactSection />


    </div>
  );
};