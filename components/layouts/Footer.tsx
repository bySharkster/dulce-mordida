import { siteConfig } from '@/config/site'

const quickLinks = ['Inicio', 'Productos', 'Pedidos', 'Nosotros', 'Contacto']

export const Footer = () => {
  return (
    <footer className="py-12 bg-primary text-background">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-great-vibes">{siteConfig.business.name}</h3>
            <p className="text-sm">Creando momentos dulces desde 2024</p>
          </div>
          <div>
            <h3 className="mb-4 text-xl">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item} className="transition-colors cursor-pointer hover:text-secondary">{item}</li>
              ))}
            </ul>
          </div>
          
        </div>
        <div className="pt-8 mt-8 text-center border-t border-background/20">
          <p>&copy; 2025 {siteConfig.business.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
