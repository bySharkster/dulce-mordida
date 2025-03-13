"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'motion/react'

export default function SuccessPage() {
    const [countdown, setCountdown] = useState(5)
    
    setTimeout(() => {
      window.location.href = '/'
    }, 5000)
    
    useEffect(() => {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }, [])
    
  return (
    <div className="container flex flex-col justify-center items-center mx-auto min-h-screen text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="mb-4 text-4xl font-bold"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ¡Pedido realizado con éxito!
        </motion.h1>
        <motion.i 
          className="mb-6 text-6xl text-green-500 fas fa-check-circle"
          initial={{ rotate: 180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
        <motion.p 
          className="mb-8 text-xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Gracias por tu pedido. Nos pondremos en contacto contigo pronto.
        </motion.p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button asChild>
            <Link href="/">Volver al Inicio</Link>
          </Button>
          <p className="mt-2 text-sm">
            Redirigiendo al inicio en {countdown} segundos...
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
