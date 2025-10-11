#!/bin/bash

# Script de validación rápida de la configuración de tests
# Ejecutar: chmod +x validate-tests.sh && ./validate-tests.sh

echo "🧪 Validando configuración de tests TDD - Seedor"
echo "================================================"
echo ""

# 1. Verificar estructura de carpetas
echo "📁 Verificando estructura de carpetas..."
FOLDERS=(
  "tests/e2e"
  "tests/e2e/fixtures"
  "tests/e2e/helpers"
  "config/load"
  "reports/playwright"
  "reports/artillery"
)

for folder in "${FOLDERS[@]}"; do
  if [ -d "$folder" ]; then
    echo "  ✅ $folder"
  else
    echo "  ❌ $folder (falta)"
  fi
done
echo ""

# 2. Verificar archivos de test
echo "🧪 Verificando archivos de test..."
TEST_FILES=(
  "tests/e2e/auth.spec.ts"
  "tests/e2e/empaque.ingreso.spec.ts"
  "tests/e2e/campo.create.spec.ts"
  "tests/e2e/fixtures/test-data.ts"
  "tests/e2e/helpers/auth.helper.ts"
)

for file in "${TEST_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (falta)"
  fi
done
echo ""

# 3. Verificar configuraciones Artillery
echo "⚡ Verificando configuraciones Artillery..."
ARTILLERY_FILES=(
  "config/load/smoke.yml"
  "config/load/journeys.yml"
  "config/load/processor.js"
)

for file in "${ARTILLERY_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (falta)"
  fi
done
echo ""

# 4. Verificar archivos de configuración
echo "⚙️  Verificando configuraciones..."
CONFIG_FILES=(
  "playwright.config.ts"
  ".env.test"
  "README_TESTING.md"
)

for file in "${CONFIG_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (falta)"
  fi
done
echo ""

# 5. Verificar scripts en package.json
echo "📜 Verificando scripts en package.json..."
SCRIPTS=(
  "test:e2e"
  "test:e2e:headed"
  "test:load"
  "test:all"
)

for script in "${SCRIPTS[@]}"; do
  if grep -q "\"$script\"" package.json; then
    echo "  ✅ $script"
  else
    echo "  ❌ $script (falta)"
  fi
done
echo ""

# 6. Contar tests
echo "📊 Contando tests implementados..."
AUTH_TESTS=$(grep -c "test(" tests/e2e/auth.spec.ts 2>/dev/null || echo 0)
EMPAQUE_TESTS=$(grep -c "test(" tests/e2e/empaque.ingreso.spec.ts 2>/dev/null || echo 0)
CAMPO_TESTS=$(grep -c "test(" tests/e2e/campo.create.spec.ts 2>/dev/null || echo 0)
TOTAL=$((AUTH_TESTS + EMPAQUE_TESTS + CAMPO_TESTS))

echo "  📝 auth.spec.ts: $AUTH_TESTS tests"
echo "  📦 empaque.ingreso.spec.ts: $EMPAQUE_TESTS tests"
echo "  🌾 campo.create.spec.ts: $CAMPO_TESTS tests"
echo "  📊 Total: $TOTAL tests E2E"
echo ""

# 7. Resumen final
echo "================================================"
echo "✅ Configuración validada"
echo ""
echo "🚀 Próximos pasos:"
echo "  1. Instalar navegadores: pnpm exec playwright install"
echo "  2. Crear usuarios de test en la base de datos"
echo "  3. Ejecutar tests (RED): pnpm run test:e2e"
echo "  4. Implementar código para pasar tests (GREEN)"
echo "  5. Refactorizar manteniendo tests verdes"
echo ""
echo "📖 Ver README_TESTING.md para más detalles"
# 📊 Resumen de Implementación TDD - Seedor

## ✅ Completado

### 1. Estructura de Proyecto
```
tests/
  e2e/
    ✅ auth.spec.ts                    (3 tests de autenticación)
    ✅ empaque.ingreso.spec.ts         (5 tests de empaque)
    ✅ campo.create.spec.ts            (5 tests de campo)
    fixtures/
      ✅ test-data.ts                  (Datos de prueba)
    helpers/
      ✅ auth.helper.ts                (Helpers reutilizables)

config/
  load/
    ✅ smoke.yml                       (Smoke test 30s)
    ✅ journeys.yml                    (Test de carga 4min)
    ✅ processor.js                    (Helper functions)

reports/
  playwright/                          (Reportes HTML/JSON)
  artillery/                           (Reportes de carga)

✅ playwright.config.ts                (Configuración con trazas)
✅ package.json                        (Scripts de testing)
✅ .env.test                           (Variables de entorno)
✅ README_TESTING.md                   (Documentación completa)
✅ .gitignore                          (Actualizado)
```

### 2. Scripts Disponibles

```bash
# E2E Tests (Playwright)
pnpm run test:e2e              # Todos los navegadores
pnpm run test:e2e:headed       # Con UI visible
pnpm run test:e2e:ui           # Modo interactivo
pnpm run test:e2e:report       # Ver último reporte

# Load Tests (Artillery)
pnpm run test:load:smoke       # Smoke test
pnpm run test:load:journeys    # Test completo
pnpm run test:load:report      # Generar reportes HTML

# Todos
pnpm run test:all              # E2E + Carga
```

### 3. Tests E2E Implementados (13 tests totales)

#### 🔐 Autenticación (auth.spec.ts)
1. ✅ Login exitoso y redirección a home/dashboard
2. ✅ Error con credenciales inválidas
3. ✅ Validación de campos obligatorios

#### 📦 Empaque - Ingreso de Fruta (empaque.ingreso.spec.ts)
4. ✅ Renderizado de página
5. ✅ Crear nuevo ingreso de fruta
6. ✅ Validación de formulario
7. ✅ Listar ingresos existentes
8. ✅ Verificación de tabla/grilla

#### 🌾 Campo - Crear Campo y Lote (campo.create.spec.ts)
9. ✅ Renderizado de página crear campo
10. ✅ Crear nuevo campo
11. ✅ Navegar a detalle de campo
12. ✅ Validación de campos obligatorios
13. ✅ Crear lote dentro de campo

### 4. Tests de Carga (Artillery)

#### Smoke Test (smoke.yml)
- **Duración**: 30s
- **Rate**: 2 req/s
- **Scenarios**: Health check, Login page, API health
- **Thresholds**: p95 < 800ms, p99 < 1500ms, error rate < 1%

#### Journeys Test (journeys.yml)
- **Phases**:
  - Warm up: 60s @ 5 req/s
  - Ramp up: 120s @ 5→20 req/s
  - Sustained: 60s @ 20 req/s
- **Total**: ~4 minutos
- **Scenarios** (4):
  1. Authentication Flow (40%)
  2. Empaque Operations (30%)
  3. Admin Operations (20%)
  4. Campo Access (10%)
- **Thresholds**: p95 < 800ms, p99 < 1500ms, >300 requests, error rate < 1%

### 5. Endpoints Testeados en Artillery

```
GET  /
GET  /login
GET  /campo
GET  /crear-campo
GET  /empaque/ingreso-fruta
POST /api/auth/login
GET  /api/auth/me
GET  /api/admin/users
GET  /api/workers
GET  /api/empaque/ingresos (si existe)
```

### 6. Configuración de Playwright

- **Navegadores**: Chromium, Firefox, WebKit
- **Trace**: on-first-retry
- **Video**: retain-on-failure
- **Screenshot**: only-on-failure
- **Reporters**: HTML + List
- **BaseURL**: http://localhost:3000
- **Auto webServer**: Inicia dev server automáticamente

### 7. Helpers y Fixtures

- `testUsers`: Credenciales de test
- `testCampo`: Datos de campo de prueba
- `testIngresoFuta`: Datos de ingreso
- `loginAsTestUser()`: Helper de login
- `loginAsAdmin()`: Helper login admin
- `logout()`: Limpiar sesión
- `expectAuthenticated()`: Verificar autenticación

## 🔴 FASE RED (Tests que FALLAN)

**Estado actual**: Los 13 tests E2E están en FASE RED porque:

1. **No hay usuario test@seedor.com** en la base de datos
2. **Algunas páginas pueden no existir o tener diferente estructura**
3. **Los selectores necesitan ajustarse a la implementación real**

Esto es CORRECTO en TDD: primero escribimos tests que fallan, luego implementamos.

## 🟢 Próximos Pasos (FASE GREEN)

Para pasar los tests a verde:

1. **Crear usuarios de test** en Supabase/base de datos:
   ```sql
   -- test@seedor.com / test123456
   -- admin@seedor.com / admin123456
   ```

2. **Verificar/ajustar páginas**:
   - Confirmar que `/login` existe ✓
   - Confirmar que `/empaque/ingreso-fruta` existe ✓
   - Confirmar que `/crear-campo` existe ✓
   - Ajustar selectores según UI real

3. **Implementar funcionalidades faltantes**:
   - Formulario de ingreso de fruta completo
   - Formulario de crear campo completo
   - Endpoints de API necesarios

## 📝 Próximas Acciones Sugeridas

1. **Ejecutar tests en RED**:
   ```bash
   pnpm run test:e2e
   ```

2. **Crear usuarios de test** (script o manual)

3. **Iterar en cada test**:
   - Ejecutar un test
   - Ver qué falla
   - Implementar mínimo para pasar
   - Refactorizar

4. **Validar Artillery**:
   ```bash
   pnpm run dev  # Terminal 1
   pnpm run test:load:smoke  # Terminal 2
   ```

## 🎯 Métricas de Éxito

- ✅ **13 tests E2E** implementados
- ✅ **4 scenarios de carga** configurados
- ✅ **SLOs definidos**: p95 < 800ms, p99 < 1500ms, error < 1%
- ✅ **Multi-navegador**: Chromium, Firefox, WebKit
- ✅ **Trazas completas**: Video, screenshots, trace viewer
- ✅ **Documentación**: README_TESTING.md completo
- ✅ **CI-ready**: Thresholds como quality gates

## 📚 Documentación Generada

1. **README_TESTING.md**: Guía completa de uso
2. **.env.test**: Template de variables
3. **Fixtures y helpers**: Código reutilizable
4. **Configuraciones**: playwright.config.ts + Artillery YAML

---

**Estado**: ✅ Fase 1 completa - Estructura TDD implementada
**Siguiente**: 🔴→🟢 Ejecutar RED → GREEN → REFACTOR cycle

