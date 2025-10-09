"use client"

import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "../sidebar"
import { FeatureProvider, useFeatures } from "../../lib/features-context"
import { useAuth } from "../../hooks/use-auth"
import { AlertCircle } from "lucide-react"

interface HeaderProps {
  title: string
  subtitle?: string
  user: any
  handleLogout: () => Promise<void>
}

function Header({ title, subtitle, user, handleLogout }: HeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">
            {subtitle || `${title} - ${user?.tenant?.name || 'Tu Empresa'}`}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium">{user?.nombre || user?.email}</p>
            <p className="text-xs text-muted-foreground">{user?.rol || 'Usuario'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

function DemoBanner() {
  return (
    <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-3">
      <div className="flex items-center gap-3 text-yellow-800">
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm font-medium">
          Estás viendo la Demo: podés probar todo, pero no se guarda.
        </p>
      </div>
    </div>
  )
}

function LayoutContent({
  children,
  title,
  subtitle,
  currentPage,
  user,
  handleLogout
}: {
  children: ReactNode
  title: string
  subtitle?: string
  currentPage: string
  user: any
  handleLogout: () => Promise<void>
}) {
  const { isDemo } = useFeatures()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        user={user}
        onLogout={handleLogout}
        onNavigate={(page) => {
          // Map page names to their correct routes
          const pageRoutes: Record<string, string> = {
            dashboard: "/home",
            campo: "/campo",
            empaque: "/empaque",
            inventario: "/inventario",
            finanzas: "/finanzas",
            ajustes: "/ajustes",
            trabajadores: "/trabajadores",
            contactos: "/contactos",
          };

          const targetRoute = pageRoutes[page] || "/home";
          router.push(targetRoute);
        }}
        currentPage={currentPage}
      />
      <div className="flex-1 flex flex-col">
        {isDemo && <DemoBanner />}
        <Header
          user={user}
          title={title}
          subtitle={subtitle}
          handleLogout={handleLogout}
        />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

interface ProtectedLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
  currentPage: string
  requiredRoles?: string[]
}

export function ProtectedLayout({
  children,
  title,
  subtitle,
  currentPage,
  requiredRoles = ["Admin"]
}: ProtectedLayoutProps) {
  const { user, loading, handleLogout } = useAuth({
    redirectToLogin: true,
    requireRoles: requiredRoles
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <FeatureProvider user={user}>
      <LayoutContent
        user={user}
        title={title}
        subtitle={subtitle}
        currentPage={currentPage}
        handleLogout={handleLogout}
      >
        {children}
      </LayoutContent>
    </FeatureProvider>
  )
}