import { supabase } from './supabaseClient'
import { tenantApi } from './api'
import type { Tenant } from './types'

export interface AuthUser {
  id: string
  email: string
  nombre: string
  tenantId: string
  rol: "Admin" | "Campo" | "Empaque" | "Finanzas" | "Usuario"
  tenant: Tenant
}

class AuthService {
  private currentUser: AuthUser | null = null

  // Login with tenant awareness
  async login(email: string, password: string, tenantSlug?: string): Promise<AuthUser> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    if (!data.user) throw new Error("No user data")

    // Get user's tenant memberships
    const tenants = await tenantApi.getUserTenants(data.user.id)
    
    if (tenants.length === 0) {
      throw new Error("Usuario no pertenece a ninguna empresa")
    }

    // If tenant slug provided, verify user belongs to that tenant
    let selectedTenant = tenants[0] // Default to first tenant
    if (tenantSlug) {
      const tenant = tenants.find(t => t.slug === tenantSlug)
      if (!tenant) {
        throw new Error("No tienes acceso a esta empresa")
      }
      selectedTenant = tenant
    }

    // Get user's role in the selected tenant
    const membership = await tenantApi.getUserMembership(data.user.id, selectedTenant.id)
    if (!membership) {
      throw new Error("No tienes permisos en esta empresa")
    }

    const user: AuthUser = {
      id: data.user.id,
      email: data.user.email!,
      tenantId: selectedTenant.id,
      rol: membership.role_code === 'admin' ? 'Admin' : 'Usuario',
      nombre: data.user.user_metadata?.full_name || data.user.email!,
      tenant: selectedTenant,
    }

    this.currentUser = user
    this.storeUser(user)
    return user
  }

  // Set current user (used during tenant creation)
  setCurrentUser(user: AuthUser): void {
    this.currentUser = user
    this.storeUser(user)
  }

  async logout(): Promise<void> {
    await supabase.auth.signOut()
    this.currentUser = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_user")
    }
  }

  getCurrentUser(): AuthUser | null {
    if (this.currentUser) {
      return this.currentUser
    }

    // Try to restore from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("auth_user")
      if (stored) {
        try {
          this.currentUser = JSON.parse(stored)
          return this.currentUser
        } catch {
          localStorage.removeItem("auth_user")
        }
      }
    }

    return null
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  hasRole(roles: string[]): boolean {
    const user = this.getCurrentUser()
    return user ? roles.includes(user.rol) : false
  }

  // Get available tenants for user
  async getUserTenants(userId: string): Promise<Tenant[]> {
    return await tenantApi.getUserTenants(userId)
  }

  // Switch tenant (for users who belong to multiple tenants)
  async switchTenant(tenantSlug: string): Promise<AuthUser> {
    const currentUser = this.getCurrentUser()
    if (!currentUser) {
      throw new Error("Usuario no autenticado")
    }

    const tenants = await this.getUserTenants(currentUser.id)
    const tenant = tenants.find(t => t.slug === tenantSlug)
    
    if (!tenant) {
      throw new Error("No tienes acceso a esta empresa")
    }

    // Get user's role in the new tenant
    const membership = await tenantApi.getUserMembership(currentUser.id, tenant.id)
    if (!membership) {
      throw new Error("No tienes permisos en esta empresa")
    }

    const updatedUser: AuthUser = {
      ...currentUser,
      tenantId: tenant.id,
      rol: membership.role_code === 'admin' ? 'Admin' : 'Usuario',
      tenant: tenant,
    }

    this.currentUser = updatedUser
    this.storeUser(updatedUser)
    return updatedUser
  }

  private storeUser(user: AuthUser): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_user", JSON.stringify(user))
    }
  }

  // Check if current session is valid
  async checkSession(): Promise<AuthUser | null> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error || !session) {
        this.currentUser = null
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_user")
        }
        return null
      }

      // If we have a stored user and session is valid, return stored user
      const storedUser = this.getCurrentUser()
      if (storedUser) {
        return storedUser
      }

      return null
    } catch (error) {
      console.error('Error checking session:', error)
      return null
    }
  }
}

export const authService = new AuthService()
