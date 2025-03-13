import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { ContactFormValues } from '@/types/schema.zod'
import { siteConfig } from '@/config/site'

export const ContactTemplate = ({
  name,
  email,
  phone,
  event,
  message,
}: ContactFormValues) => {
  return (
    <Html>
      <Head />
      <Preview>Nueva solicitud de evento de {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            Nueva Solicitud de Evento - {siteConfig.business.name}
          </Heading>
          <Section style={section}>
            <Text style={text}>
              <strong>Nombre:</strong> {name}
            </Text>
            <Text style={text}>
              <strong>Teléfono:</strong> {phone}
            </Text>
            <Text style={text}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={text}>
              <strong>Tipo de Evento:</strong> {event}
            </Text>
            <Hr style={hr} />
            <Text style={text}>
              <strong>Mensaje:</strong>
            </Text>
            <Text style={messageText}>{message}</Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Este mensaje fue enviado desde el formulario de contacto de {siteConfig.business.name}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f8f6f2', // Brand background color
  color: '#352f36',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
}

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#c84c3c', // Primary brand color
  textAlign: 'center' as const,
}

const section = {
  padding: '24px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  marginTop: '24px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
}

const text = {
  fontSize: '16px',
  lineHeight: '24px',
  margin: '12px 0',
  color: '#352f36',
}

const messageText = {
  fontSize: '16px',
  lineHeight: '24px',
  margin: '12px 0',
  padding: '12px',
  backgroundColor: '#f8f6f2',
  borderRadius: '6px',
  color: '#352f36',
}

const hr = {
  borderColor: '#e0d4bc',
  margin: '20px 0',
}

const footer = {
  fontSize: '14px',
  color: '#5c3444',
  textAlign: 'center' as const,
  marginTop: '24px',
}

export default ContactTemplate
