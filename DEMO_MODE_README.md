# Demo Mode Implementation - Seedor

## Overview
Complete demo mode implementation that allows users to explore the full platform without authentication, with all features enabled (Professional plan), and without persisting any data to the database.

## ✅ Implementation Complete

### Files Created/Modified

#### Created Files:
1. **`app/demo/route.ts`** - Demo entry point that sets cookie and redirects to /home
2. **`lib/mocks.ts`** - Comprehensive demo data for all modules
3. **`lib/mocks-demo-handlers.ts`** - API handlers that intercept requests in demo mode
4. **`lib/api-wrapper.ts`** - Fetch wrapper with demo mode detection
5. **`components/ExitDemoButton.tsx`** - Button to exit demo mode

#### Modified Files:
1. **`lib/plan-features.ts`** - Added `getPlanFeatures()` and `getProfessionalPlanConfig()`
2. **`lib/features-context.tsx`** - Added demo mode detection and `getRuntimeFeatures()`
3. **`middleware.ts`** - Bypasses auth guards when demo cookie is set
4. **`components/layout/protected-layout.tsx`** - Shows demo banner when active
5. **`components/sidebar.tsx`** - Shows ExitDemoButton in demo mode
6. **`app/page.tsx`** - Added "Ver demo" CTA button
7. **`hooks/use-auth.ts`** - Provides mock admin user in demo mode

## How It Works

### 1. Entry Point (`/demo`)
- User clicks "Ver demo" on landing page → navigates to `/demo`
- Route handler sets `demo=1` cookie (httpOnly: false, sameSite: 'lax', path: '/', 24h expiry)
- Redirects to `/home`

### 2. Authentication Bypass
- `middleware.ts` allows all protected routes when `demo=1` cookie is present
- `useAuth` hook detects demo cookie and provides mock admin user:
  ```typescript
  {
    id: 'demo-user-id',
    email: 'demo@seedor.com',
    nombre: 'Usuario Demo',
    rol: 'Admin',
    tenant: {
      id: 'demo-tenant',
      name: 'Demo Empresa',
      plan: 'professional'
    }
  }
  ```

### 3. Feature Access
- `features-context.tsx` detects demo mode and enables all features
- Returns Professional plan with unlimited limits
- All modules accessible: campo, trabajadores, inventario, empaque, finanzas, contactos

### 4. Data Layer
- **Read Operations**: Mock data served from `lib/mocks.ts`
- **Write Operations**: Return success but don't persist
- API wrapper (`lib/api-wrapper.ts`) intercepts all fetch calls in demo mode
- Mock handlers route GET requests to demo datasets
- POST/PUT/DELETE return `{ ok: true, demo: true, persisted: false }`

### 5. User Experience
- Yellow banner at top: "Estás viendo la Demo: podés probar todo, pero no se guarda."
- "Salir de Demo" button in sidebar (when expanded)
- All forms work normally, show success messages
- Page refresh reloads seed data (no persistence)

### 6. Exit Demo
- Click "Salir de Demo" button
- Cookie deleted: `document.cookie = 'demo=; path=/; max-age=0'`
- Redirects to landing page `/`

## Demo Data Included

### Campo (Farms)
- 2 farms with lots, crops, locations

### Trabajadores (Workers)
- 3 workers with different roles (Admin, Supervisor, Operario)

### Inventario (Inventory)
- Items, categories, locations, movements
- Fertilizers, agrochemicals with stock levels

### Empaque (Packing)
- Pallets, ingreso_fruta, egreso_fruta, despacho, preseleccion
- Complete packing workflow data

### Finanzas (Finance)
- Cash categories (income/expense)
- Movement records with amounts and descriptions

### Contactos (Contacts)
- Clients and suppliers

## Testing the Implementation

### Test Flow:
1. Navigate to landing page `/`
2. Click "Ver demo" button
3. Redirected to `/home` with demo mode active
4. See yellow banner: "Estás viendo la Demo..."
5. Navigate through all modules (all unlocked)
6. Try CRUD operations:
   - Create campo/worker/inventory item
   - Edit existing record
   - Delete record
   - Refresh page → changes gone (data reseeds)
7. Click "Salir de Demo" → back to landing

### Verify Demo Mode:
```javascript
// In browser console
document.cookie.includes('demo=1') // Should be true in demo mode
```

## Technical Details

### Cookie Configuration:
```typescript
{
  httpOnly: false,      // Accessible to JavaScript
  sameSite: 'lax',      // CSRF protection
  path: '/',            // Available site-wide
  maxAge: 60 * 60 * 24  // 24 hours
}
```

### API Interception Flow:
```
User Action → Component → API Call → api-wrapper.ts
                                           ↓
                                     isDemoRuntime()?
                                      ↙           ↘
                                   YES            NO
                                    ↓              ↓
                          mocks-demo-handlers  fetch()
                                    ↓              ↓
                            Mock Response    Real API
```

### Plan Features (Professional):
- All modules enabled
- Unlimited users
- Unlimited fields
- All advanced features
- No trial restrictions

## Notes

- No Supabase calls made in demo mode
- No RLS policies affected
- Original authentication flow unchanged
- Re-entering `/demo` resets the 24h cookie expiry
- Cookie auto-expires after 24 hours
- No new dependencies added
- Works with existing UI components

## DoD Checklist ✅

- [x] Navigate to `/demo` → redirects to `/home` with banner
- [x] Demo cookie set correctly
- [x] Professional plan active with all modules
- [x] Banner shows "Estás viendo la Demo: podés probar todo, pero no se guarda."
- [x] All CRUD operations "work" without persisting
- [x] Page refresh reloads seed data
- [x] "Salir de Demo" clears cookie and returns to landing
- [x] Re-entering demo rehydrates seed data
- [x] No Supabase calls in demo mode
- [x] Exact file names and exports as specified
- [x] No new dependencies introduced

## Future Enhancements (Optional)

- Add demo mode analytics tracking
- Customize demo data per industry/crop type
- Guided tour/tooltips in demo mode
- Demo session timeout warning
- Share demo state via URL parameters

