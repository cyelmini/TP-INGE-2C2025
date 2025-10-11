#!/bin/bash

# 🔴 TDD RED PHASE - Ejecutar tests que DEBEN FALLAR
# Este script ejecuta los tests para demostrar que fallan inicialmente (TDD correcto)

echo "🔴 TDD RED PHASE - Ejecutando tests que deben FALLAR"
echo "===================================================="
echo ""
echo "Esto es CORRECTO en TDD: primero escribimos tests que fallan,"
echo "luego implementamos el código mínimo para que pasen."
echo ""

# Verificar que el servidor está corriendo
echo "⚠️  IMPORTANTE: Asegúrate de tener el servidor corriendo en otro terminal:"
echo "   Terminal 1: pnpm run dev"
echo ""
read -p "¿El servidor está corriendo? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Por favor inicia el servidor primero: pnpm run dev"
    exit 1
fi

echo ""
echo "📋 Tests a ejecutar:"
echo "  - auth.spec.ts (3 tests)"
echo "  - empaque.ingreso.spec.ts (5 tests)"
echo "  - campo.create.spec.ts (5 tests)"
echo "  Total: 13 tests E2E"
echo ""
echo "🎯 Expectativa: Todos o la mayoría deberían FALLAR porque:"
echo "  1. No existen usuarios test@seedor.com / admin@seedor.com"
echo "  2. Algunos selectores pueden no coincidir con la UI real"
echo "  3. Algunas funcionalidades pueden no estar implementadas"
echo ""
echo "Iniciando tests en 3 segundos..."
sleep 3

# Ejecutar Playwright tests
echo ""
echo "🧪 Ejecutando Playwright E2E tests..."
echo "======================================="
pnpm exec playwright test --reporter=list

# Capturar exit code
EXIT_CODE=$?

echo ""
echo "======================================="
if [ $EXIT_CODE -ne 0 ]; then
    echo "🔴 RED PHASE CONFIRMADA: Tests fallaron (como esperado)"
    echo ""
    echo "✅ Esto es CORRECTO en TDD"
    echo ""
    echo "🟢 Próximos pasos para FASE GREEN:"
    echo "  1. Crear usuarios de test:"
    echo "     - test@seedor.com / test123456"
    echo "     - admin@seedor.com / admin123456"
    echo ""
    echo "  2. Revisar errores específicos:"
    echo "     pnpm run test:e2e:report"
    echo ""
    echo "  3. Ajustar selectores según UI real"
    echo ""
    echo "  4. Implementar código mínimo para pasar cada test"
    echo ""
    echo "  5. Refactorizar manteniendo tests verdes"
else
    echo "🟢 Tests pasaron (inesperado en RED phase)"
    echo "   Verifica que los tests sean suficientemente estrictos"
fi

echo ""
echo "📊 Ver reporte detallado:"
echo "   pnpm run test:e2e:report"
echo ""
echo "🔍 Ver trazas de tests fallidos:"
echo "   pnpm exec playwright show-trace test-results/[test-name]/trace.zip"

