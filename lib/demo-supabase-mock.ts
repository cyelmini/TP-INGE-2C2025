// lib/demo-supabase-mock.ts - Mock Supabase client for demo mode
import { demoData, demoOperations } from './mocks'

// Check if in demo mode
function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false
  return document.cookie.split(';').some(c => c.trim().startsWith('demo=1'))
}

// Mock Supabase query builder
class DemoQueryBuilder {
  private table: string
  private filters: any[] = []
  private selectFields = '*'
  private orderField?: string
  private orderAsc = true
  private singleMode = false

  constructor(table: string) {
    this.table = table
  }

  select(fields = '*') {
    this.selectFields = fields
    return this
  }

  eq(field: string, value: any) {
    this.filters.push({ field, op: 'eq', value })
    return this
  }

  order(field: string, options?: { ascending?: boolean }) {
    this.orderField = field
    this.orderAsc = options?.ascending !== false
    return this
  }

  single() {
    this.singleMode = true
    return this
  }

  async then(resolve: any) {
    let data = this.getData()

    // Apply filters
    if (this.filters.length > 0) {
      data = data.filter((item: any) => {
        return this.filters.every(filter => {
          if (filter.op === 'eq') {
            return item[filter.field] === filter.value
          }
          return true
        })
      })
    }

    // Apply ordering
    if (this.orderField) {
      data.sort((a: any, b: any) => {
        const aVal = a[this.orderField!]
        const bVal = b[this.orderField!]
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
        return this.orderAsc ? comparison : -comparison
      })
    }

    // Return single or array
    const result = this.singleMode ? data[0] || null : data

    return resolve({ data: result, error: null })
  }

  private getData() {
    switch (this.table) {
      case 'farms':
        return [...demoData.farms]
      case 'workers':
      case 'trabajadores':
        return [...demoData.workers]
      case 'lots':
        return [...demoData.lots]
      case 'users':
        return [...demoData.users]
      case 'tenant_memberships':
        return [...demoData.tenant_memberships]
      case 'pallets':
        return [...demoData.empaque.pallets]
      case 'ingreso_fruta':
        return [...demoData.empaque.ingreso_fruta]
      case 'egreso_fruta':
        return [...demoData.empaque.egreso_fruta]
      case 'despacho':
        return [...demoData.empaque.despacho]
      case 'preseleccion':
      case 'preproceso':
        return [...demoData.empaque.preseleccion]
      case 'inventory_items':
        return [...demoData.inventory.items]
      case 'cash_movements':
        return [...demoData.finanzas.cash_movements]
      case 'contacts':
      case 'contactos':
        return [...demoData.contacts]
      default:
        return []
    }
  }
}

// Mock insert builder
class DemoInsertBuilder {
  private table: string
  private insertData: any

  constructor(table: string, data: any) {
    this.table = table
    this.insertData = Array.isArray(data) ? data : [data]
  }

  select(fields = '*') {
    return this
  }

  single() {
    return this
  }

  async then(resolve: any) {
    const items = this.insertData.map((item: any) => {
      switch (this.table) {
        case 'farms':
          return demoOperations.createFarm(item)
        case 'workers':
        case 'trabajadores':
          return demoOperations.createWorker(item)
        case 'pallets':
          return demoOperations.create('empaque.pallets', item)
        case 'ingreso_fruta':
          return demoOperations.create('empaque.ingreso_fruta', item)
        case 'egreso_fruta':
          return demoOperations.create('empaque.egreso_fruta', item)
        case 'despacho':
          return demoOperations.create('empaque.despacho', item)
        case 'inventory_items':
          return demoOperations.create('inventory.items', item)
        case 'cash_movements':
          return demoOperations.create('finanzas.cash_movements', item)
        default:
          return { ...item, id: Math.random().toString() }
      }
    })

    const result = this.insertData.length === 1 ? items[0] : items
    console.log('[DEMO] Created:', this.table, result)
    return resolve({ data: result, error: null })
  }
}

// Mock update builder
class DemoUpdateBuilder {
  private table: string
  private updateData: any
  private filters: any[] = []

  constructor(table: string, data: any) {
    this.table = table
    this.updateData = data
  }

  eq(field: string, value: any) {
    this.filters.push({ field, value })
    return this
  }

  async then(resolve: any) {
    // Find item by filters
    const id = this.filters.find(f => f.field === 'id')?.value

    if (!id) {
      return resolve({ data: null, error: { message: 'No ID provided for update' } })
    }

    let result
    switch (this.table) {
      case 'farms':
        result = demoOperations.updateFarm(id, this.updateData)
        break
      case 'workers':
      case 'trabajadores':
        result = demoOperations.updateWorker(id, this.updateData)
        break
      default:
        result = demoOperations.update(this.table, id, this.updateData)
    }

    console.log('[DEMO] Updated:', this.table, result)
    return resolve({ data: result, error: null })
  }
}

// Mock delete builder
class DemoDeleteBuilder {
  private table: string
  private filters: any[] = []

  constructor(table: string) {
    this.table = table
  }

  eq(field: string, value: any) {
    this.filters.push({ field, value })
    return this
  }

  async then(resolve: any) {
    const id = this.filters.find(f => f.field === 'id')?.value

    if (!id) {
      return resolve({ data: null, error: { message: 'No ID provided for delete' } })
    }

    let success
    switch (this.table) {
      case 'farms':
        success = demoOperations.deleteFarm(id)
        break
      case 'workers':
      case 'trabajadores':
        success = demoOperations.deleteWorker(id)
        break
      default:
        success = demoOperations.delete(this.table, id)
    }

    console.log('[DEMO] Deleted:', this.table, id, success)
    return resolve({ data: null, error: null })
  }
}

// Mock Supabase client
export const demoSupabase = {
  from(table: string) {
    if (!isDemoMode()) {
      throw new Error('Demo Supabase should only be used in demo mode')
    }

    return {
      select(fields?: string) {
        return new DemoQueryBuilder(table).select(fields)
      },
      insert(data: any) {
        return new DemoInsertBuilder(table, data)
      },
      update(data: any) {
        return new DemoUpdateBuilder(table, data)
      },
      delete() {
        return new DemoDeleteBuilder(table)
      }
    }
  },

  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null })
  }
}

// Helper to get the right supabase client
export function getSupabaseClient(normalClient: any) {
  if (isDemoMode()) {
    console.log('[DEMO MODE] Using demo Supabase client')
    return demoSupabase
  }
  return normalClient
}
