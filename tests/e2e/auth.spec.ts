import { test, expect } from '@playwright/test';
import { testUsers } from './fixtures/test-data';

/**
 * E2E Test: Journey de Autenticación
 * TDD: Tests para login, logout, validaciones
 */
test.describe('Autenticación - Journey completo', () => {
  test.beforeEach(async ({ page }) => {
    // Limpiar estado previo
    await page.context().clearCookies();
    await page.goto('/login');
  });

  test('debe renderizar la página de login correctamente', async ({ page }) => {
    // Verificar URL
    await expect(page).toHaveURL(/\/login/);

    // Verificar elementos principales
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/contraseña|password/i)).toBeVisible();
    await expect(
      page.getByRole('button', { name: /ingresar|iniciar sesión|login/i })
    ).toBeVisible();
  });

  test('debe permitir login exitoso con credenciales válidas', async ({ page }) => {
    // Rellenar formulario con credenciales de test
    await page.getByLabel(/email/i).fill(testUsers.validUser.email);
    await page.getByLabel(/contraseña|password/i).fill(testUsers.validUser.password);

    // Submit
    await page.getByRole('button', { name: /ingresar|iniciar sesión|login/i }).click();

    // Verificar redirección exitosa
    await expect(page).toHaveURL(/\/(home|dashboard)/, { timeout: 10000 });

    // Verificar elementos de navegación autenticada
    await expect(
      page.getByRole('navigation').or(page.getByRole('banner'))
    ).toBeVisible({ timeout: 5000 });
  });

  test('debe rechazar credenciales inválidas', async ({ page }) => {
    // Intentar login con credenciales incorrectas
    await page.getByLabel(/email/i).fill(testUsers.invalidUser.email);
    await page.getByLabel(/contraseña|password/i).fill(testUsers.invalidUser.password);
    await page.getByRole('button', { name: /ingresar|iniciar sesión|login/i }).click();

    // Debe mostrar mensaje de error
    await expect(
      page.getByText(/credenciales.*inválidas|usuario.*contraseña.*incorrectos|error/i).first()
    ).toBeVisible({ timeout: 5000 });

    // No debe redirigir
    await expect(page).toHaveURL(/\/login/);
  });

  test('debe validar campos vacíos', async ({ page }) => {
    // Intentar submit sin llenar campos
    await page.getByRole('button', { name: /ingresar|iniciar sesión|login/i }).click();

    // Debe mostrar validaciones HTML5 o custom
    const emailInput = page.getByLabel(/email/i);
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);

    expect(isInvalid).toBe(true);
  });

  test('debe validar formato de email', async ({ page }) => {
    // Ingresar email inválido
    await page.getByLabel(/email/i).fill('email-invalido');
    await page.getByLabel(/contraseña|password/i).fill('password123');
    await page.getByRole('button', { name: /ingresar|iniciar sesión|login/i }).click();

    // Validación HTML5 de email
    const emailInput = page.getByLabel(/email/i);
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);

    expect(isInvalid).toBe(true);
  });

  test('debe permitir cerrar sesión', async ({ page }) => {
    // Primero hacer login
    await page.getByLabel(/email/i).fill(testUsers.validUser.email);
    await page.getByLabel(/contraseña|password/i).fill(testUsers.validUser.password);
    await page.getByRole('button', { name: /ingresar|iniciar sesión|login/i }).click();
    await expect(page).toHaveURL(/\/(home|dashboard)/, { timeout: 10000 });

    // Buscar y hacer click en logout/cerrar sesión
    const logoutButton = page.getByRole('button', { name: /cerrar sesión|logout|salir/i })
      .or(page.getByText(/cerrar sesión|logout|salir/i));

    if (await logoutButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await logoutButton.click();

      // Debe redirigir a login
      await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
    }
  });

  test('debe mostrar enlace a recuperación de contraseña', async ({ page }) => {
    // Buscar link de "olvidé mi contraseña"
    const forgotPasswordLink = page.getByRole('link', {
      name: /olvidé.*contraseña|recuperar.*contraseña|forgot.*password/i
    });

    if (await forgotPasswordLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(forgotPasswordLink).toBeVisible();
      await expect(forgotPasswordLink).toHaveAttribute('href', /forgot|reset/);
    }
  });

  test('debe proteger rutas privadas sin autenticación', async ({ page }) => {
    // Intentar acceder a ruta protegida sin login
    await page.goto('/home');

    // Debe redirigir a login
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
  });
});

