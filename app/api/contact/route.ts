import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ContactTemplate } from '@/emails/ContactTemplate'
import type { ReactElement } from 'react'
import { contactFormSchema } from '@/types/schema.zod'
import { siteConfig } from '@/config/site'

const resendApiKey = process.env.RESEND_API_KEY ?? ''
const emailFrom = process.env.EMAIL_FROM ?? ''
const emailTo = process.env.EMAIL_TO ?? ''

if (!resendApiKey || !emailFrom || !emailTo) {
  throw new Error('Missing required environment variables for email service')
}

const resend = new Resend(resendApiKey)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = contactFormSchema.parse(body)

    const { data, error } = await resend.emails.send({
      from: `${siteConfig.business.name} <${emailFrom}>`,
      to: [emailTo],
      subject: `Nueva solicitud de evento - ${validatedData.name}`,
      react: ContactTemplate(validatedData) as ReactElement,
    })

    if (error) {
      console.error('Error sending email:', error)
      return NextResponse.json(
        { success: false, error: 'Error al enviar el mensaje' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in contact API:', error)
    return NextResponse.json(
      { success: false, error: 'Error al procesar la solicitud' },
      { status: 400 }
    )
  }
}
