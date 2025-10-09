"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"

export function ExitDemoButton() {
  const router = useRouter()

  const handleExitDemo = () => {
    // Delete demo cookie by setting max-age to 0
    document.cookie = 'demo=; path=/; max-age=0'

    // Redirect to landing page
    router.push('/')
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExitDemo}
      className="flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      Salir de Demo
    </Button>
  )
}

