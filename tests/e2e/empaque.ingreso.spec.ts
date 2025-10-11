import { test, expect } from '@playwright/test';

/**
 * E2E Test: Journey de Empaque - Ingreso de Fruta
 * TDD RED PHASE: Este test FALLARÁ inicialmente
 */
test.describe('Empaque - Ingreso de Fruta', () => {
  test.beforeEach(async ({ page }) => {
    // Login previo para acceder a módulo protegido
    await page.goto('/login');

    await page.getByLabel(/email/i).fill('test@seedor.com');
    await page.getByLabel(/contraseña/i).fill('test123456');
    await page.getByRole('button', { name: /ingresar|iniciar sesión/i }).click();

    // Esperar redirección exitosa
    await expect(page).toHaveURL(/\/(home|dashboard)/, { timeout: 10000 });
  });

  test('debe renderizar la página de ingreso de fruta correctamente', async ({ page }) => {
    // Navegar a ingreso de fruta
    await page.goto('/empaque/ingreso-fruta');

    // Verificar URL
    await expect(page).toHaveURL(/\/empaque\/ingreso-fruta/);

    // Verificar presencia de elementos clave
    await expect(
      page.getByRole('heading', { name: /ingreso.*fruta/i }).first()
    ).toBeVisible({ timeout: 5000 });

    // Debe haber un botón para crear nuevo ingreso
    const newButton = page.getByRole('button', { name: /nuevo ingreso|agregar|crear/i }).first();
    await expect(newButton).toBeVisible();
  });

  test('debe permitir crear un nuevo ingreso de fruta', async ({ page }) => {
    await page.goto('/empaque/ingreso-fruta');

    // Abrir modal/formulario de nuevo ingreso
    const newButton = page.getByRole('button', { name: /nuevo ingreso|agregar|crear/i }).first();
    await newButton.click();

    // Esperar que aparezca el formulario/dialog
    const dialog = page.getByRole('dialog').or(page.locator('[role="dialog"]'));
    await expect(dialog).toBeVisible({ timeout: 3000 });

    // Rellenar campos del formulario (ajustar según implementación real)
    // Fixture de datos de prueba
    const testData = {
      productor: 'Productor Test',
      lote: 'LOTE-001',
      variedad: 'Hass',
      cantidad: '1000',
      unidad: 'kg'
    };

    // Intentar rellenar campos (usar selectores flexibles)
    const fields = await page.locator('input[type="text"], input[type="number"], select').all();

    if (fields.length > 0) {
      // Rellenar primer campo disponible como productor
      await fields[0].fill(testData.productor);
    }

    // Buscar botón de guardar/confirmar
    const saveButton = page.getByRole('button', { name: /guardar|confirmar|crear/i }).last();
    await saveButton.click();

    // Verificar feedback positivo (toast, mensaje, etc.)
    await expect(
      page.getByText(/ingreso.*creado|éxito|guardado/i).first()
    ).toBeVisible({ timeout: 5000 });

    // El nuevo registro debe aparecer en la grilla/lista
    await expect(
      page.getByText(testData.productor).or(page.getByText(testData.lote))
    ).toBeVisible({ timeout: 3000 });
  });

  test('debe validar campos obligatorios en el formulario', async ({ page }) => {
    await page.goto('/empaque/ingreso-fruta');

    const newButton = page.getByRole('button', { name: /nuevo ingreso|agregar|crear/i }).first();
    await newButton.click();

    // Esperar formulario
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 3000 });

    // Intentar guardar sin llenar campos
    const saveButton = page.getByRole('button', { name: /guardar|confirmar|crear/i }).last();
    await saveButton.click();

    // Debe mostrar mensajes de validación
    await expect(
      page.getByText(/requerido|obligatorio|campo necesario/i).first()
    ).toBeVisible({ timeout: 3000 });
  });

  test('debe mostrar lista de ingresos existentes', async ({ page }) => {
    await page.goto('/empaque/ingreso-fruta');

    // Debe haber una tabla o lista de registros
    const table = page.getByRole('table').or(page.locator('[role="grid"]'));
    await expect(table.or(page.locator('tbody')).first()).toBeVisible({ timeout: 5000 });

    // Verificar headers o estructura de datos
    const hasHeaders = await page.getByRole('columnheader').count();
    expect(hasHeaders).toBeGreaterThan(0);
  });
});

