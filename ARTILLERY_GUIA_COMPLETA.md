# 🎯 GUÍA COMPLETA DE ARTILLERY - Paso a Paso

## 📋 ¿Qué es Artillery y para qué sirve?

Artillery es una herramienta de **testing de carga y performance** que simula múltiples usuarios usando tu aplicación al mismo tiempo.

### **¿Qué hace Artillery?**
- 🚀 Envía múltiples requests HTTP simultáneos
- 📊 Mide tiempos de respuesta (latencia)
- ⚠️ Cuenta errores y timeouts
- 🎯 Valida que tu app cumpla con objetivos de performance
- 📈 Genera reportes HTML con gráficas

### **¿Por qué es importante?**
- Detecta si tu app se cae bajo carga
- Encuentra endpoints lentos ANTES de producción
- Valida que puedas soportar N usuarios concurrentes
- Mide si cumples con SLAs (Service Level Agreements)

---

## ⚙️ Configuración - NO necesitas Artillery Cloud

### **Opción 1: Local (RECOMENDADO para desarrollo)**
```bash
# Ya está instalado en tu proyecto
# NO necesitas cuenta de Artillery Cloud
# Todo corre desde tu terminal
```

### **Opción 2: Artillery Cloud (OPCIONAL - para CI/CD)**
- Solo si quieres guardar reportes en la nube
- Solo si quieres correr desde CI/CD distribuido
- **NO es necesario para desarrollo local**

---

## 📁 Archivos de configuración en tu proyecto

### **1. smoke.yml** - Test ligero (30 segundos)
**Ubicación:** `config/load/smoke.yml`

**¿Qué hace?**
- Envía **2 requests por segundo** durante 30 segundos
- Ejecuta 3 scenarios básicos:
  1. Health Check - GET /
  2. Login Page - GET /login  
  3. API Health - GET /api/auth/me

**¿Cuándo usarlo?**
- ✅ Antes de cada commit
- ✅ Para verificar que la app responde
- ✅ En desarrollo diario

**Thresholds configurados:**
```yaml
- p95 < 800ms        # El 95% de requests deben ser < 800ms
- p99 < 1500ms       # El 99% de requests deben ser < 1500ms
- errors < 1%        # Menos del 1% de errores permitido
```

---

### **2. journeys.yml** - Test completo (4 minutos)
**Ubicación:** `config/load/journeys.yml`

**¿Qué hace?**
Simula usuarios reales con 3 fases:

**Fase 1 - Warm up (60s):**
- 5 usuarios por segundo
- Calienta servidores y cache

**Fase 2 - Ramp up (120s):**
- Aumenta gradualmente de 5 → 20 usuarios/segundo
- Simula crecimiento de tráfico

**Fase 3 - Sustained (60s):**
- 20 usuarios constantes por segundo
- Simula carga sostenida

**3 Scenarios que ejecuta:**

1. **Authentication Flow (40%)** - Login completo
   - POST /api/auth/login
   - GET /api/auth/me
   
2. **Empaque Operations (30%)** - Operaciones de empaque
   - GET /empaque/ingreso-fruta
   - GET /api/empaque/ingresos

3. **Admin Operations (20%)** - Operaciones admin
   - Login de admin
   - Acceso a panel admin

**¿Cuándo usarlo?**
- ✅ Antes de merge a main
- ✅ Antes de deploy a producción
- ✅ Para establecer baselines de performance

---

### **3. processor.js** - Funciones helper
**Ubicación:** `config/load/processor.js`

**¿Qué hace?**
Contiene funciones JavaScript que Artillery puede usar:

```javascript
generateTestData()     // Genera emails/nombres random
logResponse()          // Loggea errores
setAuthHeader()        // Agrega token de autenticación
```

**¿Para qué sirve?**
- Generar datos dinámicos (timestamps, IDs)
- Lógica custom de validación
- Capturar y reutilizar tokens
- Loggear información de debug

---

## 🚀 Cómo ejecutar los tests (PASO A PASO)

### **PASO 1: Iniciar el servidor**
```bash
# Terminal 1 (déjalo corriendo):
npm run dev

# Espera a ver:
# ✓ Ready on http://localhost:3000
```

### **PASO 2: Ejecutar Artillery**

#### **Opción A: Smoke test (rápido - 30s)**
```bash
# Terminal 2:
npm run test:load:smoke
```

**Salida esperada:**
```
Summary report @ 23:09:45(+00:00)
──────────────────────────────────────────────────────
Scenarios launched:  60
Scenarios completed: 60
Requests completed:  180
Mean response/sec:   6
Response time (msec):
  min:               45
  max:               320
  median:            120
  p95:               280  ✓ (< 800ms threshold)
  p99:               310  ✓ (< 1500ms threshold)
Codes:
  200: 180
Errors:              0    ✓ (< 1% threshold)

All checks passed ✅
```

---

#### **Opción B: Test completo (4 minutos)**
```bash
# Terminal 2:
npm run test:load:journeys
```

**Salida esperada:**
```
Phase: Warm up (60s)
Scenarios launched: 300
Requests completed: 900

Phase: Ramp up (120s)
Scenarios launched: 1,500
Requests completed: 4,500

Phase: Sustained (60s)
Scenarios launched: 1,200
Requests completed: 3,600

Summary report @ 23:14:30(+00:00)
──────────────────────────────────────────────────────
Scenarios launched:  3,000
Scenarios completed: 3,000
Requests completed:  9,000
Mean response/sec:   37
Response time (msec):
  min:               40
  max:               1,450
  median:            145
  p95:               520  ✓ (< 800ms threshold)
  p99:               890  ✓ (< 1500ms threshold)
Codes:
  200: 8,200
  201: 400
  302: 350
  401: 50
Errors:              12   ✓ (0.40%, < 1% threshold)

All checks passed ✅
```

---

#### **Opción C: Suite completa + Reportes HTML**
```bash
# Terminal 2:
npm run test:load

# Ejecuta:
# 1. Smoke test → JSON report
# 2. Journeys test → JSON report
# 3. Genera reportes HTML automáticamente
```

**Ver reportes HTML:**
```bash
# En macOS:
open reports/artillery/smoke-report.html
open reports/artillery/journeys-report.html

# En Linux:
xdg-open reports/artillery/smoke-report.html

# En Windows:
start reports/artillery/smoke-report.html
```

---

## 📊 ¿Qué chequea cada test?

### **1. Health Check Scenario**
```yaml
- get:
    url: "/"
    expect:
      - statusCode: 200
```

**¿Qué valida?**
- ✅ La página principal carga correctamente
- ✅ Responde con código 200 (OK)
- ✅ No hay errores 500

**¿Qué debería devolver?**
- Status: 200 OK
- Content-Type: text/html
- Tiempo < 800ms (p95)

---

### **2. Login Page Load**
```yaml
- get:
    url: "/login"
    expect:
      - statusCode: 200
      - contentType: text/html
```

**¿Qué valida?**
- ✅ La página de login está disponible
- ✅ Retorna HTML válido
- ✅ Carga rápido

**¿Qué debería devolver?**
- Status: 200 OK
- Content-Type: text/html
- Body contiene formulario de login

---

### **3. API Health Check**
```yaml
- get:
    url: "/api/auth/me"
    expect:
      - statusCode: [200, 401]
```

**¿Qué valida?**
- ✅ El endpoint API responde
- ✅ Acepta 200 (autenticado) o 401 (no autenticado)
- ✅ No está caído (500)

**¿Qué debería devolver?**
- Status: 200 (si hay sesión) o 401 (sin sesión)
- Content-Type: application/json

---

### **4. Authentication Flow Journey**
```yaml
- post:
    url: "/api/auth/login"
    json:
      email: "test@seedor.com"
      password: "test123456"
    capture:
      - json: "$.session.access_token"
        as: "authToken"
    expect:
      - statusCode: [200, 201]
```

**¿Qué valida?**
- ✅ Login funciona correctamente
- ✅ Retorna token de sesión
- ✅ Puede capturar y reutilizar el token

**¿Qué debería devolver?**
```json
{
  "session": {
    "access_token": "eyJhbGc...",
    "user": {
      "id": "123",
      "email": "test@seedor.com"
    }
  }
}
```

---

### **5. Empaque Operations Journey**
```yaml
- get:
    url: "/empaque/ingreso-fruta"
    headers:
      Authorization: "Bearer {{ authToken }}"
    expect:
      - statusCode: [200, 302]
```

**¿Qué valida?**
- ✅ Páginas de empaque requieren autenticación
- ✅ Token funciona correctamente
- ✅ Redirecciona si no está autenticado (302)

**¿Qué debería devolver?**
- Status: 200 (autenticado) o 302 (redirige a login)
- HTML de la página o redirect

---

## 📈 Interpretando las métricas

### **Métricas clave:**

#### **1. Response Time (Tiempo de respuesta)**
```
min:      45 ms    ← Mejor caso
max:      1,450 ms ← Peor caso
median:   145 ms   ← 50% de requests
p95:      520 ms   ← 95% de requests
p99:      890 ms   ← 99% de requests
```

**¿Qué significan?**
- **median**: Performance típica
- **p95**: Tu objetivo principal (95% de usuarios)
- **p99**: Peor caso aceptable (1% de usuarios)
- **max**: Outliers (investigar por qué)

**¿Qué es bueno?**
- ✅ p95 < 800ms - Excelente
- ⚠️ p95 800-1500ms - Aceptable
- ❌ p95 > 1500ms - Lento, optimizar

---

#### **2. Throughput (Rendimiento)**
```
Scenarios launched:  3,000
Scenarios completed: 3,000
Requests completed:  9,000
Mean response/sec:   37
```

**¿Qué significan?**
- **Scenarios launched**: Usuarios virtuales creados
- **Scenarios completed**: Usuarios que terminaron exitosamente
- **Requests**: Total de HTTP requests enviados
- **Response/sec**: Requests por segundo que tu servidor manejó

**¿Qué es bueno?**
- ✅ launched = completed (no hay crashes)
- ✅ High response/sec (servidor aguanta carga)

---

#### **3. HTTP Status Codes**
```
Codes:
  200: 8,200  ← Éxito
  201: 400    ← Creado (POST exitosos)
  302: 350    ← Redirects
  401: 50     ← No autenticado (esperado)
  500: 0      ← Errores de servidor (¡malo!)
```

**¿Qué buscar?**
- ✅ Mayoría 200/201 (éxito)
- ✅ Algunos 302/401 (esperados)
- ❌ Cualquier 500 (bug en servidor)
- ❌ Muchos 503 (servidor saturado)

---

#### **4. Error Rate (Tasa de error)**
```
Errors: 12  (0.40%, < 1% threshold) ✓
```

**¿Qué significa?**
- **0-1%**: ✅ Excelente
- **1-5%**: ⚠️ Aceptable (pero investigar)
- **>5%**: ❌ Problema serio

**Tipos de errores:**
- `ETIMEDOUT`: Servidor muy lento, timeout
- `ECONNREFUSED`: Servidor caído
- `500`: Bug en código
- `503`: Servidor saturado

---

## 🎯 Thresholds (Gates de calidad)

### **¿Qué son los thresholds?**
Son **límites automáticos** que Artillery valida. Si los pasas, el test es ✅. Si fallas, es ❌.

### **Thresholds configurados:**

```yaml
ensure:
  thresholds:
    - http.response_time.p95: 800    # Max 800ms para 95% de requests
    - http.response_time.p99: 1500   # Max 1500ms para 99% de requests
    - errors.rate: 1                 # Max 1% de errores
```

### **Ejemplo - Test PASA:**
```
p95:    520 ms  ✓ (< 800ms threshold)
p99:    890 ms  ✓ (< 1500ms threshold)
Errors: 0.4%    ✓ (< 1% threshold)

All checks passed ✅
```

### **Ejemplo - Test FALLA:**
```
p95:    1,450 ms  ✗ (> 800ms threshold)
p99:    3,200 ms  ✗ (> 1500ms threshold)
Errors: 3.75%     ✗ (> 1% threshold)

⚠️  Thresholds crossed: 3 ⚠️
```

**¿Qué hacer si falla?**
1. Revisar reporte HTML (ver qué endpoint es lento)
2. Optimizar código/queries
3. Agregar cache
4. Escalar recursos

---

## 🔍 Ver reportes HTML detallados

### **Abrir reporte:**
```bash
open reports/artillery/smoke-report.html
```

### **¿Qué verás en el reporte?**

1. **Summary Dashboard**
   - Scenarios lanzados vs completados
   - Request rate en tiempo real
   - Error rate
   - Status codes

2. **Response Time Charts**
   - Gráfica de latencia en tiempo real
   - p50, p95, p99 timeline
   - Max/min por segundo

3. **Request Rate**
   - Requests por segundo (RPS)
   - Carga en cada fase (warm up, ramp up, sustained)

4. **Error Details**
   - Lista de errores con timestamps
   - Stack traces si hay
   - URLs que fallaron

5. **HTTP Codes Distribution**
   - Pie chart de códigos de respuesta
   - 200 (éxito) vs 500 (error)

---

## 🛠️ Personalizar los tests

### **Cambiar duración/intensidad:**

```yaml
# config/load/smoke.yml
config:
  phases:
    - duration: 60        # ← Cambiar a 60 segundos
      arrivalRate: 5      # ← Cambiar a 5 usuarios/seg
```

### **Cambiar thresholds:**

```yaml
ensure:
  thresholds:
    - http.response_time.p95: 500    # ← Más estricto
    - http.response_time.p99: 1000   # ← Más estricto
    - errors.rate: 0.5               # ← Más estricto
```

### **Agregar nuevo scenario:**

```yaml
scenarios:
  - name: "Mi Nuevo Test"
    weight: 50  # 50% de usuarios ejecutan este
    flow:
      - get:
          url: "/api/mi-endpoint"
          expect:
            - statusCode: 200
      - think: 2  # Espera 2 segundos
      
      - post:
          url: "/api/crear"
          json:
            campo: "valor"
          expect:
            - statusCode: 201
```

---

## 🐛 Troubleshooting

### **Problema: "ECONNREFUSED"**
```
Error: connect ECONNREFUSED 127.0.0.1:3000
```

**Causa:** El servidor no está corriendo.

**Solución:**
```bash
# Terminal 1:
npm run dev

# Espera a ver "✓ Ready"
# Luego en Terminal 2:
npm run test:load:smoke
```

---

### **Problema: Muchos errores 401**
```
Errors: 450 (45%)
Codes:
  401: 450
```

**Causa:** Los tests intentan acceder a rutas protegidas sin autenticación.

**Solución:** Asegúrate de que el scenario haga login primero:
```yaml
flow:
  # 1. Login
  - post:
      url: "/api/auth/login"
      json:
        email: "test@seedor.com"
        password: "test123456"
      capture:
        - json: "$.session.access_token"
          as: "authToken"
  
  # 2. Usar token
  - get:
      url: "/api/protegido"
      headers:
        Authorization: "Bearer {{ authToken }}"
```

---

### **Problema: Timeouts (ETIMEDOUT)**
```
Error: ETIMEDOUT - Request timed out
```

**Causa:** El servidor está muy lento o saturado.

**Soluciones:**
1. Reducir carga (menos arrivalRate)
2. Aumentar timeout de Artillery
3. Optimizar código del servidor

```yaml
config:
  timeout: 60  # Timeout en segundos (default: 10)
```

---

### **Problema: "Cannot find module processor.js"**
```
Error: Cannot find module './processor.js'
```

**Causa:** Artillery busca `processor.js` relativo al YAML.

**Solución:** Verifica que exista:
```bash
ls config/load/processor.js

# Si no existe, créalo o comenta la línea en el YAML:
# processor: "./processor.js"
```

---

## ✅ Checklist de uso

### **Antes de cada commit:**
```bash
☐ npm run dev                    # Iniciar servidor
☐ npm run test:load:smoke        # Smoke test (30s)
☐ Verificar que pase ✅
```

### **Antes de merge:**
```bash
☐ npm run test:load:journeys     # Test completo (4min)
☐ Verificar thresholds ✅
☐ Revisar reporte HTML
```

### **Antes de producción:**
```bash
☐ npm run test:load              # Suite + reportes
☐ open reports/artillery/journeys-report.html
☐ Verificar error rate < 0.5%
☐ Verificar p95 < 800ms
☐ Verificar p99 < 1500ms
```

---

## 🎓 Comandos rápidos

```bash
# EJECUTAR TESTS
npm run test:load:smoke          # Smoke (30s)
npm run test:load:journeys       # Completo (4min)
npm run test:load                # Todo + reportes

# VER REPORTES
open reports/artillery/smoke-report.html
open reports/artillery/journeys-report.html

# DEBUG
DEBUG=http npm run test:load:smoke                    # Ver requests
DEBUG=http:response npm run test:load:smoke           # Ver responses
artillery run config/load/smoke.yml --output test.json  # Guardar raw

# MANUAL (sin npm scripts)
artillery run config/load/smoke.yml
artillery run config/load/journeys.yml
artillery report test.json --output report.html
```

---

## 📚 Resumen

### **¿Qué hace Artillery?**
Simula múltiples usuarios concurrentes y mide performance.

### **¿Necesito Artillery Cloud?**
❌ NO - Todo corre local desde tu terminal.

### **¿Cuándo ejecutar?**
- Smoke: Diario (antes de commits)
- Journeys: Antes de merge/deploy

### **¿Qué buscar en resultados?**
- ✅ p95 < 800ms
- ✅ p99 < 1500ms  
- ✅ Error rate < 1%
- ✅ All thresholds passed

### **¿Cómo ver reportes?**
```bash
npm run test:load
open reports/artillery/journeys-report.html
```

---

## 🚀 Quick Start (3 pasos)

```bash
# 1. Servidor (Terminal 1)
npm run dev

# 2. Test (Terminal 2)
npm run test:load:smoke

# 3. Ver resultado en terminal
# ✓ All checks passed ✅
```

¡Listo! No necesitas Artillery Cloud para nada. 🎉

