/**
 * Auth Helper para E2E Tests
 * Funciones reutilizables para autenticación en tests
 */

import { Page, expect } from '@playwright/test';
import { testUsers } from '../fixtures/test-data';

/**
 * Realiza login y espera redirección exitosa
 */
export async function loginAsTestUser(page: Page) {
  await page.goto('/login');

  await page.getByLabel(/email/i).fill(testUsers.validUser.email);
  await page.getByLabel(/contraseña/i).fill(testUsers.validUser.password);
  await page.getByRole('button', { name: /ingresar|iniciar sesión/i }).click();

  // Esperar redirección
  await expect(page).toHaveURL(/\/(home|dashboard)/, { timeout: 10000 });
}

/**
 * Realiza login como admin
 */
export async function loginAsAdmin(page: Page) {
  await page.goto('/login');

  await page.getByLabel(/email/i).fill(testUsers.adminUser.email);
  await page.getByLabel(/contraseña/i).fill(testUsers.adminUser.password);
  await page.getByRole('button', { name: /ingresar|iniciar sesión/i }).click();

  await expect(page).toHaveURL(/\/(home|dashboard)/, { timeout: 10000 });
}

/**
 * Limpia sesión actual
 */
export async function logout(page: Page) {
  await page.context().clearCookies();
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

/**
 * Verifica que el usuario está autenticado
 */
export async function expectAuthenticated(page: Page) {
  await expect(
    page.getByRole('navigation').or(page.getByRole('banner'))
  ).toBeVisible({ timeout: 5000 });
}

