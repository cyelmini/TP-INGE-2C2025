/**
 * Funciones de validación reutilizables
 * Para usar en formularios y tests
 */

/**
 * Valida formato de email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida RUT chileno con dígito verificador
 */
export function validateRUT(rut: string): boolean {
  // Limpia el RUT
  const cleanRut = rut.replace(/[.-]/g, '');
  if (cleanRut.length < 2) return false;

  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1).toUpperCase();

  // Calcula dígito verificador
  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDV = 11 - (sum % 11);
  const calculatedDV = expectedDV === 11 ? '0' : expectedDV === 10 ? 'K' : String(expectedDV);

  return calculatedDV === dv;
}

/**
 * Valida número de teléfono chileno
 * Formatos aceptados: +56912345678, 912345678, 9 1234 5678
 */
export function validatePhoneChile(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s-]/g, '');
  const phoneRegex = /^(\+?56)?[2-9]\d{8}$/;
  return phoneRegex.test(cleanPhone);
}

/**
 * Valida que un número sea positivo
 */
export function validatePositiveNumber(value: number): boolean {
  return value > 0 && !isNaN(value);
}

/**
 * Valida rango de fechas (inicio < fin)
 */
export function validateDateRange(startDate: string, endDate: string): boolean {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start < end;
}

/**
 * Valida que una hectárea esté en rango válido
 */
export function validateHectares(hectares: number): boolean {
  return validatePositiveNumber(hectares) && hectares <= 100000; // Max 100k ha
}

/**
 * Valida código de lote (formato: LOTE-XXX-YYYY)
 */
export function validateLoteCode(code: string): boolean {
  const loteRegex = /^[A-Z0-9]{2,}-[A-Z0-9]{2,}-[A-Z0-9]{2,}$/;
  return loteRegex.test(code.toUpperCase());
}
