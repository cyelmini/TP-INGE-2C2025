// lib/mocks-demo-handlers.ts - Demo mode API handlers
import { demoData } from './mocks'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export function handleGet(path: string, init?: RequestInit): Response {
  // Campo endpoints
  if (path.includes('/api/campo/farms')) {
    return new Response(JSON.stringify(demoData.farms), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (path.includes('/api/campo/lots')) {
    return new Response(JSON.stringify(demoData.lots), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Trabajadores endpoints
  if (path.includes('/api/trabajadores') || path.includes('/api/workers')) {
    return new Response(JSON.stringify(demoData.workers), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Inventario endpoints
  if (path.includes('/api/inventario/items')) {
    return new Response(JSON.stringify(demoData.inventory.items), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (path.includes('/api/inventario/categories')) {
    return new Response(JSON.stringify(demoData.inventory.categories), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (path.includes('/api/inventario/locations')) {
    return new Response(JSON.stringify(demoData.inventory.locations), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (path.includes('/api/inventario/movements')) {
    return new Response(JSON.stringify(demoData.inventory.movements), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Empaque endpoints
  if (path.includes('/api/empaque/pallets')) {
    return new Response(JSON.stringify(demoData.empaque.pallets), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (path.includes('/api/empaque/ingreso-fruta')) {
    return new Response(JSON.stringify(demoData.empaque.ingreso_fruta), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (path.includes('/api/empaque/egreso-fruta')) {
    return new Response(JSON.stringify(demoData.empaque.egreso_fruta), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (path.includes('/api/empaque/despacho')) {
    return new Response(JSON.stringify(demoData.empaque.despacho), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (path.includes('/api/empaque/preseleccion') || path.includes('/api/empaque/preproceso')) {
    return new Response(JSON.stringify(demoData.empaque.preseleccion), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Finanzas endpoints
  if (path.includes('/api/finanzas/categories')) {
    return new Response(JSON.stringify(demoData.finanzas.categories), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (path.includes('/api/finanzas/movements') || path.includes('/api/finanzas/cash-movements')) {
    return new Response(JSON.stringify(demoData.finanzas.cash_movements), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Contactos endpoints
  if (path.includes('/api/contactos') || path.includes('/api/contacts')) {
    return new Response(JSON.stringify(demoData.contacts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Default: return empty array
  return new Response(JSON.stringify([]), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function handlePost(path: string, body: any, init?: RequestInit): Response {
  // All POST requests in demo mode succeed without persisting
  return new Response(
    JSON.stringify({
      ok: true,
      demo: true,
      persisted: false,
      message: 'Demo: Operation successful but not saved',
      data: body
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  )
}

export function handlePut(path: string, body: any, init?: RequestInit): Response {
  // All PUT requests in demo mode succeed without persisting
  return new Response(
    JSON.stringify({
      ok: true,
      demo: true,
      persisted: false,
      message: 'Demo: Update successful but not saved',
      data: body
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  )
}

export function handleDelete(path: string, init?: RequestInit): Response {
  // All DELETE requests in demo mode succeed without persisting
  return new Response(
    JSON.stringify({
      ok: true,
      demo: true,
      persisted: false,
      message: 'Demo: Deletion successful but not saved'
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  )
}

