import { test, expect } from '@playwright/test';

/**
 * E2E Test: Journey de Campo - Crear Campo y Lote
 * TDD RED PHASE: Este test FALLARÁ inicialmente
 */
test.describe('Campo - Crear Campo y Lote', () => {
  test.beforeEach(async ({ page }) => {
    // Login previo
    await page.goto('/login');

    await page.getByLabel(/email/i).fill('test@seedor.com');
    await page.getByLabel(/contraseña/i).fill('test123456');
    await page.getByRole('button', { name: /ingresar|iniciar sesión/i }).click();

    await expect(page).toHaveURL(/\/(home|dashboard)/, { timeout: 10000 });
  });

  test('debe renderizar la página de crear campo', async ({ page }) => {
    await page.goto('/crear-campo');

    // Verificar URL
    await expect(page).toHaveURL(/\/crear-campo/);

    // Verificar heading
    await expect(
      page.getByRole('heading', { name: /crear campo|nuevo campo/i }).first()
    ).toBeVisible({ timeout: 5000 });

    // Debe haber un formulario
    const form = page.locator('form');
    await expect(form.first()).toBeVisible();
  });

  test('debe permitir crear un nuevo campo', async ({ page }) => {
    await page.goto('/crear-campo');

    // Datos de prueba
    const testCampo = {
      nombre: `Campo Test ${Date.now()}`,
      ubicacion: 'Región Test',
      hectareas: '50',
      coordenadas: '-33.4569,-70.6483'
    };

    // Rellenar formulario (ajustar selectores según implementación)
    const nombreInput = page.getByLabel(/nombre.*campo/i).or(page.locator('input[name="nombre"]')).first();
    await nombreInput.fill(testCampo.nombre);

    // Buscar otros campos disponibles
    const inputs = await page.locator('input[type="text"], input[type="number"]').all();
    if (inputs.length > 1) {
      await inputs[1].fill(testCampo.ubicacion);
    }

    // Submit
    const submitButton = page.getByRole('button', { name: /crear|guardar|confirmar/i }).first();
    await submitButton.click();

    // Verificar éxito
    await expect(
      page.getByText(/campo.*creado|éxito/i).first()
    ).toBeVisible({ timeout: 5000 });

    // Debe redirigir a lista de campos o detalle
    await expect(page).toHaveURL(/\/campo/);
  });

  test('debe navegar a detalle de campo y mostrar información', async ({ page }) => {
    // Primero ir a lista de campos
    await page.goto('/campo');

    // Debe haber campos listados
    await expect(
      page.getByRole('heading').or(page.getByText(/campo/i)).first()
    ).toBeVisible({ timeout: 5000 });

    // Si hay campos, hacer clic en uno
    const campoLink = page.getByRole('link', { name: /ver.*detalles?|ver campo/i }).first();

    if (await campoLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await campoLink.click();

      // Verificar que navegó a detalle con [farmId]
      await expect(page).toHaveURL(/\/campo\/[^/]+/);

      // Debe mostrar información del campo
      await expect(
        page.getByRole('heading').first()
      ).toBeVisible();
    }
  });

  test('debe validar campos obligatorios al crear campo', async ({ page }) => {
    await page.goto('/crear-campo');

    // Intentar submit sin llenar
    const submitButton = page.getByRole('button', { name: /crear|guardar/i }).first();
    await submitButton.click();

    // Debe mostrar validaciones
    await expect(
      page.getByText(/requerido|obligatorio|necesario/i).first()
    ).toBeVisible({ timeout: 3000 });
  });

  test('debe permitir crear lote dentro de un campo', async ({ page }) => {
    // Este test asume que hay al menos un campo existente
    await page.goto('/campo');

    // Intentar acceder al primer campo o crear uno si no hay
    const primerCampo = page.getByRole('link').filter({ hasText: /campo/i }).first();

    if (await primerCampo.isVisible({ timeout: 3000 }).catch(() => false)) {
      await primerCampo.click();

      // Buscar opción de crear lote
      const crearLoteButton = page.getByRole('button', { name: /crear lote|nuevo lote|agregar lote/i });

      if (await crearLoteButton.isVisible({ timeout: 3000 }).catch(() => false)) {
        await crearLoteButton.click();

        // Debe aparecer formulario de lote
        await expect(page.getByRole('dialog')).toBeVisible({ timeout: 3000 });

        // Rellenar datos básicos del lote
        const loteNombre = `Lote Test ${Date.now()}`;
        const nombreInput = page.locator('input').first();
        await nombreInput.fill(loteNombre);

        // Guardar
        await page.getByRole('button', { name: /guardar|crear/i }).last().click();

        // Verificar éxito
        await expect(
          page.getByText(/lote.*creado|éxito/i).first()
        ).toBeVisible({ timeout: 5000 });
      }
    }
  });
});

