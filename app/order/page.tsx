
import { ProductList } from './_components/ProductList'
import { OrderForm } from './_components/OrderForm'
export const dynamic = 'force-dynamic'

async function OrderPage() {

  return (
    <div className="container mx-auto">        
      <div className="grid grid-cols-1 gap-8 p-4 lg:mt-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProductList />            
        </div>
        <div className="lg:col-span-1">
          <OrderForm />            
        </div>
      </div>
    </div>
  )
}

export default OrderPage
