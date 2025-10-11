/**
 * Test Data Fixtures para E2E Tests
 */

export const testUsers = {
  validUser: {
    email: 'test@seedor.com',
    password: 'test123456',
    name: 'Usuario Test'
  },
  adminUser: {
    email: 'admin@seedor.com',
    password: 'admin123456',
    name: 'Admin Test'
  },
  invalidUser: {
    email: 'invalid@test.com',
    password: 'wrongpassword'
  }
};

export const testCampos = {
  nuevo: {
    nombre: 'Campo Test E2E',
    ubicacion: 'Región Test',
    hectareas: '50',
    cultivo: 'Paltos'
  }
};

export const testLotes = {
  nuevo: {
    codigo: 'LOTE-E2E-001',
    cultivo: 'Paltos',
    variedad: 'Hass',
    hectareas: '5',
    estado: 'activo'
  }
};

export const testIngresoFruta = {
  nuevo: {
    proveedor: 'Proveedor Test E2E',
    tipoFruta: 'Paltas',
    cantidad: '1000',
    unidad: 'kg',
    calidad: 'A',
    precioUnitario: '2500'
  }
};

