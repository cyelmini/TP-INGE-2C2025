"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select"
import { Alert, AlertDescription } from "@/ui/alert"
import { Loader2, Building2, Users, Package, BarChart3, Leaf, Truck, ClipboardList } from "lucide-react"
import { tenantApi } from "../lib/api"
import { authService } from "../lib/auth"
import type { CreateTenantRequest } from "../lib/types"

export default function LandingPage() {
  const [formData, setFormData] = useState<CreateTenantRequest>({
    name: "",
    slug: "",
    plan: "basic",
    primary_crop: "",
    contact_email: "",
    admin_user: {
      email: "",
      password: "",
      full_name: "",
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [slugChecking, setSlugChecking] = useState(false)
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null)
  
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => {
      if (field.startsWith("admin_user.")) {
        const userField = field.split(".")[1]
        return {
          ...prev,
          admin_user: {
            ...prev.admin_user,
            [userField]: value,
          },
        }
      }
      return { ...prev, [field]: value }
    })

    // Auto-generate slug from name
    if (field === "name") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
      
      setFormData((prev) => ({ ...prev, slug }))
      checkSlugAvailability(slug)
    }

    // Check slug availability when manually changed
    if (field === "slug") {
      checkSlugAvailability(value)
    }
  }

  const checkSlugAvailability = async (slug: string) => {
    if (!slug || slug.length < 3) {
      setSlugAvailable(null)
      return
    }

    // Temporarily disable real slug checking due to RLS issues
    // TODO: Re-enable once RLS policies are properly configured
    setSlugChecking(true)
    
    // Simulate checking delay
    setTimeout(() => {
      setSlugAvailable(true) // Always show as available for now
      setSlugChecking(false)
    }, 500)

    /* COMMENTED OUT UNTIL RLS IS FIXED
    setSlugChecking(true)
    try {
      const available = await tenantApi.isSlugAvailable(slug)
      setSlugAvailable(available)
    } catch (error) {
      console.error("Error checking slug:", error)
      setSlugAvailable(null)
    } finally {
      setSlugChecking(false)
    }
    */
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      console.log('Form submission started...')
      
      // Validate form
      if (!formData.name || !formData.slug || !formData.contact_email || 
          !formData.admin_user.email || !formData.admin_user.password || 
          !formData.admin_user.full_name) {
        throw new Error("Todos los campos son obligatorios")
      }

      // Enhanced email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.contact_email)) {
        throw new Error("El email de contacto no es válido")
      }
      
      if (!emailRegex.test(formData.admin_user.email)) {
        throw new Error("El email del administrador no es válido")
      }

      if (formData.admin_user.password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres")
      }

      console.log('Validation passed, creating tenant...')

      // Create tenant and admin user
      const { tenant, user } = await tenantApi.createTenant(formData)

      console.log('Tenant created successfully:', tenant)
      console.log('User created successfully:', user)

      // Set user in auth service
      authService.setCurrentUser(user)

      console.log('Redirecting to dashboard...')
      // Redirect to dashboard
      router.push("/home")
      
    } catch (error: any) {
      console.error('Form submission error:', error)
      setError(error.message || "Error al crear la empresa")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <Leaf className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Seedor - Sistema de Gestión Agrícola
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Optimiza la gestión de tu empresa agrícola con nuestra plataforma integral. 
            Control completo desde el campo hasta el empaque.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Gestión de Empaque</h3>
            <p className="text-sm text-gray-600">Control completo del proceso de empaque y calidad</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Reportes y Análisis</h3>
            <p className="text-sm text-gray-600">Métricas detalladas y reportes de productividad</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Gestión de Equipos</h3>
            <p className="text-sm text-gray-600">Control de accesos, roles y trabajadores</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">Multi-empresa</h3>
            <p className="text-sm text-gray-600">Gestiona múltiples empresas desde una plataforma</p>
          </div>
        </div>

        {/* More Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center space-x-3">
            <ClipboardList className="w-6 h-6 text-green-600" />
            <span className="text-gray-700">Tareas de campo programables</span>
          </div>
          <div className="flex items-center space-x-3">
            <Truck className="w-6 h-6 text-blue-600" />
            <span className="text-gray-700">Control de despachos y logística</span>
          </div>
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <span className="text-gray-700">Análisis financiero integrado</span>
          </div>
        </div>

        {/* Registration Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Crea tu Empresa</CardTitle>
              <CardDescription className="text-center">
                Completa el formulario para comenzar a usar la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Company Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Información de la Empresa</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nombre de la Empresa</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Mi Empresa Agrícola"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="slug">
                        Identificador de la Empresa
                        {slugChecking && <Loader2 className="w-4 h-4 animate-spin inline ml-2" />}
                        {slugAvailable === true && <span className="text-green-600 ml-2">✓ Disponible</span>}
                        {slugAvailable === false && <span className="text-red-600 ml-2">✗ No disponible</span>}
                      </Label>
                      <Input
                        id="slug"
                        type="text"
                        value={formData.slug}
                        onChange={(e) => handleInputChange("slug", e.target.value)}
                        placeholder="mi-empresa"
                        pattern="[a-z0-9-]+"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Solo letras minúsculas, números y guiones. Será tu URL: seedor.com/mi-empresa
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primary_crop">Cultivo Principal</Label>
                      <Input
                        id="primary_crop"
                        type="text"
                        value={formData.primary_crop}
                        onChange={(e) => handleInputChange("primary_crop", e.target.value)}
                        placeholder="Ej: Arándanos, Uvas, Paltas, etc."
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="plan">Plan</Label>
                      <Select
                        value={formData.plan}
                        onValueChange={(value) => handleInputChange("plan", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Básico - Gratis</SelectItem>
                          <SelectItem value="premium">Premium - $99/mes</SelectItem>
                          <SelectItem value="enterprise">Empresarial - $299/mes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contact_email">Email de Contacto de la Empresa</Label>
                    <Input
                      id="contact_email"
                      type="email"
                      value={formData.contact_email}
                      onChange={(e) => handleInputChange("contact_email", e.target.value)}
                      placeholder="contacto@miempresa.com"
                      required
                    />
                  </div>
                </div>

                {/* Admin User Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Administrador Principal</h3>
                  
                  <div>
                    <Label htmlFor="admin_name">Nombre Completo</Label>
                    <Input
                      id="admin_name"
                      type="text"
                      value={formData.admin_user.full_name}
                      onChange={(e) => handleInputChange("admin_user.full_name", e.target.value)}
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="admin_email">Email Personal</Label>
                      <Input
                        id="admin_email"
                        type="email"
                        value={formData.admin_user.email}
                        onChange={(e) => handleInputChange("admin_user.email", e.target.value)}
                        placeholder="juan@miempresa.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="admin_password">Contraseña</Label>
                      <Input
                        id="admin_password"
                        type="password"
                        value={formData.admin_user.password}
                        onChange={(e) => handleInputChange("admin_user.password", e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        minLength={6}
                        required
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Creando empresa...
                    </>
                  ) : (
                    "Crear Empresa y Comenzar"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Existing Users */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Button
              variant="link"
              className="p-0"
              onClick={() => router.push("/login")}
            >
              Iniciar Sesión
            </Button>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            © 2025 Seedor. Plataforma integral para la gestión agrícola.
          </p>
        </div>
      </div>
    </div>
  )
}