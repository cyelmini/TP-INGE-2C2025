# 🎭 GUÍA COMPLETA DE PLAYWRIGHT - Paso a Paso

## 📋 ¿Qué es Playwright y para qué sirve?

Playwright es una herramienta de **testing E2E (End-to-End)** que simula usuarios reales interactuando con tu aplicación en un navegador.

### **¿Qué hace Playwright?**
- 🎭 Abre navegadores reales (Chrome, Firefox, Safari)
- 🖱️ Simula clicks, escritura, navegación como usuario real
- 📸 Toma screenshots automáticamente cuando algo falla
- 📹 Graba videos de los tests
- 🔍 Genera traces para debug (time-travel debugging)
- 🦊 Prueba en múltiples navegadores simultáneamente

### **¿Por qué es importante?**
- Detecta bugs de UI antes que los usuarios
- Valida que los flujos completos funcionen
- Prueba en Chrome, Firefox y Safari automáticamente
- Te da evidencia visual (screenshots/videos) de qué falló
- Simula exactamente lo que hace un usuario real

---

## ⚙️ Configuración - Ya está todo listo

### **¿Necesitas algo en la nube?**
❌ **NO** - Todo corre 100% local desde tu terminal.

### **¿Qué necesitas?**
```bash
✅ Servidor corriendo en localhost:3000
✅ pnpm install (ya ejecutado)
✅ Navegadores instalados (Playwright los instaló automáticamente)
```

---

## 📁 Archivos de tests en tu proyecto

### **Estructura:**
```
tests/e2e/
  auth.spec.ts              ← Tests de autenticación
  campo.create.spec.ts      ← Tests de crear campos
  empaque.ingreso.spec.ts   ← Tests de ingreso de fruta
  fixtures/
    test-data.ts            ← Datos de prueba reutilizables
  helpers/
    auth.helper.ts          ← Funciones de login reutilizables
```

---

## 🎯 ¿Qué hace cada archivo de test?

### **1. auth.spec.ts** - Tests de Autenticación
**Ubicación:** `tests/e2e/auth.spec.ts`

**¿Qué prueba? (8 tests)**
1. ✅ Renderiza página de login correctamente
2. ✅ Login exitoso con credenciales válidas
3. ✅ Rechaza credenciales inválidas
4. ✅ Valida campos vacíos
5. ✅ Valida formato de email
6. ✅ Permite cerrar sesión
7. ✅ Muestra enlace de recuperación de contraseña
8. ✅ Protege rutas privadas sin autenticación

**Ejemplo de lo que hace:**
```typescript
// Simula un usuario real:
1. Abre página /login
2. Escribe email: test@seedor.com
3. Escribe contraseña: test123456
4. Click en botón "Iniciar Sesión"
5. Verifica que redirige a /home
```

**¿Cuándo ejecutarlo?**
- ✅ Después de cambios en UI de login
- ✅ Antes de cada merge
- ✅ Antes de deploy

---

### **2. campo.create.spec.ts** - Tests de Campos/Lotes
**Ubicación:** `tests/e2e/campo.create.spec.ts`

**¿Qué prueba?**
- ✅ Crear nuevo campo exitosamente
- ✅ Crear lote dentro de un campo
- ✅ Validar campos obligatorios
- ✅ Ver lista de campos creados
- ✅ Navegar entre vistas

**Ejemplo de flujo:**
```typescript
1. Login como usuario test
2. Navega a /campo
3. Click en "Nuevo Campo"
4. Llena formulario:
   - Nombre: "Campo Test"
   - Ubicación: "Región Test"
   - Hectáreas: "50"
5. Click "Guardar"
6. Verifica mensaje "Campo creado exitosamente"
7. Verifica que aparece en la lista
```

**¿Cuándo ejecutarlo?**
- ✅ Después de cambios en módulo de campos
- ✅ Antes de cada merge

---

### **3. empaque.ingreso.spec.ts** - Tests de Empaque
**Ubicación:** `tests/e2e/empaque.ingreso.spec.ts`

**¿Qué prueba?**
- ✅ Renderiza página de ingreso de fruta
- ✅ Crear nuevo ingreso de fruta
- ✅ Validar campos obligatorios del formulario
- ✅ Mostrar lista de ingresos existentes

**Ejemplo de flujo:**
```typescript
1. Login como usuario test
2. Navega a /empaque/ingreso-fruta
3. Click en "Nuevo Ingreso"
4. Llena formulario:
   - Productor: "Productor Test"
   - Tipo Fruta: "Paltas"
   - Cantidad: "1000"
   - Unidad: "kg"
5. Click "Guardar"
6. Verifica mensaje de éxito
7. Verifica que aparece en la grilla
```

**¿Cuándo ejecutarlo?**
- ✅ Después de cambios en módulo de empaque
- ✅ Antes de deploy

---

## 🚀 Cómo ejecutar los tests (PASO A PASO)

### **PASO 1: Iniciar el servidor**
```bash
# Terminal 1 (déjalo corriendo):
npm run dev

# Espera a ver:
# ✓ Ready on http://localhost:3000
```

---

### **PASO 2: Ejecutar Playwright**

#### **Opción A: Modo UI interactivo (⭐ RECOMENDADO para empezar)**
```bash
# Terminal 2:
npm run test:e2e:ui
```

**¿Qué verás?**
Una ventana gráfica con:
- 📋 Lista de todos tus tests
- ▶️ Botón para ejecutar cada test
- 👁️ Vista del navegador en tiempo real
- 🔄 Time-travel debugging (retroceder en el tiempo)
- 📊 Timeline de cada acción

**¿Cómo usarlo?**
1. Click en un test → se ejecuta
2. Ve el navegador abriéndose automáticamente
3. Cada acción se resalta en verde
4. Si falla, ves exactamente dónde y por qué

---

#### **Opción B: Ver navegador mientras corre (headed)**
```bash
# Terminal 2:
npm run test:e2e:headed
```

**¿Qué hace?**
- Ejecuta TODOS los tests
- Abre el navegador y lo ves en acción
- Como un fantasma usando tu app 👻
- Útil para debug visual

---

#### **Opción C: Ejecutar todos (headless - sin ver navegador)**
```bash
# Terminal 2:
npm run test:e2e
```

**¿Qué hace?**
- Ejecuta en 3 navegadores: Chrome, Firefox, Safari
- No ves ventanas (corre en background)
- Más rápido
- Ideal para CI/CD

**Salida esperada:**
```
Running 24 tests using 3 workers

  ✓ [chromium] › auth.spec.ts:14 › debe renderizar login (2s)
  ✓ [chromium] › auth.spec.ts:25 › debe permitir login exitoso (5s)
  ✓ [firefox] › auth.spec.ts:14 › debe renderizar login (2s)
  ✓ [webkit] › auth.spec.ts:14 › debe renderizar login (3s)
  ✓ [chromium] › campo.create.spec.ts:20 › debe crear campo (6s)
  
  24 passed (45s)
```

---

#### **Opción D: Solo un navegador (más rápido)**
```bash
# Solo Chrome:
npx playwright test --project=chromium

# Solo Firefox:
npx playwright test --project=firefox

# Solo Safari:
npx playwright test --project=webkit
```

---

#### **Opción E: Solo un archivo específico**
```bash
# Solo tests de autenticación:
npx playwright test tests/e2e/auth.spec.ts

# Solo tests de campos:
npx playwright test tests/e2e/campo.create.spec.ts
```

---

#### **Opción F: Solo un test específico**
```bash
# Busca por nombre del test:
npx playwright test -g "debe permitir login exitoso"

# Busca por palabra clave:
npx playwright test -g "login"
```

---

#### **Opción G: Debug paso a paso**
```bash
# Abre inspector de Playwright:
npx playwright test --debug

# Puedes:
# - Pausar en cada paso
# - Avanzar línea por línea
# - Ver selectores resaltados
# - Ejecutar comandos en consola
```

---

### **PASO 3: Ver reportes HTML**
```bash
# Después de ejecutar tests:
npm run test:e2e:report

# O directamente:
npx playwright show-report
```

**¿Qué verás?**
- Resumen de tests pasados/fallidos
- Duración de cada test
- Screenshots de errores
- Videos de tests fallidos
- Traces interactivos

---

## 📊 ¿Qué chequea cada test?

### **Test: "debe permitir login exitoso"**

**Código del test:**
```typescript
test('debe permitir login exitoso', async ({ page }) => {
  // 1. Ir a login
  await page.goto('/login');
  
  // 2. Llenar email
  await page.getByLabel(/email/i).fill('test@seedor.com');
  
  // 3. Llenar contraseña
  await page.getByLabel(/contraseña/i).fill('test123456');
  
  // 4. Click en botón
  await page.getByRole('button', { name: /ingresar/i }).click();
  
  // 5. Verificar redirección
  await expect(page).toHaveURL(/\/(home|dashboard)/);
});
```

**¿Qué valida?**
- ✅ La página /login carga
- ✅ Los campos email y contraseña existen
- ✅ El botón "Ingresar" existe
- ✅ Al hacer click, el login funciona
- ✅ Redirige a /home o /dashboard
- ✅ No hay errores de JavaScript
- ✅ No hay errores 500

**¿Qué debería devolver?**
- Status: 200 en todas las peticiones
- Redirección exitosa a /home
- Cookies de sesión guardadas

---

### **Test: "debe crear campo exitosamente"**

**Código del test:**
```typescript
test('debe crear campo exitosamente', async ({ page }) => {
  // 1. Login previo
  await loginAsTestUser(page);
  
  // 2. Ir a campos
  await page.goto('/campo');
  
  // 3. Click "Nuevo Campo"
  await page.getByRole('button', { name: /nuevo campo/i }).click();
  
  // 4. Llenar formulario
  await page.getByLabel(/nombre/i).fill('Campo Test');
  await page.getByLabel(/ubicación/i).fill('Región Test');
  await page.getByLabel(/hectáreas/i).fill('50');
  
  // 5. Guardar
  await page.getByRole('button', { name: /guardar/i }).click();
  
  // 6. Verificar éxito
  await expect(page.getByText(/creado exitosamente/i)).toBeVisible();
  await expect(page.getByText('Campo Test')).toBeVisible();
});
```

**¿Qué valida?**
- ✅ Autenticación funciona
- ✅ Navegación a /campo funciona
- ✅ Modal/formulario se abre
- ✅ Todos los campos del formulario existen
- ✅ Guardar envía los datos correctamente
- ✅ Mensaje de éxito aparece
- ✅ Nuevo campo aparece en la lista

**¿Qué debería devolver?**
- POST /api/campos → 201 Created
- GET /api/campos → 200 OK con nuevo campo
- UI actualizada con el nuevo registro

---

### **Test: "debe validar campos obligatorios"**

**Código del test:**
```typescript
test('debe validar campos obligatorios', async ({ page }) => {
  await page.goto('/campo');
  
  // Intentar guardar sin llenar
  await page.getByRole('button', { name: /nuevo campo/i }).click();
  await page.getByRole('button', { name: /guardar/i }).click();
  
  // Debe mostrar errores
  await expect(page.getByText(/campo requerido/i)).toBeVisible();
});
```

**¿Qué valida?**
- ✅ Validación de frontend funciona
- ✅ No envía formulario vacío
- ✅ Muestra mensajes de error claros
- ✅ No hay errores 500 por validación

---

## 📈 Interpretando los resultados

### **✅ Test PASÓ (verde)**
```
✓ [chromium] › auth.spec.ts:25 › debe permitir login exitoso (5s)
```

**Significa:**
- Todo funcionó correctamente
- El flujo completo se ejecutó sin errores
- Tardó 5 segundos (normal)

---

### **❌ Test FALLÓ (rojo)**
```
✕ [chromium] › auth.spec.ts:45 › debe validar credenciales (8s)

  Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

  Locator: getByText(/bienvenido/i)
  Expected: visible
  Received: <element(s) not found>

    43 |   await page.getByRole('button', { name: /login/i }).click();
  > 45 |   await expect(page.getByText(/bienvenido/i)).toBeVisible();
       |                                                ^

  Call log:
    - waiting for getByText(/bienvenido/i)
    - locator resolved to <empty>
```

**¿Qué significa?**
- El test esperaba ver el texto "Bienvenido"
- Esperó 5 segundos
- El elemento nunca apareció
- El test falló en la línea 45

**¿Por qué puede fallar?**
1. El login falló (error 401)
2. El texto es diferente ("Bienvenida" vs "Bienvenido")
3. El elemento tarda más de 5 segundos en aparecer
4. Hay un bug en el código

**¿Qué hacer?**
1. Ver el screenshot: `test-results/.../test-failed-1.png`
2. Ver el video: `test-results/.../video.webm`
3. Ver el trace: `npx playwright show-trace test-results/.../trace.zip`

---

### **📸 Artifacts generados automáticamente**

Cuando un test falla, Playwright guarda:

```
test-results/
  auth-debe-validar-credenciales-chromium/
    trace.zip          ← Timeline completo interactivo
    test-failed-1.png  ← Screenshot del momento exacto del error
    video.webm         ← Video completo del test (desde inicio)
```

---

### **🔍 Ver trace (Time-travel debugging)**
```bash
npx playwright show-trace test-results/.../trace.zip
```

**¿Qué verás?**
- Timeline de TODAS las acciones
- Screenshots de cada paso
- Logs de consola
- Requests de red (API calls)
- Puedes retroceder y ver qué pasó antes del error
- Puedes ver el HTML en cualquier momento

---

## 🎯 Métricas importantes

### **1. Test Pass Rate (Tasa de éxito)**
```
24 passed (45s)
0 failed
```

**¿Qué buscar?**
- ✅ 100% passed = Excelente
- ⚠️ 90-99% passed = Aceptable (investigar los que fallan)
- ❌ <90% passed = Hay problemas serios

---

### **2. Duración de tests**
```
✓ auth.spec.ts (15s)
✓ campo.create.spec.ts (20s)
✓ empaque.ingreso.spec.ts (10s)

Total: 45s
```

**¿Qué es bueno?**
- ✅ < 1 minuto por archivo = Rápido
- ⚠️ 1-3 minutos = Aceptable
- ❌ > 3 minutos = Optimizar (eliminar waits innecesarios)

---

### **3. Flakiness (Tests inestables)**
```
Test "debe crear campo" passed on retry #2
```

**¿Qué significa?**
- El test falló la primera vez
- Pasó en el segundo intento
- Es un test "flaky" (inestable)

**¿Por qué pasa?**
- Timeouts muy cortos
- Condiciones de carrera (race conditions)
- Dependencia de timing
- Datos externos cambiantes

**¿Qué hacer?**
- Aumentar timeouts
- Usar `waitFor` en lugar de `sleep`
- Hacer tests más robustos

---

## 🛠️ Personalizar los tests

### **Cambiar timeouts:**

```typescript
// Timeout global (playwright.config.ts)
export default defineConfig({
  timeout: 30000,  // 30 segundos por test
});

// Timeout por test
test('test lento', async ({ page }) => {
  test.setTimeout(60000); // 60 segundos solo este test
  // ...
});

// Timeout por assertion
await expect(page.getByText('Texto')).toBeVisible({ 
  timeout: 10000  // 10 segundos para este elemento
});
```

---

### **Agregar nuevo test:**

```typescript
// tests/e2e/mi-feature.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Mi Nueva Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Ejecuta antes de cada test
    await page.goto('/mi-ruta');
  });

  test('debe hacer algo', async ({ page }) => {
    // Arrange (preparar)
    const testData = { nombre: 'Test' };
    
    // Act (ejecutar)
    await page.getByLabel('Nombre').fill(testData.nombre);
    await page.getByRole('button', { name: /guardar/i }).click();
    
    // Assert (verificar)
    await expect(page.getByText(/éxito/i)).toBeVisible();
  });
});
```

---

### **Usar fixtures (datos de prueba):**

```typescript
// tests/e2e/fixtures/test-data.ts
export const testUsers = {
  validUser: {
    email: 'test@seedor.com',
    password: 'test123456'
  }
};

// En tu test:
import { testUsers } from './fixtures/test-data';

await page.getByLabel('Email').fill(testUsers.validUser.email);
```

---

### **Crear helpers reutilizables:**

```typescript
// tests/e2e/helpers/auth.helper.ts
export async function loginAsTestUser(page) {
  await page.goto('/login');
  await page.getByLabel(/email/i).fill('test@seedor.com');
  await page.getByLabel(/contraseña/i).fill('test123456');
  await page.getByRole('button', { name: /ingresar/i }).click();
  await expect(page).toHaveURL(/\/(home|dashboard)/);
}

// En tu test:
import { loginAsTestUser } from './helpers/auth.helper';

test('mi test', async ({ page }) => {
  await loginAsTestUser(page);  // Reutiliza el login
  // ... resto del test
});
```

---

## 🎨 Selectores - La clave del éxito

### **Prioridad de selectores (del mejor al peor):**

#### **1. getByRole (MEJOR - accesible) ⭐**
```typescript
// Botones
page.getByRole('button', { name: /guardar/i })
page.getByRole('button', { name: 'Crear Campo' })

// Links
page.getByRole('link', { name: /inicio/i })

// Inputs
page.getByRole('textbox', { name: /email/i })
page.getByRole('checkbox', { name: /acepto términos/i })

// Headings
page.getByRole('heading', { name: /título/i })
```

**¿Por qué es el mejor?**
- ✅ Basado en accesibilidad (ARIA roles)
- ✅ No se rompe si cambias clases CSS
- ✅ Funciona con screen readers

---

#### **2. getByLabel (BUENO - para inputs)**
```typescript
page.getByLabel(/nombre/i)
page.getByLabel('Email')
page.getByLabel(/contraseña/i)
```

**¿Cuándo usar?**
- Para inputs de formulario
- Cuando hay un `<label>` asociado

---

#### **3. getByText (BUENO - para texto visible)**
```typescript
page.getByText(/bienvenido/i)
page.getByText('Campo creado exitosamente')
```

**¿Cuándo usar?**
- Para verificar mensajes
- Para encontrar elementos por su texto

---

#### **4. getByPlaceholder (ACEPTABLE)**
```typescript
page.getByPlaceholder(/buscar.../i)
page.getByPlaceholder('Ingrese su email')
```

---

#### **5. getByTestId (ÚLTIMO RECURSO)**
```typescript
page.getByTestId('campo-form')
page.getByTestId('submit-button')
```

**¿Cuándo usar?**
- Cuando ninguno de los anteriores funciona
- Para elementos dinámicos sin rol claro

**Cómo agregar test-id en tu HTML:**
```tsx
<div data-testid="campo-form">
  {/* ... */}
</div>
```

---

#### **❌ EVITAR selectores CSS frágiles:**
```typescript
// ❌ MAL - se rompe si cambias clases
page.locator('.btn-primary')
page.locator('#campo-123')
page.locator('div.container > button:nth-child(2)')

// ✅ BIEN - usa selectores semánticos
page.getByRole('button', { name: /guardar/i })
```

---

## 🐛 Troubleshooting

### **Problema: "Port 3000 already in use"**
```bash
lsof -ti:3000 | xargs kill -9
```

---

### **Problema: "Test timeout exceeded"**
```typescript
// Solución 1: Aumentar timeout global
// playwright.config.ts
export default defineConfig({
  timeout: 60000,  // 60 segundos
});

// Solución 2: Aumentar timeout por test
test('test lento', async ({ page }) => {
  test.setTimeout(90000);  // 90 segundos
});
```

---

### **Problema: "Element is not visible"**
```typescript
// Solución 1: Esperar explícitamente
await page.getByText('Elemento').waitFor();
await page.getByText('Elemento').click();

// Solución 2: Scroll al elemento
await page.getByText('Elemento').scrollIntoViewIfNeeded();

// Solución 3: Forzar click (último recurso)
await page.getByRole('button').click({ force: true });
```

---

### **Problema: "Selector matched multiple elements"**
```typescript
// ❌ MAL - selector ambiguo
await page.getByText('Guardar').click();

// ✅ BIEN - usar first()
await page.getByRole('button', { name: /guardar/i }).first().click();

// ✅ MEJOR - selector más específico
await page.getByRole('dialog')
  .getByRole('button', { name: /guardar/i })
  .click();
```

---

### **Problema: Tests fallan aleatoriamente (flaky)**
```typescript
// ❌ MAL - usar sleep fijo
await page.waitForTimeout(3000);

// ✅ BIEN - esperar condición específica
await page.waitForLoadState('networkidle');
await expect(page.getByText('Cargado')).toBeVisible();

// ✅ BIEN - aumentar timeout de assertion
await expect(page.getByText('Texto')).toBeVisible({ 
  timeout: 10000 
});
```

---

## ✅ Checklist de uso

### **Desarrollo diario:**
```bash
☐ npm run dev                     # Terminal 1
☐ npm run test:e2e:ui             # Terminal 2 - Modo interactivo
☐ Ejecutar test que estoy editando
☐ Verificar que pasa ✅
```

### **Antes de commit:**
```bash
☐ npm run test:e2e --project=chromium  # Solo Chrome (rápido)
☐ Verificar que todos pasen ✅
```

### **Antes de merge:**
```bash
☐ npm run test:e2e                # Multi-browser completo
☐ Verificar 100% passed ✅
☐ Revisar duración total < 5 min
```

### **Cuando un test falla:**
```bash
☐ Ver screenshot en test-results/
☐ Ver video en test-results/
☐ npx playwright show-trace test-results/.../trace.zip
☐ npx playwright test --debug     # Ejecutar paso a paso
```

---

## 🎓 Comandos rápidos

```bash
# EJECUTAR TESTS
npm run test:e2e:ui              # ⭐ UI interactiva (MEJOR)
npm run test:e2e:headed          # Ver navegador
npm run test:e2e                 # Multi-browser completo
npx playwright test --project=chromium  # Solo Chrome

# UN TEST ESPECÍFICO
npx playwright test tests/e2e/auth.spec.ts
npx playwright test -g "debe permitir login"

# DEBUG
npx playwright test --debug      # Paso a paso
npm run test:e2e:report          # Ver reporte HTML
npx playwright show-trace test-results/.../trace.zip  # Time-travel

# CODEGEN (grabar tests automáticamente)
npx playwright codegen http://localhost:3000
```

---

## 🎬 CODEGEN - Grabar tests automáticamente

### **¿Qué es?**
Playwright puede **grabar** tus acciones en el navegador y generar el código del test automáticamente.

### **Cómo usarlo:**
```bash
# 1. Inicia codegen
npx playwright codegen http://localhost:3000

# 2. Interactúa con tu app:
#    - Haz click donde quieras
#    - Escribe en inputs
#    - Navega por páginas

# 3. Playwright genera el código en tiempo real
```

**Resultado:**
```typescript
// Código generado automáticamente:
await page.goto('http://localhost:3000/login');
await page.getByLabel('Email').fill('test@seedor.com');
await page.getByLabel('Contraseña').fill('test123456');
await page.getByRole('button', { name: 'Ingresar' }).click();
await expect(page).toHaveURL('http://localhost:3000/home');
```

**¿Cuándo usarlo?**
- ✅ Para aprender sintaxis de Playwright
- ✅ Para crear tests rápidamente
- ✅ Para descubrir selectores correctos
- ⚠️ Luego edita el código para hacerlo más robusto

---

## 📚 Resumen

### **¿Qué hace Playwright?**
Simula usuarios reales en navegadores reales.

### **¿Necesito algo en la nube?**
❌ NO - Todo corre local.

### **¿Cuándo ejecutar?**
- UI interactiva: Durante desarrollo
- Completo: Antes de merge/deploy

### **¿Qué buscar en resultados?**
- ✅ 100% passed
- ✅ Duración < 5 minutos
- ✅ Sin tests flaky

### **¿Cómo debuggear?**
```bash
npm run test:e2e:ui                              # UI interactiva
npx playwright test --debug                      # Paso a paso
npx playwright show-trace test-results/.../trace.zip  # Time-travel
```

---

## 🚀 Quick Start (3 pasos)

```bash
# 1. Servidor (Terminal 1)
npm run dev

# 2. Tests interactivos (Terminal 2)
npm run test:e2e:ui

# 3. Click en cualquier test y míralo ejecutarse 🎭
```

---

## 🎯 Diferencias clave: Playwright vs Artillery

| Aspecto | Playwright 🎭 | Artillery 📊 |
|---------|--------------|-------------|
| **¿Qué prueba?** | UI y flujos de usuario | Performance y carga |
| **¿Cómo?** | Navegador real | HTTP requests |
| **¿Cuántos usuarios?** | 1 a la vez | Miles simultáneos |
| **¿Qué mide?** | Funcionalidad correcta | Velocidad y errores |
| **¿Cuándo usar?** | Después de cambios UI | Antes de deploy |
| **Duración típica** | 1-5 minutos | 30s - 5 minutos |

**Son complementarios:**
- ✅ Playwright: "¿Funciona correctamente?"
- ✅ Artillery: "¿Es rápido bajo carga?"

---

## 📖 Recursos adicionales

- **Playwright Docs:** https://playwright.dev
- **Best Practices:** https://playwright.dev/docs/best-practices
- **Selectors Guide:** https://playwright.dev/docs/locators
- **Debugging Guide:** https://playwright.dev/docs/debug

---

¡Listo! Ahora sabes todo sobre Playwright. 🎭

