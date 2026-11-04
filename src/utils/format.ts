export function formatCLP(amount: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function buildWhatsAppLink(
  phoneNumber: string,
  cartItems: { name: string; quantity: number; unitPrice: number; total: number }[],
  totalAmount: number,
  customer: {
    name: string
    phone: string
    comuna: string
    region: string
    address: string
    notes?: string
    paymentMethod: string
  }
): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '')
  
  let message = `🌿 *¡HOLA RAPUNZEL ORGANIC!* 🌿\n`
  message += `Quiero confirmar mi pedido realizado desde su Catálogo Oficial Web:\n\n`
  message += `📦 *DETALLE DE MI PEDIDO:*\n`
  
  cartItems.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`
    message += `   • Cantidad: ${item.quantity} un.\n`
    message += `   • Precio: ${formatCLP(item.unitPrice)} c/u (Subtotal: ${formatCLP(item.total)})\n`
  })

  message += `\n💰 *TOTAL A PAGAR:* ${formatCLP(totalAmount)} CLP\n\n`
  message += `📍 *DATOS DE DESPACHO / CLIENTA:*\n`
  message += `• *Nombre:* ${customer.name || 'No especificado'}\n`
  message += `• *Teléfono:* ${customer.phone || 'No especificado'}\n`
  message += `• *Dirección:* ${customer.address || 'Por coordinar'}\n`
  message += `• *Comuna:* ${customer.comuna || 'Por coordinar'}\n`
  message += `• *Región:* ${customer.region || 'Por coordinar'}\n`
  message += `• *Método de Pago Preferido:* ${customer.paymentMethod === 'transferencia' ? 'Transferencia (Cuenta RUT / Banco)' : 'Tarjeta de Débito/Crédito'}\n`
  
  if (customer.notes && customer.notes.trim()) {
    message += `• *Dudas o Indicaciones:* ${customer.notes.trim()}\n`
  }

  message += `\n_Quedo atenta para coordinar los datos de pago y fecha de despacho. ¡Muchas gracias!_ ✨`

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}
