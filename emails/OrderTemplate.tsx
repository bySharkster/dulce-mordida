import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface OrderTemplateProps {
  orderId: string
  isCustomer: boolean
  orderDetails: {
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
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
}

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  padding: '17px 0 0',
}

const section = {
  padding: '24px',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  marginBottom: '24px',
}

const text = {
  margin: '0 0 10px 0',
  color: '#484848',
  fontSize: '16px',
  lineHeight: '24px',
}

const itemRow = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '8px 0',
}

export default function OrderTemplate({
  orderId,
  isCustomer,
  orderDetails,
}: OrderTemplateProps) {
  const title = isCustomer 
    ? `Recibo de su pedido: ${orderId}`
    : `Nuevo pedido: ${orderId}`

  return (
    <Html>
      <Head />
      <Preview>{title}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            {isCustomer ? '¡Gracias por su pedido!' : 'Nuevo Pedido Recibido'}
          </Heading>

          <Section style={section}>
            <Text style={text}>
              <strong>Número de Orden:</strong> {orderId}
            </Text>
            <Text style={text}>
              <strong>Cliente:</strong> {orderDetails.customer.name}
            </Text>
            <Text style={text}>
              <strong>Teléfono:</strong> {orderDetails.customer.phone}
            </Text>
            <Text style={text}>
              <strong>Email:</strong> {orderDetails.customer.email}
            </Text>
          </Section>

          <Section style={section}>
            <Text style={text}>
              <strong>Tipo de Entrega:</strong> {orderDetails.delivery.type === 'delivery' ? 'Entrega a Domicilio' : 'Recoger en Tienda'}
            </Text>
            {orderDetails.delivery.type === 'delivery' && (
              <>
                <Text style={text}>
                  <strong>Dirección:</strong> {orderDetails.delivery.address}
                </Text>
                {orderDetails.delivery.apt && (
                  <Text style={text}>
                    <strong>Apartamento/Interior:</strong> {orderDetails.delivery.apt}
                  </Text>
                )}
              </>
            )}
            {orderDetails.delivery.date && (
              <Text style={text}>
                <strong>Fecha de Entrega:</strong> {orderDetails.delivery.date}
              </Text>
            )}
            {orderDetails.delivery.time && (
              <Text style={text}>
                <strong>Hora de Entrega:</strong> {orderDetails.delivery.time}
              </Text>
            )}
          </Section>

          <Section style={section}>
            <Text style={text}>
              <strong>Productos:</strong>
            </Text>
            {orderDetails.items.map((item, i) => (
              <div key={`${item.name}-${i}`} style={itemRow}>
                <Text style={text}>
                  {item.quantity}x {item.name}
                </Text>
                <Text style={text}>
                  ${item.total.toFixed(2)}
                </Text>
              </div>
            ))}
            <hr style={{ margin: '16px 0', border: '1px solid #dedede' }} />
            <div style={itemRow}>
              <Text style={text}><strong>Subtotal:</strong></Text>
              <Text style={text}>${orderDetails.totals.subtotal.toFixed(2)}</Text>
            </div>
            <div style={itemRow}>
              <Text style={text}><strong>Impuesto:</strong></Text>
              <Text style={text}>${orderDetails.totals.tax.toFixed(2)}</Text>
            </div>
            <div style={itemRow}>
              <Text style={text}><strong>Total:</strong></Text>
              <Text style={text}>${orderDetails.totals.total.toFixed(2)}</Text>
            </div>
          </Section>

          {orderDetails.instructions && (
            <Section style={section}>
              <Text style={text}>
                <strong>Instrucciones Especiales:</strong>
              </Text>
              <Text style={text}>{orderDetails.instructions}</Text>
            </Section>
          )}

          <Section style={section}>
            <Text style={text}>
              <strong>Dulce Mordida</strong>
            </Text>
            <Text style={text}>
              <strong>Teléfono:</strong> (787) 466-2860
            </Text>
            <Text style={text}>
              <strong>WhatsApp:</strong> +1 787-466-2860
            </Text>
            <Text style={text}>
              <strong>Email:</strong> ashleystephanie_am@hotmail.com
            </Text>
            <Text style={text}>
              <strong>Instagram:</strong> @dulce_mordida2024
            </Text>
            <Text style={text}>
              <strong>Facebook:</strong> profile.php?id=100083089694450
            </Text>
            <Text style={text}>
              <strong>Ubicación:</strong> Mayagüez, Puerto Rico
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}