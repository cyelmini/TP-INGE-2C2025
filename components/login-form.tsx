"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Alert, AlertDescription } from "./ui/alert"
import { authService } from "../lib/auth"

interface LoginFormProps {
  onLoginSuccess?: () => void
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const tenantSlug = searchParams.get('tenant')

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      router.push("/home")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await authService.login(email, password, tenantSlug || undefined)
      
      if (onLoginSuccess) {
        onLoginSuccess()
      } else {
        router.push("/home")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl flex justify-center">
        <Card className="w-full shadow-lg rounded-2xl border border-muted bg-white/90 px-16 py-12 flex flex-col justify-center" style={{ minWidth: 400, maxWidth: 600 }}>
          <CardHeader className="pb-6">
            <div className="mb-6 w-full flex justify-center">
              <img src="/seedor-logo.png" alt="Seedor" className="h-20 w-auto drop-shadow" />
            </div>
            <CardTitle className="text-3xl font-bold mb-2 w-full text-center">Iniciar sesión</CardTitle>
            <CardDescription className="mb-2 w-full text-center">
              {tenantSlug ? (
                <>Accede a <strong>{tenantSlug}</strong></>
              ) : (
                "Ingresa a tu plataforma de gestión agropecuaria"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full p-0">
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4 w-full">
                <Label htmlFor="email" className="w-full">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="h-12 text-base px-4 w-full"
                />
              </div>
              <div className="space-y-4 w-full">
                <Label htmlFor="password" className="w-full">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-12 text-base px-4 w-full"
                />
              </div>
              
              <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </form>
            
            <div className="flex flex-col space-y-2 mt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/")}
              >
                Volver a la página principal
              </Button>
              
              <Button
                variant="link"
                className="w-full"
                onClick={() => router.push("/register")}
              >
                ¿No tienes cuenta? Crear empresa
              </Button>
            </div>

            <div className="mt-8 text-sm text-muted-foreground w-full text-center">
              <p className="text-xs">
                Sistema de gestión agrícola integral con control de empaque, 
                inventario, finanzas y tareas de campo.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
