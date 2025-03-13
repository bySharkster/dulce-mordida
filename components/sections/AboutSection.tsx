import Image from 'next/image'
import React from 'react'

export const AboutSection = () => {
  return (
    <section id="nosotros" className="py-20 bg-backgroundAlt">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-4xl text-center font-great-vibes text-primary">Nuestra Historia</h2>
        <div className="grid grid-cols-1 gap-12 items-center md:grid-cols-2">
          <div>
            <Image
              src={"/images/about.png"}
              alt="Nuestra panadería"
              width={500}
              height={500}
            />
          </div>
          <div>
            <p className="mb-6 text-lg text-primary">
              Desde 2024, Dulce Mordida ha estado creando momentos de alegría a través de nuestros productos de panadería artesanal. Cada receta cuenta una historia de pasión, tradición e innovación, uniendo técnicas clásicas con sabores modernos.
            </p>
            <p className="text-lg text-primary">
              Nosotros trabajamos incansablemente para asegurar que cada creación cumpla con nuestros altos estándares de calidad y sabor. Creemos en usar solo los mejores ingredientes y hacer todo fresco diariamente.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
