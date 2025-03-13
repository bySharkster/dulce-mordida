import { z } from 'zod'

const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/

export const contactFormSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  phone: z.string()
    .regex(phoneRegex, 'El formato del teléfono debe ser (XXX) XXX-XXXX'),
  event: z.string().min(1, 'El tipo de evento es requerido'),
  message: z.string().min(1, 'El mensaje es requerido'),
  email: z.string().email('Correo electrónico inválido')
})

export const newsLetterSchema = z.object({
  email: z.string().email('Correo electrónico inválido')
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
export type NewsletterSubscription = z.infer<typeof newsLetterSchema>

export type OrderFormValues = z.infer<typeof orderSchema>

export type DeliveryOption = 'delivery'

export const deliveryOptionSchema = z.enum(['delivery'])

export const orderSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  phone: z.string()
    .regex(phoneRegex, 'El formato del teléfono debe ser (XXX) XXX-XXXX'),
  customerEmail: z.string().email('Email inválido'),
  deliveryOption: z.enum(['delivery']),
  orderDate: z.string().min(1, 'La fecha es requerida'),
  orderTime: z.string().regex(timeRegex, 'La hora debe estar en formato HH:MM'),
  address: z.string().min(1, 'La dirección es requerida'),
  apt: z.string().optional(),
  instructions: z.string().optional(),
})
