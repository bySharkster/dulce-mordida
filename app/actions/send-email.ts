"use server"

import { Resend } from 'resend'
import type { ContactFormValues } from '@/types/schema.zod'
import { ContactTemplate } from '@/emails/ContactTemplate'
import type { ReactElement } from 'react'

const resendApiKey = process.env.RESEND_API_KEY
const emailFrom = process.env.EMAIL_FROM
const emailTo = process.env.EMAIL_TO

if (!resendApiKey || !emailFrom || !emailTo) {
  throw new Error('Missing required environment variables for email service')
}

const resend = new Resend(resendApiKey)

export async function sendEmail(formData: ContactFormValues) {
  try {
    const { data, error } = await resend.emails.send({
      from: `Dulce Mordida <${emailFrom}>`,
      to: [`${emailTo}`],
      subject: `Nueva solicitud de evento - ${formData.name}`,
      react: ContactTemplate(formData) as ReactElement,
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}