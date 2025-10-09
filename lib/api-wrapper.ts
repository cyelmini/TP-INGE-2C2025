// lib/api-wrapper.ts - Fetch wrapper with demo mode support
import { handleGet, handlePost, handlePut, handleDelete } from './mocks-demo-handlers'

// Check if we're in demo mode (client-side)
export function isDemoRuntime(): boolean {
  if (typeof window === 'undefined') {
    // Server-side: check for demo flag passed via context
    return false
  }

  // Client-side: check cookie
  return document.cookie.split(';').some(c => c.trim().startsWith('demo=1'))
}

// Custom fetch wrapper that intercepts demo mode calls
export async function apiFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
  const method = init?.method?.toUpperCase() || 'GET'

  // If in demo mode, use mock handlers
  if (isDemoRuntime()) {
    console.log(`[DEMO MODE] Intercepting ${method} ${url}`)

    switch (method) {
      case 'GET':
        return Promise.resolve(handleGet(url, init))

      case 'POST': {
        const body = init?.body ? JSON.parse(init.body as string) : {}
        return Promise.resolve(handlePost(url, body, init))
      }

      case 'PUT': {
        const body = init?.body ? JSON.parse(init.body as string) : {}
        return Promise.resolve(handlePut(url, body, init))
      }

      case 'DELETE':
        return Promise.resolve(handleDelete(url, init))

      default:
        return Promise.resolve(handleGet(url, init))
    }
  }

  // Normal mode: use regular fetch
  return fetch(input, init)
}

// Helper functions for common API operations
export const api = {
  get: async (url: string, init?: RequestInit) => {
    const response = await apiFetch(url, { ...init, method: 'GET' })
    return response.json()
  },

  post: async (url: string, data: any, init?: RequestInit) => {
    const response = await apiFetch(url, {
      ...init,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  put: async (url: string, data: any, init?: RequestInit) => {
    const response = await apiFetch(url, {
      ...init,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  delete: async (url: string, init?: RequestInit) => {
    const response = await apiFetch(url, { ...init, method: 'DELETE' })
    return response.json()
  },
}

