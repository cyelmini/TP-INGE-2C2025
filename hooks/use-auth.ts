// hooks/use-auth.ts
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser, useUserActions } from "../components/auth/UserContext";
import { useEmpaqueAuth } from "../components/empaque/EmpaqueAuthContext";
import { authService } from "../lib/supabaseAuth";
import { getSessionManager } from "../lib/sessionManager";

declare global {
  interface Window {
    empaqueLayoutUser?: any;
  }
}

// Check if in demo mode
function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false
  return document.cookie.split(';').some(c => c.trim().startsWith('demo=1'))
}

// Create demo user
function getDemoUser() {
  return {
    id: 'demo-user-id',
    email: 'demo@seedor.com',
    nombre: 'Usuario Demo',
    apellido: 'Seedor',
    rol: 'Admin',
    tenantId: 'demo-tenant',
    tenant_id: 'demo-tenant',
    tenant: {
      id: 'demo-tenant',
      name: 'Demo Empresa',
      plan: 'professional',
      slug: 'demo'
    }
  }
}

export function useAuth(options: {
  redirectToLogin?: boolean; 
  requireRoles?: string[];   
  useLayoutSession?: boolean; 
} = {}) {
  const { redirectToLogin = true, requireRoles = [], useLayoutSession = false } = options;
  const { user: contextUser, loading: contextLoading } = useUser();
  const { clearUser } = useUserActions();
  const [activeUser, setActiveUser] = useState<any>(null);
  const router = useRouter();
  
  const sessionCheckAttempted = useRef(false);
  const isSubpageUsingLayout = useRef(useLayoutSession);
  
  const [authChecking, setAuthChecking] = useState(true);
  
  // Check for demo mode first
  useEffect(() => {
    if (isDemoMode()) {
      setActiveUser(getDemoUser())
      setAuthChecking(false)
      return
    }
  }, [])

  const checkAndGetSession = async () => {
    if (sessionCheckAttempted.current) return;
    sessionCheckAttempted.current = true;
    
    // If in demo mode, use demo user
    if (isDemoMode()) {
      setActiveUser(getDemoUser())
      setAuthChecking(false)
      return
    }

    try {
      const sessionManager = getSessionManager();
      
      // Primero intentar obtener de la sesión de la pestaña
      let tabUser = sessionManager.getCurrentUser();
      
      if (tabUser) {
        setActiveUser(tabUser);
        setAuthChecking(false);
        return;
      }

      // Si no hay sesión de pestaña, verificar con getSafeSession
      const { user: sessionUser, error } = await authService.getSafeSession();
      
      if (sessionUser) {
        setActiveUser(sessionUser);
        setAuthChecking(false);
        return;
      }
      
      if (error) {
        console.error('Session check error:', error);
      }
      
      setAuthChecking(false);
      
      if (redirectToLogin && !isSubpageUsingLayout.current) {
        setTimeout(() => {
          if (!getParentUser() && !activeUser && !contextUser) {
            router.push("/login");
          }
        }, 100);
      }
    } catch (err) {
      console.error('Error checking session:', err);
      setAuthChecking(false);
    }
  };

  useEffect(() => {
    // Demo mode bypass
    if (isDemoMode()) {
      setActiveUser(getDemoUser())
      setAuthChecking(false)
      return
    }

    if (isSubpageUsingLayout.current) {
      setAuthChecking(false);
      return;
    }
    
    const sessionManager = getSessionManager();
    
    // Primero intentar la sesión de la pestaña
    const tabUser = sessionManager.getCurrentUser();
    if (tabUser) {
      setActiveUser(tabUser);
      setAuthChecking(false);
      return;
    }
    
    // Luego el contexto
    if (contextUser) {
      setActiveUser(contextUser);
      setAuthChecking(false);
      return;
    }
    
    // Finalmente verificar sesión
    if (contextLoading || (!contextUser && !tabUser)) {
      checkAndGetSession();
    } else {
      setAuthChecking(false);
    }
  }, [contextUser, contextLoading, router, redirectToLogin]);

  let empaqueUser = null;
  try {
    const empaqueAuth = useEmpaqueAuth();
    empaqueUser = empaqueAuth?.empaqueUser;
  } catch (err) {
    console.warn('Error accessing EmpaqueAuthContext:', err);
  }
  
  const getParentUser = () => {
    if (empaqueUser) {
      return empaqueUser;
    }
    
    if (typeof window !== 'undefined' && window.empaqueLayoutUser) {
      return window.empaqueLayoutUser;
    }
    
    return null;
  };
  
  useEffect(() => {
    if (useLayoutSession && !empaqueUser && !getParentUser() && typeof window !== 'undefined') {
      let attempts = 0;
      const maxAttempts = 15;
      const checkInterval = setInterval(() => {
        attempts++;
        
        let latestEmpaqueUser = null;
        try {
          if (typeof window !== 'undefined' && window.empaqueLayoutUser) {
            latestEmpaqueUser = window.empaqueLayoutUser;
          }
        } catch (err) {
          console.error("Error checking for user:", err);
        }
        
        const windowUser = typeof window !== 'undefined' ? window.empaqueLayoutUser : null;
        
        const foundUser = latestEmpaqueUser || windowUser;
        
        if (foundUser) {
          setActiveUser(foundUser);
          setAuthChecking(false);
          clearInterval(checkInterval);
        } else if (attempts >= maxAttempts) {
          if (contextUser) {
            setActiveUser(contextUser);
          } else {
            checkAndGetSession();
          }
          clearInterval(checkInterval);
        }
      }, 200); 
      
      return () => clearInterval(checkInterval);
    }
  }, [useLayoutSession, contextUser]);
  
  const parentUser = useLayoutSession ? (empaqueUser || getParentUser()) : null;
  const sessionManager = getSessionManager();
  
  const tabUser = activeUser ? null : sessionManager.peekCurrentUser();
  
  const currentUser = parentUser || (activeUser === null ? null : (activeUser || tabUser || contextUser));
  
  const hasRequiredRole = isSubpageUsingLayout.current ? true : (
    !currentUser ? false : (
      requireRoles.length === 0 || 
      requireRoles.some(role => role.toLowerCase() === currentUser.rol?.toLowerCase())
    )
  );
  

  
  useEffect(() => {
    if (isSubpageUsingLayout.current) return;
    
    if (authChecking || contextLoading) {
      return;
    }
    
    // Si no hay usuario, no hacer validaciones de roles
    if (!currentUser) {
      return;
    }
    
    // Si el usuario no tiene rol, probablemente esté en proceso de logout
    // No hacer validaciones en este caso
    if (!currentUser.rol) {

      return;
    }
    
    // Solo validar roles si hay usuario completo con rol
    if (requireRoles.length > 0 && !hasRequiredRole) {
      console.log('🚨 useAuth: Role validation failed. Required:', requireRoles, 'User role:', currentUser?.rol, 'Redirecting to /home');
      router.push("/home");
    }
  }, [currentUser, hasRequiredRole, requireRoles, router, authChecking, contextLoading]);

  if (currentUser && !currentUser.tenant) {
    currentUser.tenant = {
      name: 'Tu Empresa',
      id: currentUser.tenantId || '',
      plan: 'enterprise',
      status: 'active',
      created_at: new Date().toISOString(),
      slug: 'empresa'
    };
  }

  if (currentUser && !currentUser.worker) {
    currentUser.worker = {
      id: currentUser.id || 'temp-id',
      full_name: currentUser.nombre || 'Usuario',
      email: currentUser.email,
      tenant_id: currentUser.tenantId || '',
      area_module: currentUser.rol?.toLowerCase() || 'general',
      status: 'active'
    };
  }

  const handleLogout = async () => {
    // If in demo mode, just clear cookie and redirect
    if (isDemoMode()) {
      document.cookie = 'demo=; path=/; max-age=0'
      router.push('/')
      return
    }

    try {
      // Primero limpiar todos los estados locales inmediatamente
      setActiveUser(null);
      clearUser(); // Limpiar también el UserContext
      
      // Limpiar el contexto de ventana
      if (typeof window !== 'undefined') {
        window.empaqueLayoutUser = undefined;
      }
      
      // Luego hacer el logout del servicio
      await authService.logout();
      

      
      // Redirigir inmediatamente
      router.push("/login");
      
    } catch (error) {

      // Aún así redirigir a login si hay error
      router.push("/login");
    }
  };

  return {
    user: currentUser,
    loading: authChecking || contextLoading,
    hasRequiredRole,
    handleLogout,
  };
}