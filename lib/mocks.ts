// lib/mocks.ts - Demo data for demo mode

// Type definitions
export interface TareaCampo {
  id: string
  tenantId: string
  titulo: string
  descripcion?: string
  lote: string
  prioridad: 'Baja' | 'Media' | 'Alta'
  estado: 'Pendiente' | 'En Progreso' | 'Completada'
  fechaInicio: string
  fechaFin?: string
  asignadoA?: string
}

export interface RegistroEmpaque {
  id: string
  tenantId: string
  fecha: string
  cultivo: string
  kgEntraron: number
  kgSalieron: number
  kgDescartados: number
  notas?: string
}

export interface ItemInventario {
  id: string
  tenantId: string
  nombre: string
  categoria: string
  cantidad: number
  unidad: string
  ubicacion: string
  stockMinimo: number
}

export interface MovimientoCaja {
  id: string
  tenantId: string
  fecha: string
  tipo: 'Ingreso' | 'Egreso'
  categoria: string
  monto: number
  descripcion: string
  metodoPago?: string
}

// Deep clone initial data for reset functionality
const initialDemoData = {
  farms: [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      tenant_id: 'demo-tenant',
      name: 'Campo La Esperanza',
      location: 'Mendoza, Argentina',
      total_hectares: 150.5,
      crop_type: 'Uva',
      status: 'Activo',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      tenant_id: 'demo-tenant',
      name: 'Campo San José',
      location: 'San Juan, Argentina',
      total_hectares: 85.3,
      crop_type: 'Olivo',
      status: 'Activo',
      created_at: '2024-02-10T10:00:00Z',
      updated_at: '2024-02-10T10:00:00Z'
    }
  ],
  lots: [
    {
      id: '660e8400-e29b-41d4-a716-446655440001',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      tenant_id: 'demo-tenant',
      name: 'Lote A1',
      hectares: 25.5,
      variety: 'Malbec',
      planting_date: '2020-03-15',
      status: 'Producción',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440002',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      tenant_id: 'demo-tenant',
      name: 'Lote A2',
      hectares: 30.0,
      variety: 'Cabernet Sauvignon',
      planting_date: '2019-04-20',
      status: 'Producción',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440003',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      tenant_id: 'demo-tenant',
      name: 'Lote A3',
      hectares: 28.5,
      variety: 'Syrah',
      planting_date: '2020-05-10',
      status: 'Producción',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440004',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      tenant_id: 'demo-tenant',
      name: 'Lote A4',
      hectares: 22.0,
      variety: 'Chardonnay',
      planting_date: '2021-03-25',
      status: 'Producción',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440005',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      tenant_id: 'demo-tenant',
      name: 'Lote B1',
      hectares: 44.5,
      variety: 'Malbec',
      planting_date: '2018-04-15',
      status: 'Producción',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440006',
      farm_id: '550e8400-e29b-41d4-a716-446655440002',
      tenant_id: 'demo-tenant',
      name: 'Lote O1',
      hectares: 35.0,
      variety: 'Olivo Arauco',
      planting_date: '2017-06-10',
      status: 'Producción',
      created_at: '2024-02-10T10:00:00Z',
      updated_at: '2024-02-10T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440007',
      farm_id: '550e8400-e29b-41d4-a716-446655440002',
      tenant_id: 'demo-tenant',
      name: 'Lote O2',
      hectares: 30.3,
      variety: 'Olivo Arbequina',
      planting_date: '2018-05-20',
      status: 'Producción',
      created_at: '2024-02-10T10:00:00Z',
      updated_at: '2024-02-10T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440008',
      farm_id: '550e8400-e29b-41d4-a716-446655440002',
      tenant_id: 'demo-tenant',
      name: 'Lote O3',
      hectares: 20.0,
      variety: 'Olivo Frantoio',
      planting_date: '2019-04-15',
      status: 'Desarrollo',
      created_at: '2024-02-10T10:00:00Z',
      updated_at: '2024-02-10T10:00:00Z'
    }
  ],
  workers: [
    {
      id: '770e8400-e29b-41d4-a716-446655440001',
      tenant_id: 'demo-tenant',
      nombre: 'Juan',
      apellido: 'Pérez González',
      email: 'juan.perez@demo.com',
      telefono: '+54 261 123-4567',
      dni: '35.456.789',
      fecha_nacimiento: '1990-05-15',
      direccion: 'Calle San Martín 1234, Mendoza',
      rol: 'Operario de Campo',
      fecha_ingreso: '2023-01-10',
      salario: 450000,
      status: 'Activo',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440002',
      tenant_id: 'demo-tenant',
      nombre: 'María',
      apellido: 'Rodríguez Silva',
      email: 'maria.rodriguez@demo.com',
      telefono: '+54 261 234-5678',
      dni: '32.123.456',
      fecha_nacimiento: '1988-08-22',
      direccion: 'Av. Las Heras 567, Mendoza',
      rol: 'Supervisor de Empaque',
      fecha_ingreso: '2022-06-15',
      salario: 650000,
      status: 'Activo',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440003',
      tenant_id: 'demo-tenant',
      nombre: 'Carlos',
      apellido: 'López Martínez',
      email: 'carlos.lopez@demo.com',
      telefono: '+54 261 345-6789',
      dni: '38.789.012',
      fecha_nacimiento: '1992-03-10',
      direccion: 'Calle Belgrano 890, Luján de Cuyo',
      rol: 'Operario de Empaque',
      fecha_ingreso: '2023-03-20',
      salario: 480000,
      status: 'Activo',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440004',
      tenant_id: 'demo-tenant',
      nombre: 'Ana',
      apellido: 'García Fernández',
      email: 'ana.garcia@demo.com',
      telefono: '+54 261 456-7890',
      dni: '36.234.567',
      fecha_nacimiento: '1991-11-28',
      direccion: 'Calle Mitre 2345, Maipú',
      rol: 'Encargada de Control de Calidad',
      fecha_ingreso: '2022-09-01',
      salario: 600000,
      status: 'Activo',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440005',
      tenant_id: 'demo-tenant',
      nombre: 'Roberto',
      apellido: 'Sánchez Torres',
      email: 'roberto.sanchez@demo.com',
      telefono: '+54 261 567-8901',
      dni: '40.345.678',
      fecha_nacimiento: '1994-07-14',
      direccion: 'Calle Sarmiento 456, Godoy Cruz',
      rol: 'Operario de Campo',
      fecha_ingreso: '2023-05-10',
      salario: 450000,
      status: 'Activo',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440006',
      tenant_id: 'demo-tenant',
      nombre: 'Laura',
      apellido: 'Ramírez Díaz',
      email: 'laura.ramirez@demo.com',
      telefono: '+54 261 678-9012',
      dni: '34.567.890',
      fecha_nacimiento: '1989-12-05',
      direccion: 'Av. España 789, Mendoza',
      rol: 'Supervisor de Campo',
      fecha_ingreso: '2021-11-20',
      salario: 680000,
      status: 'Activo',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440007',
      tenant_id: 'demo-tenant',
      nombre: 'Diego',
      apellido: 'Morales Ruiz',
      email: 'diego.morales@demo.com',
      telefono: '+54 261 789-0123',
      dni: '37.890.123',
      fecha_nacimiento: '1993-04-18',
      direccion: 'Calle Colón 1122, Luján de Cuyo',
      rol: 'Operario de Empaque',
      fecha_ingreso: '2023-07-15',
      salario: 480000,
      status: 'Activo',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440008',
      tenant_id: 'demo-tenant',
      nombre: 'Patricia',
      apellido: 'Vargas Méndez',
      email: 'patricia.vargas@demo.com',
      telefono: '+54 261 890-1234',
      dni: '33.901.234',
      fecha_nacimiento: '1987-09-25',
      direccion: 'Calle Rivadavia 3344, Maipú',
      rol: 'Jefa de Logística',
      fecha_ingreso: '2021-04-12',
      salario: 720000,
      status: 'Activo',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440009',
      tenant_id: 'demo-tenant',
      nombre: 'Fernando',
      apellido: 'Castro Herrera',
      email: 'fernando.castro@demo.com',
      telefono: '+54 261 901-2345',
      dni: '39.012.345',
      fecha_nacimiento: '1995-02-08',
      direccion: 'Av. Godoy Cruz 5566, Godoy Cruz',
      rol: 'Operario de Empaque',
      fecha_ingreso: '2023-09-05',
      salario: 480000,
      status: 'Activo',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440010',
      tenant_id: 'demo-tenant',
      nombre: 'Gabriela',
      apellido: 'Núñez Flores',
      email: 'gabriela.nunez@demo.com',
      telefono: '+54 261 012-3456',
      dni: '36.123.789',
      fecha_nacimiento: '1991-06-30',
      direccion: 'Calle Alberti 778, Mendoza',
      rol: 'Administrativo',
      fecha_ingreso: '2022-08-18',
      salario: 550000,
      status: 'Activo',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440011',
      tenant_id: 'demo-tenant',
      nombre: 'Martín',
      apellido: 'Gutiérrez Paz',
      email: 'martin.gutierrez@demo.com',
      telefono: '+54 261 123-7890',
      dni: '41.234.890',
      fecha_nacimiento: '1996-10-12',
      direccion: 'Calle Alem 991, Luján de Cuyo',
      rol: 'Operario de Campo',
      fecha_ingreso: '2024-01-08',
      salario: 450000,
      status: 'Activo',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440012',
      tenant_id: 'demo-tenant',
      nombre: 'Valeria',
      apellido: 'Ortiz Romero',
      email: 'valeria.ortiz@demo.com',
      telefono: '+54 261 234-8901',
      dni: '35.345.901',
      fecha_nacimiento: '1990-01-20',
      direccion: 'Av. San Martín 1122, Maipú',
      rol: 'Técnica Agrónoma',
      fecha_ingreso: '2022-03-15',
      salario: 780000,
      status: 'Activo',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    }
  ],
  inventory: {
    items: [
      {
        id: '880e8400-e29b-41d4-a716-446655440001',
        tenant_id: 'demo-tenant',
        name: 'Fertilizante NPK 15-15-15',
        category: 'Fertilizantes',
        quantity: 500,
        unit: 'kg',
        location: 'Depósito A',
        min_stock: 100,
        price_per_unit: 150.50,
        status: 'Disponible',
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-15T10:00:00Z'
      },
      {
        id: '880e8400-e29b-41d4-a716-446655440002',
        tenant_id: 'demo-tenant',
        name: 'Herbicida Glifosato',
        category: 'Agroquímicos',
        quantity: 120,
        unit: 'L',
        location: 'Depósito B',
        min_stock: 30,
        price_per_unit: 280.00,
        status: 'Disponible',
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-15T10:00:00Z'
      }
    ],
    categories: [
      { id: '1', name: 'Fertilizantes', tenant_id: 'demo-tenant' },
      { id: '2', name: 'Agroquímicos', tenant_id: 'demo-tenant' },
      { id: '3', name: 'Semillas', tenant_id: 'demo-tenant' },
      { id: '4', name: 'Herramientas', tenant_id: 'demo-tenant' }
    ],
    locations: [
      { id: '1', name: 'Depósito A', tenant_id: 'demo-tenant' },
      { id: '2', name: 'Depósito B', tenant_id: 'demo-tenant' },
      { id: '3', name: 'Almacén Principal', tenant_id: 'demo-tenant' }
    ],
    movements: [
      {
        id: '990e8400-e29b-41d4-a716-446655440001',
        tenant_id: 'demo-tenant',
        item_id: '880e8400-e29b-41d4-a716-446655440001',
        type: 'Entrada',
        quantity: 200,
        date: '2024-10-01T10:00:00Z',
        reason: 'Compra mensual',
        user: 'Admin Demo'
      }
    ]
  },
  empaque: {
    pallets: [
      {
        id: 'aa0e8400-e29b-41d4-a716-446655440001',
        tenant_id: 'demo-tenant',
        codigo: 'PAL-001',
        tipo_fruta: 'Uva',
        variedad: 'Malbec',
        peso_kg: 450.5,
        cajas: 25,
        fecha_empaque: '2024-10-05',
        estado: 'en_camara',
        ubicacion: 'Cámara 1',
        temperatura_almacen: 2.5,
        lote_origen: 'Lote A1',
        created_at: '2024-10-05T10:00:00Z'
      },
      {
        id: 'aa0e8400-e29b-41d4-a716-446655440002',
        tenant_id: 'demo-tenant',
        codigo: 'PAL-002',
        tipo_fruta: 'Uva',
        variedad: 'Cabernet',
        peso_kg: 480.0,
        cajas: 27,
        fecha_empaque: '2024-10-06',
        estado: 'despachado',
        ubicacion: 'En tránsito',
        temperatura_almacen: 2.0,
        lote_origen: 'Lote A2',
        created_at: '2024-10-06T10:00:00Z'
      },
      {
        id: 'aa0e8400-e29b-41d4-a716-446655440003',
        tenant_id: 'demo-tenant',
        codigo: 'PAL-003',
        tipo_fruta: 'Uva',
        variedad: 'Malbec',
        peso_kg: 465.0,
        cajas: 26,
        fecha_empaque: '2024-10-07',
        estado: 'listo_despacho',
        ubicacion: 'Cámara 2',
        temperatura_almacen: 2.2,
        lote_origen: 'Lote A1',
        created_at: '2024-10-07T10:00:00Z'
      },
      {
        id: 'aa0e8400-e29b-41d4-a716-446655440004',
        tenant_id: 'demo-tenant',
        codigo: 'PAL-004',
        tipo_fruta: 'Uva',
        variedad: 'Syrah',
        peso_kg: 442.5,
        cajas: 24,
        fecha_empaque: '2024-10-08',
        estado: 'armado',
        ubicacion: 'Área de empaque',
        lote_origen: 'Lote A2',
        created_at: '2024-10-08T10:00:00Z'
      },
      {
        id: 'aa0e8400-e29b-41d4-a716-446655440005',
        tenant_id: 'demo-tenant',
        codigo: 'PAL-005',
        tipo_fruta: 'Uva',
        variedad: 'Malbec',
        peso_kg: 458.0,
        cajas: 25,
        fecha_empaque: '2024-10-09',
        estado: 'en_camara',
        ubicacion: 'Cámara 1',
        temperatura_almacen: 2.3,
        lote_origen: 'Lote A1',
        created_at: '2024-10-09T11:00:00Z'
      }
    ],
    ingreso_fruta: [
      {
        id: 'bb0e8400-e29b-41d4-a716-446655440001',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-05',
        lote_origen: 'Lote A1',
        tipo_fruta: 'Uva',
        variedad: 'Malbec',
        peso_kg: 1200.5,
        calidad: 'Premium',
        estado: 'Procesado',
        proveedor: 'Campo La Esperanza',
        numero_lote: 'ING-2024-001',
        temperatura: 18.5,
        observaciones: 'Fruta en excelente estado',
        created_at: '2024-10-05T08:00:00Z'
      },
      {
        id: 'bb0e8400-e29b-41d4-a716-446655440002',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-06',
        lote_origen: 'Lote A2',
        tipo_fruta: 'Uva',
        variedad: 'Cabernet Sauvignon',
        peso_kg: 1350.0,
        calidad: 'Premium',
        estado: 'Procesado',
        proveedor: 'Campo La Esperanza',
        numero_lote: 'ING-2024-002',
        temperatura: 19.0,
        observaciones: 'Grado de madurez óptimo',
        created_at: '2024-10-06T08:30:00Z'
      },
      {
        id: 'bb0e8400-e29b-41d4-a716-446655440003',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-07',
        lote_origen: 'Lote A1',
        tipo_fruta: 'Uva',
        variedad: 'Malbec',
        peso_kg: 1180.0,
        calidad: 'Estándar',
        estado: 'En revisión',
        proveedor: 'Campo La Esperanza',
        numero_lote: 'ING-2024-003',
        temperatura: 20.0,
        observaciones: 'Algunos racimos con leve deterioro',
        created_at: '2024-10-07T07:45:00Z'
      },
      {
        id: 'bb0e8400-e29b-41d4-a716-446655440004',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-08',
        lote_origen: 'Lote A2',
        tipo_fruta: 'Uva',
        variedad: 'Syrah',
        peso_kg: 980.0,
        calidad: 'Premium',
        estado: 'Recibido',
        proveedor: 'Campo La Esperanza',
        numero_lote: 'ING-2024-004',
        temperatura: 18.0,
        observaciones: 'Cosecha temprana, excelente calidad',
        created_at: '2024-10-08T09:00:00Z'
      },
      {
        id: 'bb0e8400-e29b-41d4-a716-446655440005',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-09',
        lote_origen: 'Lote A1',
        tipo_fruta: 'Uva',
        variedad: 'Malbec',
        peso_kg: 1275.0,
        calidad: 'Premium',
        estado: 'En proceso',
        proveedor: 'Campo La Esperanza',
        numero_lote: 'ING-2024-005',
        temperatura: 17.5,
        observaciones: 'Fruta de alta calidad, inicio de procesamiento',
        created_at: '2024-10-09T08:15:00Z'
      }
    ],
    egreso_fruta: [
      {
        id: 'cc0e8400-e29b-41d4-a716-446655440001',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-08',
        pallet_id: 'aa0e8400-e29b-41d4-a716-446655440002',
        destino: 'Exportación - Europa',
        peso_kg: 480.0,
        transporte: 'Camión ABC-123',
        estado: 'Despachado',
        tipo_movimiento: 'venta',
        tipo_fruta: 'Uva Cabernet',
        cantidad: 480,
        unidad: 'kg',
        valor_unitario: 5.50,
        valor_total: 2640.00,
        responsable: 'María Rodríguez',
        documento_referencia: 'FAC-2024-001',
        created_at: '2024-10-08T14:00:00Z'
      },
      {
        id: 'cc0e8400-e29b-41d4-a716-446655440002',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-07',
        pallet_id: 'aa0e8400-e29b-41d4-a716-446655440003',
        destino: 'Distribuidora XYZ - Buenos Aires',
        peso_kg: 465.0,
        transporte: 'Camión DEF-456',
        estado: 'En tránsito',
        tipo_movimiento: 'venta',
        tipo_fruta: 'Uva Malbec',
        cantidad: 465,
        unidad: 'kg',
        valor_unitario: 6.00,
        valor_total: 2790.00,
        responsable: 'Carlos López',
        documento_referencia: 'FAC-2024-002',
        created_at: '2024-10-07T16:00:00Z'
      },
      {
        id: 'cc0e8400-e29b-41d4-a716-446655440003',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-06',
        pallet_id: null,
        destino: 'Descarte - Compostaje',
        peso_kg: 85.5,
        transporte: 'N/A',
        estado: 'Completado',
        tipo_movimiento: 'merma',
        tipo_fruta: 'Uva mixta',
        cantidad: 85.5,
        unidad: 'kg',
        motivo: 'Fruta con deterioro no apta para venta',
        responsable: 'Juan Pérez',
        created_at: '2024-10-06T18:00:00Z'
      },
      {
        id: 'cc0e8400-e29b-41d4-a716-446655440004',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-09',
        pallet_id: 'aa0e8400-e29b-41d4-a716-446655440005',
        destino: 'Supermercados del Centro',
        peso_kg: 458.0,
        transporte: 'Camión GHI-789',
        estado: 'Preparando',
        tipo_movimiento: 'venta',
        tipo_fruta: 'Uva Malbec',
        cantidad: 458,
        unidad: 'kg',
        valor_unitario: 5.80,
        valor_total: 2656.40,
        responsable: 'María Rodríguez',
        documento_referencia: 'FAC-2024-003',
        created_at: '2024-10-09T10:00:00Z'
      }
    ],
    despacho: [
      {
        id: 'dd0e8400-e29b-41d4-a716-446655440001',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-08',
        numero_guia: 'DESP-2024-001',
        cliente: 'Distribuidora XYZ',
        transportista: 'Transportes del Valle',
        pallets: ['aa0e8400-e29b-41d4-a716-446655440002'],
        peso_total_kg: 480.0,
        destino: 'Buenos Aires, Argentina',
        fecha_entrega_estimada: '2024-10-10',
        estado: 'en_transito',
        responsable: 'María Rodríguez',
        observaciones: 'Mantener cadena de frío',
        created_at: '2024-10-08T15:00:00Z'
      },
      {
        id: 'dd0e8400-e29b-41d4-a716-446655440002',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-09',
        numero_guia: 'DESP-2024-002',
        cliente: 'Exportadora del Sur',
        transportista: 'Logística Internacional SA',
        pallets: ['aa0e8400-e29b-41d4-a716-446655440003'],
        peso_total_kg: 465.0,
        destino: 'Puerto de Buenos Aires',
        fecha_entrega_estimada: '2024-10-11',
        estado: 'preparando',
        responsable: 'Carlos López',
        observaciones: 'Documentación de exportación en proceso',
        created_at: '2024-10-09T10:00:00Z'
      },
      {
        id: 'dd0e8400-e29b-41d4-a716-446655440003',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-07',
        numero_guia: 'DESP-2024-003',
        cliente: 'Supermercados del Centro',
        transportista: 'Transportes Rápidos',
        pallets: ['aa0e8400-e29b-41d4-a716-446655440001'],
        peso_total_kg: 450.5,
        destino: 'Córdoba, Argentina',
        fecha_entrega_estimada: '2024-10-08',
        estado: 'entregado',
        responsable: 'Juan Pérez',
        observaciones: 'Entrega completada sin novedad',
        created_at: '2024-10-07T14:00:00Z'
      },
      {
        id: 'dd0e8400-e29b-41d4-a716-446655440004',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-06',
        numero_guia: 'DESP-2024-004',
        cliente: 'Bodega Los Andes',
        transportista: 'Transportes del Valle',
        pallets: ['aa0e8400-e29b-41d4-a716-446655440004'],
        peso_total_kg: 442.5,
        destino: 'Mendoza, Argentina',
        fecha_entrega_estimada: '2024-10-07',
        estado: 'entregado',
        responsable: 'Carlos López',
        observaciones: 'Entrega realizada exitosamente',
        created_at: '2024-10-06T13:00:00Z'
      }
    ],
    preseleccion: [
      {
        id: 'ee0e8400-e29b-41d4-a716-446655440001',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-05',
        semana: 'Semana 41',
        lote: 'Lote A1',
        tipo_fruta: 'Uva Malbec',
        peso_total_kg: 1200.5,
        peso_descarte_kg: 80.2,
        cantidad_procesada: 1120.3,
        porcentaje_aprovechamiento: 93.3,
        estado: 'Completado',
        responsable: 'María Rodríguez',
        control_calidad: true,
        temperatura: 18.5,
        humedad: 65.0,
        bin_volcados: 24,
        ritmo_maquina: 450,
        duracion_proceso: 180,
        bin_pleno: 18,
        bin_intermedio_I: 4,
        bin_intermedio_II: 2,
        bin_incipiente: 0,
        cant_personal: 8,
        motivo_descarte: 'Racimos con deterioro, hojas y tallos',
        observaciones: 'Proceso óptimo, buena calidad general',
        created_at: '2024-10-05T09:00:00Z'
      },
      {
        id: 'ee0e8400-e29b-41d4-a716-446655440002',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-06',
        semana: 'Semana 41',
        lote: 'Lote A2',
        tipo_fruta: 'Uva Cabernet Sauvignon',
        peso_total_kg: 1350.0,
        peso_descarte_kg: 95.5,
        cantidad_procesada: 1254.5,
        porcentaje_aprovechamiento: 92.9,
        estado: 'Completado',
        responsable: 'Carlos López',
        control_calidad: true,
        temperatura: 19.0,
        humedad: 68.0,
        bin_volcados: 27,
        ritmo_maquina: 460,
        duracion_proceso: 195,
        bin_pleno: 20,
        bin_intermedio_I: 5,
        bin_intermedio_II: 2,
        bin_incipiente: 0,
        cant_personal: 9,
        motivo_descarte: 'Material vegetal, uvas dañadas',
        observaciones: 'Buen rendimiento, algunos racimos sobremaduros',
        created_at: '2024-10-06T09:30:00Z'
      },
      {
        id: 'ee0e8400-e29b-41d4-a716-446655440003',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-07',
        semana: 'Semana 41',
        lote: 'Lote A1',
        tipo_fruta: 'Uva Malbec',
        peso_total_kg: 1180.0,
        peso_descarte_kg: 125.0,
        cantidad_procesada: 1055.0,
        porcentaje_aprovechamiento: 89.4,
        estado: 'Completado',
        responsable: 'Juan Pérez',
        control_calidad: true,
        temperatura: 20.0,
        humedad: 70.0,
        bin_volcados: 23,
        ritmo_maquina: 440,
        duracion_proceso: 185,
        bin_pleno: 16,
        bin_intermedio_I: 5,
        bin_intermedio_II: 2,
        bin_incipiente: 0,
        cant_personal: 8,
        motivo_descarte: 'Mayor cantidad de deterioro por lluvia',
        observaciones: 'Fruta afectada por condiciones climáticas',
        created_at: '2024-10-07T08:00:00Z'
      },
      {
        id: 'ee0e8400-e29b-41d4-a716-446655440004',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-08',
        semana: 'Semana 41',
        lote: 'Lote A2',
        tipo_fruta: 'Uva Syrah',
        peso_total_kg: 980.0,
        peso_descarte_kg: 58.8,
        cantidad_procesada: 921.2,
        porcentaje_aprovechamiento: 94.0,
        estado: 'Completado',
        responsable: 'María Rodríguez',
        control_calidad: true,
        temperatura: 18.0,
        humedad: 62.0,
        bin_volcados: 20,
        ritmo_maquina: 470,
        duracion_proceso: 150,
        bin_pleno: 17,
        bin_intermedio_I: 3,
        bin_intermedio_II: 0,
        bin_incipiente: 0,
        cant_personal: 7,
        motivo_descarte: 'Descarte mínimo, excelente calidad',
        observaciones: 'Cosecha temprana con excelentes resultados',
        created_at: '2024-10-08T09:15:00Z'
      },
      {
        id: 'ee0e8400-e29b-41d4-a716-446655440005',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-09',
        semana: 'Semana 41',
        lote: 'Lote A1',
        tipo_fruta: 'Uva Malbec',
        peso_total_kg: 1275.0,
        peso_descarte_kg: 89.25,
        cantidad_procesada: 1185.75,
        porcentaje_aprovechamiento: 93.0,
        estado: 'En proceso',
        responsable: 'Juan Pérez',
        control_calidad: true,
        temperatura: 17.5,
        humedad: 64.0,
        bin_volcados: 25,
        ritmo_maquina: 455,
        duracion_proceso: 190,
        bin_pleno: 19,
        bin_intermedio_I: 4,
        bin_intermedio_II: 2,
        bin_incipiente: 0,
        cant_personal: 8,
        motivo_descarte: 'Descarte estándar del proceso',
        observaciones: 'Proceso en desarrollo, ritmo constante',
        created_at: '2024-10-09T08:30:00Z'
      }
    ]
  },
  finanzas: {
    categories: [
      { id: '1', name: 'Insumos', type: 'Egreso', tenant_id: 'demo-tenant' },
      { id: '2', name: 'Salarios', type: 'Egreso', tenant_id: 'demo-tenant' },
      { id: '3', name: 'Ventas', type: 'Ingreso', tenant_id: 'demo-tenant' },
      { id: '4', name: 'Servicios', type: 'Egreso', tenant_id: 'demo-tenant' }
    ],
    cash_movements: [
      {
        id: 'ff0e8400-e29b-41d4-a716-446655440001',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-01',
        tipo: 'Egreso',
        categoria: 'Insumos',
        monto: -45000.00,
        descripcion: 'Compra fertilizantes',
        metodo_pago: 'Transferencia',
        created_at: '2024-10-01T10:00:00Z'
      },
      {
        id: 'ff0e8400-e29b-41d4-a716-446655440002',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-05',
        tipo: 'Ingreso',
        categoria: 'Ventas',
        monto: 125000.00,
        descripcion: 'Venta uvas premium',
        metodo_pago: 'Transferencia',
        created_at: '2024-10-05T16:00:00Z'
      },
      {
        id: 'ff0e8400-e29b-41d4-a716-446655440003',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-08',
        tipo: 'Egreso',
        categoria: 'Salarios',
        monto: -85000.00,
        descripcion: 'Pago salarios octubre',
        metodo_pago: 'Transferencia',
        created_at: '2024-10-08T12:00:00Z'
      }
    ]
  },
  contacts: [
    {
      id: '11111111-e29b-41d4-a716-446655440001',
      tenant_id: 'demo-tenant',
      nombre: 'Distribuidora XYZ',
      tipo: 'Cliente',
      email: 'ventas@distribuidoraxyz.com',
      telefono: '+54 11 4567-8900',
      direccion: 'Av. Corrientes 1234, CABA',
      status: 'Activo',
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '11111111-e29b-41d4-a716-446655440002',
      tenant_id: 'demo-tenant',
      nombre: 'Agroquímicos del Sur',
      tipo: 'Proveedor',
      email: 'compras@agroquimicos.com',
      telefono: '+54 261 890-1234',
      direccion: 'Ruta 7 Km 15, Mendoza',
      status: 'Activo',
      created_at: '2024-01-20T10:00:00Z'
    }
  ],
  tareasCampo: [
    {
      id: '1',
      tenantId: 'demo-tenant',
      titulo: 'Control de plagas',
      descripcion: 'Revisar y controlar plagas en el cultivo de uva.',
      lote: 'Lote A1',
      prioridad: 'Alta',
      estado: 'Pendiente',
      fechaInicio: '2024-10-01',
      fechaFin: '2024-10-10',
      asignadoA: '770e8400-e29b-41d4-a716-446655440002'
    },
    {
      id: '2',
      tenantId: 'demo-tenant',
      titulo: 'Riego',
      descripcion: 'Ajustar sistema de riego en el campo de olivo.',
      lote: 'Lote A2',
      prioridad: 'Media',
      estado: 'En Progreso',
      fechaInicio: '2024-10-05',
      fechaFin: '2024-10-07',
      asignadoA: '770e8400-e29b-41d4-a716-446655440001'
    }
  ],
  registrosEmpaque: [
    {
      id: '1',
      tenantId: 'demo-tenant',
      fecha: '2024-10-05',
      cultivo: 'Uva Malbec',
      kgEntraron: 1200.5,
      kgSalieron: 1100.0,
      kgDescartados: 100.5,
      notas: 'Descarte por calidad - racimos deteriorados'
    },
    {
      id: '2',
      tenantId: 'demo-tenant',
      fecha: '2024-10-06',
      cultivo: 'Uva Cabernet',
      kgEntraron: 1350.0,
      kgSalieron: 1280.0,
      kgDescartados: 70.0,
      notas: 'Descarte mínimo - buena calidad general'
    },
    {
      id: '3',
      tenantId: 'demo-tenant',
      fecha: '2024-10-07',
      cultivo: 'Uva Malbec',
      kgEntraron: 1180.0,
      kgSalieron: 1050.0,
      kgDescartados: 130.0,
      notas: 'Mayor descarte debido a condiciones climáticas adversas'
    },
    {
      id: '4',
      tenantId: 'demo-tenant',
      fecha: '2024-10-08',
      cultivo: 'Uva Syrah',
      kgEntraron: 980.0,
      kgSalieron: 920.0,
      kgDescartados: 60.0,
      notas: 'Excelente calidad - descarte estándar'
    },
    {
      id: '5',
      tenantId: 'demo-tenant',
      fecha: '2024-10-09',
      cultivo: 'Uva Malbec',
      kgEntraron: 1275.0,
      kgSalieron: 1195.0,
      kgDescartados: 80.0,
      notas: 'Proceso normal - fruta de alta calidad'
    },
    {
      id: '6',
      tenantId: 'demo-tenant',
      fecha: '2024-10-04',
      cultivo: 'Uva Chardonnay',
      kgEntraron: 850.0,
      kgSalieron: 790.0,
      kgDescartados: 60.0,
      notas: 'Primera cosecha de uva blanca - buena calidad'
    },
    {
      id: '7',
      tenantId: 'demo-tenant',
      fecha: '2024-10-03',
      cultivo: 'Uva Malbec',
      kgEntraron: 1420.0,
      kgSalieron: 1330.0,
      kgDescartados: 90.0,
      notas: 'Fruta madura - punto óptimo de cosecha'
    },
    {
      id: '8',
      tenantId: 'demo-tenant',
      fecha: '2024-10-02',
      cultivo: 'Uva Cabernet',
      kgEntraron: 1050.0,
      kgSalieron: 985.0,
      kgDescartados: 65.0,
      notas: 'Calidad premium - lote para exportación'
    }
  ],
  inventario: {
    items: [
      {
        id: '880e8400-e29b-41d4-a716-446655440001',
        tenant_id: 'demo-tenant',
        name: 'Fertilizante NPK 15-15-15',
        category: 'Fertilizantes',
        quantity: 500,
        unit: 'kg',
        location: 'Depósito A',
        min_stock: 100,
        price_per_unit: 150.50,
        status: 'Disponible',
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-15T10:00:00Z'
      },
      {
        id: '880e8400-e29b-41d4-a716-446655440002',
        tenant_id: 'demo-tenant',
        name: 'Herbicida Glifosato',
        category: 'Agroquímicos',
        quantity: 120,
        unit: 'L',
        location: 'Depósito B',
        min_stock: 30,
        price_per_unit: 280.00,
        status: 'Disponible',
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-15T10:00:00Z'
      }
    ],
    categories: [
      { id: '1', name: 'Fertilizantes', tenant_id: 'demo-tenant' },
      { id: '2', name: 'Agroquímicos', tenant_id: 'demo-tenant' },
      { id: '3', name: 'Semillas', tenant_id: 'demo-tenant' },
      { id: '4', name: 'Herramientas', tenant_id: 'demo-tenant' }
    ],
    locations: [
      { id: '1', name: 'Depósito A', tenant_id: 'demo-tenant' },
      { id: '2', name: 'Depósito B', tenant_id: 'demo-tenant' },
      { id: '3', name: 'Almacén Principal', tenant_id: 'demo-tenant' }
    ],
    movements: [
      {
        id: '990e8400-e29b-41d4-a716-446655440001',
        tenant_id: 'demo-tenant',
        item_id: '880e8400-e29b-41d4-a716-446655440001',
        type: 'Entrada',
        quantity: 200,
        date: '2024-10-01T10:00:00Z',
        reason: 'Compra mensual',
        user: 'Admin Demo'
      }
    ]
  },
  movimientosCaja: [
    {
      id: 'ff0e8400-e29b-41d4-a716-446655440001',
      tenant_id: 'demo-tenant',
      fecha: '2024-10-01',
      tipo: 'Egreso',
      categoria: 'Insumos',
      monto: -45000.00,
      descripcion: 'Compra fertilizantes',
      metodo_pago: 'Transferencia',
      created_at: '2024-10-01T10:00:00Z'
    },
    {
      id: 'ff0e8400-e29b-41d4-a716-446655440002',
      tenant_id: 'demo-tenant',
      fecha: '2024-10-05',
      tipo: 'Ingreso',
      categoria: 'Ventas',
      monto: 125000.00,
      descripcion: 'Venta uvas premium',
      metodo_pago: 'Transferencia',
      created_at: '2024-10-05T16:00:00Z'
    },
    {
      id: 'ff0e8400-e29b-41d4-a716-446655440003',
      tenant_id: 'demo-tenant',
      fecha: '2024-10-08',
      tipo: 'Egreso',
      categoria: 'Salarios',
      monto: -85000.00,
      descripcion: 'Pago salarios octubre',
      metodo_pago: 'Transferencia',
      created_at: '2024-10-08T12:00:00Z'
    }
  ]
}

// Mutable demo data store (resets on page refresh)
export let demoData = JSON.parse(JSON.stringify(initialDemoData))

// Reset demo data to initial state
export function resetDemoData() {
  demoData = JSON.parse(JSON.stringify(initialDemoData))
}

// Helper to generate UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// CRUD operations for demo data
export const demoOperations = {
  // Farms
  createFarm(data: any) {
    const newFarm = {
      ...data,
      id: data.id || generateUUID(),
      tenant_id: 'demo-tenant',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    demoData.farms.push(newFarm)
    return newFarm
  },

  updateFarm(id: string, data: any) {
    const index = demoData.farms.findIndex(f => f.id === id)
    if (index !== -1) {
      demoData.farms[index] = { ...demoData.farms[index], ...data, updated_at: new Date().toISOString() }
      return demoData.farms[index]
    }
    return null
  },

  deleteFarm(id: string) {
    const index = demoData.farms.findIndex(f => f.id === id)
    if (index !== -1) {
      demoData.farms.splice(index, 1)
      return true
    }
    return false
  },

  // Workers
  createWorker(data: any) {
    const newWorker = {
      ...data,
      id: data.id || generateUUID(),
      tenant_id: 'demo-tenant',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    demoData.workers.push(newWorker)
    return newWorker
  },

  updateWorker(id: string, data: any) {
    const index = demoData.workers.findIndex(w => w.id === id)
    if (index !== -1) {
      demoData.workers[index] = { ...demoData.workers[index], ...data, updated_at: new Date().toISOString() }
      return demoData.workers[index]
    }
    return null
  },

  deleteWorker(id: string) {
    const index = demoData.workers.findIndex(w => w.id === id)
    if (index !== -1) {
      demoData.workers.splice(index, 1)
      return true
    }
    return false
  },

  // Generic create for any collection
  create(collection: string, data: any) {
    const item = {
      ...data,
      id: data.id || generateUUID(),
      tenant_id: 'demo-tenant',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Handle nested collections
    if (collection.includes('.')) {
      const [parent, child] = collection.split('.')
      if (demoData[parent] && Array.isArray(demoData[parent][child])) {
        demoData[parent][child].push(item)
      }
    } else if (Array.isArray(demoData[collection])) {
      demoData[collection].push(item)
    }

    return item
  },

  // Generic update
  update(collection: string, id: string, data: any) {
    let items
    if (collection.includes('.')) {
      const [parent, child] = collection.split('.')
      items = demoData[parent]?.[child]
    } else {
      items = demoData[collection]
    }

    if (Array.isArray(items)) {
      const index = items.findIndex(item => item.id === id)
      if (index !== -1) {
        items[index] = { ...items[index], ...data, updated_at: new Date().toISOString() }
        return items[index]
      }
    }
    return null
  },

  // Generic delete
  delete(collection: string, id: string) {
    let items
    if (collection.includes('.')) {
      const [parent, child] = collection.split('.')
      items = demoData[parent]?.[child]
    } else {
      items = demoData[collection]
    }

    if (Array.isArray(items)) {
      const index = items.findIndex(item => item.id === id)
      if (index !== -1) {
        items.splice(index, 1)
        return true
      }
    }
    return false
  }
}

// Export arrays for api.ts compatibility
export const tareasCampo: TareaCampo[] = demoData.tareasCampo || []
export const registrosEmpaque: RegistroEmpaque[] = demoData.registrosEmpaque || []
export const inventario: ItemInventario[] = demoData.inventario?.items?.map((item: any) => ({
  id: item.id,
  tenantId: item.tenant_id,
  nombre: item.name,
  categoria: item.category,
  cantidad: item.quantity,
  unidad: item.unit,
  ubicacion: item.location,
  stockMinimo: item.min_stock
})) || []
export const movimientosCaja: MovimientoCaja[] = demoData.movimientosCaja?.map((mov: any) => ({
  id: mov.id,
  tenantId: mov.tenant_id,
  fecha: mov.fecha,
  tipo: mov.tipo,
  categoria: mov.categoria,
  monto: mov.monto,
  descripcion: mov.descripcion,
  metodoPago: mov.metodo_pago
})) || []
