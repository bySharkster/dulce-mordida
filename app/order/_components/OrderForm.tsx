"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { useCartStore } from '@/store/useCartStore'
import { toast } from 'sonner'
import { siteConfig } from '@/config/site'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { sendEmail } from '@/app/order/actions/send-email'
import { orderSchema, type OrderFormValues } from '@/types/schema.zod'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export const OrderForm = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    calculateTotal,
    deliveryOption,
    setDeliveryOption,
    orderTime,
    setOrderTime,
    clearCart
  } = useCartStore()
  const router = useRouter()
  const [errorTime, setErrorTime] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Partial<OrderFormValues>>({
    deliveryOption: 'delivery',
    orderDate: '',
    orderTime: '',
    address: '',
    apt: '',
    instructions: '',
    customerEmail: '',
    name: '',
    phone: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Format phone number as (XXX) XXX-XXXX
    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '')
      if (cleaned.length <= 10) {
        let formatted = ''
        if (cleaned.length > 0) {
          formatted = `(${cleaned.slice(0, Math.min(3, cleaned.length))}`
          if (cleaned.length > 3) {
            formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, Math.min(6, cleaned.length))}`
            if (cleaned.length > 6) {
              formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, Math.min(10, cleaned.length))}`
            }
          }
        }
        setFormData(prev => ({ ...prev, [name]: formatted }))
      }
      return
    }

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = e.target.value
    if (selectedTime < siteConfig.business.businessHours.start || selectedTime > siteConfig.business.businessHours.end) {
      const msg = `Por favor seleccione un horario entre ${siteConfig.business.businessHours.start} y ${siteConfig.business.businessHours.end}`
      toast.error(msg)
      setErrorTime(msg)
      return
    }
    setOrderTime(selectedTime)
    setErrorTime('')
    setFormData(prev => ({ ...prev, orderTime: selectedTime }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      const orderData = {
        ...formData,
        deliveryOption,
        orderTime,
      } as OrderFormValues

      const validatedData = orderSchema.parse(orderData)
      const orderId = Math.random().toString(36).substr(2, 9)
      const totals = calculateTotal()

      const emailData = {
        customer: {
          name: validatedData.name,
          phone: validatedData.phone,
          email: validatedData.customerEmail,
        },
        delivery: {
          type: validatedData.deliveryOption,
          address: validatedData.address,
          apt: validatedData.apt,
          date: validatedData.orderDate,
          time: validatedData.orderTime,
        },
        instructions: validatedData.instructions,
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        })),
        totals: {
          subtotal: totals.subtotal,
          tax: totals.tax,
          total: totals.total
        }
      }

      // Send order notification (will handle both business and customer emails)
      await sendEmail({
        to: validatedData.customerEmail,
        subject: `Recibo de su pedido: ${orderId}`,
        data: emailData,
        orderId
      })

      toast.success('¡Pedido enviado con éxito!')
      clearCart()
      setFormData({
        deliveryOption: 'delivery',
        orderDate: '',
        orderTime: '',
        address: '',
        apt: '',
        instructions: '',
        customerEmail: '',
        name: '',
        phone: ''
      })
      router.push('/order/succesful')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Error al procesar el pedido')
      }
      console.error(error)
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="sticky top-24 p-6 bg-card text-card-foreground">
        <h2 className="mb-6 text-2xl font-semibold text-primary">Tu Pedido</h2>
        <ScrollArea className="h-[400px] mb-6 hide-scrollbar">
          {cart.length === 0 ? (
            <p className="text-center text-muted-foreground">Tu carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center pb-4 mb-4 border-b border-border">
                <div>
                  <h3 className="font-medium text-primary">{item.name}</h3>
                  <div className="flex gap-2 items-center mt-2">
                    <Button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-6 w-6 p-0 bg-primary text-primary-foreground !rounded-button"
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-6 w-6 p-0 bg-primary text-primary-foreground !rounded-button"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-primary">${(item.price * item.quantity).toFixed(2)}</div>
                  <Button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    variant="ghost"
                    className="h-6 px-2 text-destructive hover:text-destructive/90 !rounded-button"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))
          )}
        </ScrollArea>

        <div className="mb-6 space-y-4">
          <div className="flex justify-between text-primary">
            <span>Subtotal</span>
            <span>${calculateTotal().subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-primary">
            <span>Impuesto ({(siteConfig.business.taxRate * 100).toFixed(2)}%)</span>
            <span>${calculateTotal().tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-semibold text-primary">
            <span>Total</span>
            <span>${calculateTotal().total.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nombre y Apellido" 
              className="w-full" 
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input 
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(787) XXX-XXXX" 
              className="w-full" 
              required
            />
          </div>
          <div>
            <Label htmlFor="customerEmail">Email</Label>
            <Input 
              id="customerEmail"
              name="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={handleInputChange}
              placeholder="correo@ejemplo.com" 
              className="w-full" 
              required
            />
          </div>

          <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="delivery" id="delivery" />
              <Label htmlFor="delivery">Entrega a Domicilio</Label>
            </div>
          </RadioGroup>

          {deliveryOption === 'delivery' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Dirección de Entrega</Label>
                <Input 
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Calle, Número, Colonia" 
                  className="w-full" 
                  required
                />
              </div>
              <div>
                <Label htmlFor="apt">Apartamento/Interior (opcional)</Label>
                <Input 
                  id="apt"
                  name="apt"
                  value={formData.apt}
                  onChange={handleInputChange}
                  placeholder="Ej: Interior 2" 
                  className="w-full" 
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="orderDate">Fecha de Entrega</Label>
              <Input
                type="date"
                id="orderDate"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full"
                required
              />
            </div>
            <div>
              <Label htmlFor="orderTime">Hora de Entrega</Label>
              <Input
                type="time"
                id="orderTime"
                name="orderTime"
                value={formData.orderTime}
                onChange={handleTimeChange}
                min={siteConfig.business.businessHours.start}
                max={siteConfig.business.businessHours.end}
                className="w-full"
                required
              />
              <p className={cn(
                'mt-1 text-sm',
                errorTime && 'text-destructive',
                errorTime === '' && 'text-green-900',
                errorTime === null && 'text-muted-foreground'
              )}>
                Horario: {siteConfig.business.businessHours.start} - {siteConfig.business.businessHours.end}
              </p>
            </div>
          </div>

          <div>
            <Label htmlFor="instructions">Instrucciones Especiales</Label>
            <Textarea 
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              placeholder="Ej: Sin azúcar, decoración especial, etc." 
              className="w-full" 
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground !rounded-button"
            disabled={cart.length === 0 || isSubmitting}
          >
            {isSubmitting ? <span className="flex items-center"><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Procesando... </span> : 'Enviar Pedido'}</Button>
        </div>
      </Card>
    </form>
  )
}
