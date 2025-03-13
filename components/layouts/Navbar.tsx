"use client";

import { useState, } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

const menuItems = ['Menú', 'Nosotros', 'Eventos'];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartQuantity } = useCartStore();

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-background/80">
    <div className="container flex justify-between items-center px-4 mx-auto h-20">
      <div className="flex gap-12 items-center">
        <Link className="text-2xl font-bold cursor-pointer text-primary" href="/">{siteConfig.business.name}</Link>
        <nav className="hidden lg:block">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <a key={item} href={`#${item === 'Menú' ? 'menu' : item.toLowerCase()}`} className="text-sm font-medium whitespace-nowrap transition-colors cursor-pointer text-primary hover:text-secondary">
                {item}
              </a>
            ))}
          </ul>
        </nav>
      </div>
      <div className="hidden gap-6 items-center lg:flex">
        
        {getCartQuantity() > 0 ? (
          <Link href="/order" className="!rounded-button relative">
            <i className="fas fa-shopping-cart"/>
            <span className="sr-only">Carrito</span>
            <span className="flex absolute -top-2 -right-2 justify-center items-center w-5 h-5 text-xs text-white rounded-full bg-primary">{getCartQuantity()}</span>
          </Link>
        ) : (
          <Button className="!rounded-button" asChild>
            <Link href="/order">Ordenar en Línea</Link>
          </Button>
        )}
      </div>
      <Button
        className="cursor-pointer lg:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <i className="text-xl fas fa-times"/> : <i className="text-xl fas fa-bars"/>}
      </Button>
    </div>
    <nav className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-20 left-0 w-full bg-background/95 backdrop-blur-md border-t border-gray-100`}>
      <ul className="flex flex-col px-4 py-4 space-y-4 sm:px-18">
        {['Menú', 'Nosotros', ...(getCartQuantity() > 0 ? ['Carrito'] : ['Ordenar en Línea'])].map((item) => (
         <li key={item}>
          {(item === 'Ordenar en Línea' || item === 'Carrito') && <Button className="!rounded-button" asChild>
            <Link href="/order" className={item === 'Carrito' ? 'relative flex items-center gap-2' : ''}>
              {item === 'Carrito' ? (
                <>
                  <i className="fas fa-shopping-cart"/>
                  <span className="flex absolute -top-2 -right-2 justify-center items-center w-5 h-5 text-xs text-white rounded-full bg-primary">{getCartQuantity()}</span>
                </>
              ) : item}
            </Link>
          </Button>}
          {item !== 'Ordenar en Línea' && item !== 'Carrito' && <Link href={`#${item === 'Menú' ? 'menu' : item.toLowerCase()}`}>{item}</Link>}
         </li>
        ))}
      </ul>
    </nav>
  </header>
  

  );
}
