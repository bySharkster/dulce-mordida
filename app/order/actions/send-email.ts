"use server"

import { Resend } from 'resend'
import type { ReactElement } from 'react'
import OrderTemplate from '@/emails/OrderTemplate'

const resendApiKey = process.env.RESEND_API_KEY
const emailFrom = process.env.EMAIL_FROM
const emailTo = process.env.EMAIL_TO

if (!resendApiKey || !emailFrom || !emailTo) {
  throw new Error('Faltan variables de entorno requeridas para el servicio de correo')
}

const resend = new Resend(resendApiKey)

interface EmailData {
  to: string
  subject: string
  data: {
    customer: {
      name: string
      phone: string
      email: string
    }
    delivery: {
      type: string
      address?: string
      apt?: string
      date?: string
      time?: string
    }
    instructions?: string
    items: Array<{
      name: string
      quantity: number
      price: number
      total: number
    }>
    totals: {
      subtotal: number
      tax: number
      total: number
    }
  }
  orderId: string
}

export async function sendEmail({ to, subject, data, orderId }: EmailData) {
  try {
    // Ensure we have all required environment variables
    if (!emailFrom || !emailTo) {
      throw new Error('Faltan variables de entorno requeridas para el servicio de correo')
    }

    // Format the date in Spanish
    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    // Format the time in 12-hour format
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(':')
      const hour = Number.parseInt(hours, 10)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const formattedHour = hour % 12 || 12
      return `${formattedHour}:${minutes} ${ampm}`
    }

    const formattedData = {
      ...data,
      delivery: {
        ...data.delivery,
        date: data.delivery.date ? formatDate(data.delivery.date) : undefined,
        time: data.delivery.time ? formatTime(data.delivery.time) : undefined
      }
    }

    // Send email to customer
    const customerResult = await resend.emails.send({
      from: `Dulce Mordida <${emailFrom}>`,
      to: [to],
      subject: subject,
      react: OrderTemplate({ orderId, isCustomer: true, orderDetails: formattedData }) as ReactElement,
    })

    if (customerResult.error) {
      console.error('Error al enviar correo al cliente:', customerResult.error)
      return { success: false, error: customerResult.error }
    }

    // Send notification to business
    const businessResult = await resend.emails.send({
      from: `Dulce Mordida <${emailFrom}>`,
      to: [emailTo],
      subject: `Nuevo pedido: ${orderId}`,
      react: OrderTemplate({ orderId, isCustomer: false, orderDetails: formattedData }) as ReactElement,
    })

    if (businessResult.error) {
      console.error('Error al enviar correo al negocio:', businessResult.error)
      return { success: false, error: businessResult.error }
    }

    return { success: true, data: customerResult.data }
  } catch (error) {
    console.error('Error en el envío de correo:', error)
    return { success: false, error }
  }
}