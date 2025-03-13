import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'

export const HeroSection = () => {
  return (
    <section id="" className="pt-24 min-h-[800px] relative overflow-hidden bg-gradient-to-r from-tertiary to-secondary">
    <div className="container relative z-10 px-4 mx-auto h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[700px]">
        <div className="space-y-8">
          <div className="inline-block px-6 py-2 rounded-full backdrop-blur-sm bg-white/10">
            <span className="text-primary">Panadería Artesanal y Cafecito</span>
          </div>
          <h1 className="text-6xl font-bold leading-tight lg:text-8xl text-primary">
            Creando Dulces
            <span className="block">Momentos</span>
          </h1>
          <p className="max-w-lg text-xl text-primary/80">
            Experimenta la perfecta mezcla de artesanía tradicional e innovación moderna en cada creación hecha a mano.
          </p>
          <div className="flex gap-4">
            <Button className="bg-primary text-background hover:bg-primary/90 text-lg px-8 py-6 !rounded-button" asChild>
              <Link href="/order">Explorar Menú</Link>
            </Button>
            <Button className="bg-background/20 backdrop-blur-sm text-primary hover:bg-background/30 text-lg px-8 py-6 !rounded-button" asChild>
              <Link href="#nosotros">Nuestra Historia</Link>
            </Button>
          </div>
          {/* TODO: ADD THIS MORE IN THE FUTURE */}
          {/* <div className="flex gap-8 items-center mt-12">
            <div className="text-primary">
              <div className="text-3xl font-bold">2K+</div>
              <div className="text-sm">Clientes Diarios</div>
            </div>
            <div className="text-primary">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm">Recetas Únicas</div>
            </div>
            <div className="text-primary">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm">Maestros Panaderos</div>
            </div>
          </div> */}
        </div>
        <div className="relative h-[600px] hidden lg:block">
          <Image 
            src="/images/hero.png"
            alt="Pasteles destacados"
            className="absolute top-0 right-0 w-full h-full object-cover rounded-bl-[100px]"
            width={1440}
            height={600}
          />
          <div className="absolute -bottom-20 -left-20 p-6 max-w-xs rounded-3xl shadow-xl bg-background">
            <div className="flex gap-4 items-center mb-4">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-tertiary">
                <i className="fas fa-star text-primary"/>
              </div>
              <div>
                <div className="text-sm text-primary/60">Especial de Hoy</div>
                <div className="font-semibold text-primary">Colección Signature</div>
              </div>
            </div>
            <div className="pb-1 space-y-2">
              <div className="flex gap-2 items-center">
                <i className="text-green-500 fas fa-check-circle"/>
                <span className="text-sm text-primary">Elaborado Diariamente</span>
              </div>
              <div className="flex gap-2 items-center">
                <i className="text-green-500 fas fa-check-circle"/>
                <span className="text-sm text-primary">Ingredientes Premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t to-transparent from-background"/>
    </section>

  )
}
