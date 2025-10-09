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
      location: 'Ruta 40, Km 1250, Mendoza, Argentina',
      area_ha: 150.5,
      default_crop: 'Uvas Malbec',
      notes: 'Campo principal con sistema de riego por goteo instalado en 2023. Suelo arcilloso con buen drenaje. Certificación orgánica en proceso.',
      created_at: '2024-01-15T10:00:00Z',
      created_by: 'demo-user',
      // Legacy fields for compatibility
      total_hectares: 150.5,
      crop_type: 'Uva',
      status: 'Activo',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      tenant_id: 'demo-tenant',
      name: 'Campo San José',
      location: 'Camino Rural 234, Valle de Uco, San Juan, Argentina',
      area_ha: 85.3,
      default_crop: 'Olivos Arbequina',
      notes: 'Viñedo establecido en 2015. Exposición norte ideal para aceitunas de alta calidad. Sistema de riego tecnificado.',
      created_at: '2024-02-10T10:00:00Z',
      created_by: 'demo-user',
      // Legacy fields for compatibility
      total_hectares: 85.3,
      crop_type: 'Olivo',
      status: 'Activo',
      updated_at: '2024-02-10T10:00:00Z'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      tenant_id: 'demo-tenant',
      name: 'Finca Los Andes',
      location: 'Ruta Provincial 15, Tupungato, Mendoza',
      area_ha: 67.8,
      default_crop: 'Cerezas Bing',
      notes: 'Terreno con pendiente moderada, protección natural contra heladas. Ideal para cultivos de cereza de exportación.',
      created_at: '2024-03-05T10:00:00Z',
      created_by: 'demo-user',
      // Legacy fields for compatibility
      total_hectares: 67.8,
      crop_type: 'Cereza',
      status: 'Activo',
      updated_at: '2024-03-05T10:00:00Z'
    }
  ],
  lots: [
    {
      id: '660e8400-e29b-41d4-a716-446655440001',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      tenant_id: 'demo-tenant',
      code: 'L-A1',
      crop: 'Uvas',
      variety: 'Malbec',
      area_ha: 25.5,
      plant_date: '2020-03-15',
      status: 'activo',
      created_at: '2024-01-15T10:00:00Z',
      // Legacy fields for compatibility
      name: 'Lote A1',
      hectares: 25.5,
      planting_date: '2020-03-15',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440002',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      tenant_id: 'demo-tenant',
      code: 'L-A2',
      crop: 'Uvas',
      variety: 'Cabernet Sauvignon',
      area_ha: 30.0,
      plant_date: '2019-04-20',
      status: 'activo',
      created_at: '2024-01-15T10:00:00Z',
      // Legacy fields for compatibility
      name: 'Lote A2',
      hectares: 30.0,
      planting_date: '2019-04-20',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440003',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      tenant_id: 'demo-tenant',
      code: 'L-A3',
      crop: 'Uvas',
      variety: 'Syrah',
      area_ha: 28.5,
      plant_date: '2020-05-10',
      status: 'activo',
      created_at: '2024-01-15T10:00:00Z',
      // Legacy fields for compatibility
      name: 'Lote A3',
      hectares: 28.5,
      planting_date: '2020-05-10',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440004',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      tenant_id: 'demo-tenant',
      code: 'L-A4',
      crop: 'Uvas',
      variety: 'Chardonnay',
      area_ha: 22.0,
      plant_date: '2021-03-25',
      status: 'activo',
      created_at: '2024-01-15T10:00:00Z',
      // Legacy fields for compatibility
      name: 'Lote A4',
      hectares: 22.0,
      planting_date: '2021-03-25',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440005',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      tenant_id: 'demo-tenant',
      code: 'L-B1',
      crop: 'Uvas',
      variety: 'Malbec',
      area_ha: 44.5,
      plant_date: '2018-04-15',
      status: 'activo',
      created_at: '2024-01-15T10:00:00Z',
      // Legacy fields for compatibility
      name: 'Lote B1',
      hectares: 44.5,
      planting_date: '2018-04-15',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440006',
      farm_id: '550e8400-e29b-41d4-a716-446655440002',
      tenant_id: 'demo-tenant',
      code: 'L-O1',
      crop: 'Olivos',
      variety: 'Arauco',
      area_ha: 35.0,
      plant_date: '2017-06-10',
      status: 'activo',
      created_at: '2024-02-10T10:00:00Z',
      // Legacy fields for compatibility
      name: 'Lote O1',
      hectares: 35.0,
      planting_date: '2017-06-10',
      updated_at: '2024-02-10T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440007',
      farm_id: '550e8400-e29b-41d4-a716-446655440002',
      tenant_id: 'demo-tenant',
      code: 'L-O2',
      crop: 'Olivos',
      variety: 'Arbequina',
      area_ha: 30.3,
      plant_date: '2018-05-20',
      status: 'activo',
      created_at: '2024-02-10T10:00:00Z',
      // Legacy fields for compatibility
      name: 'Lote O2',
      hectares: 30.3,
      planting_date: '2018-05-20',
      updated_at: '2024-02-10T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440008',
      farm_id: '550e8400-e29b-41d4-a716-446655440002',
      tenant_id: 'demo-tenant',
      code: 'L-O3',
      crop: 'Olivos',
      variety: 'Frantoio',
      area_ha: 20.0,
      plant_date: '2019-04-15',
      status: 'preparacion',
      created_at: '2024-02-10T10:00:00Z',
      // Legacy fields for compatibility
      name: 'Lote O3',
      hectares: 20.0,
      planting_date: '2019-04-15',
      updated_at: '2024-02-10T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440009',
      farm_id: '550e8400-e29b-41d4-a716-446655440003',
      tenant_id: 'demo-tenant',
      code: 'L-C1',
      crop: 'Cerezas',
      variety: 'Bing',
      area_ha: 15.5,
      plant_date: '2021-08-10',
      status: 'activo',
      created_at: '2024-03-05T10:00:00Z',
      // Legacy fields for compatibility
      name: 'Lote C1',
      hectares: 15.5,
      planting_date: '2021-08-10',
      updated_at: '2024-03-05T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440010',
      farm_id: '550e8400-e29b-41d4-a716-446655440003',
      tenant_id: 'demo-tenant',
      code: 'L-C2',
      crop: 'Cerezas',
      variety: 'Lapins',
      area_ha: 18.3,
      plant_date: '2021-09-05',
      status: 'activo',
      created_at: '2024-03-05T10:00:00Z',
      // Legacy fields for compatibility
      name: 'Lote C2',
      hectares: 18.3,
      planting_date: '2021-09-05',
      updated_at: '2024-03-05T10:00:00Z'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440011',
      farm_id: '550e8400-e29b-41d4-a716-446655440003',
      tenant_id: 'demo-tenant',
      code: 'L-C3',
      crop: 'Cerezas',
      variety: 'Sweetheart',
      area_ha: 12.0,
      plant_date: '2022-07-20',
      status: 'activo',
      created_at: '2024-03-05T10:00:00Z',
      // Legacy fields for compatibility
      name: 'Lote C3',
      hectares: 12.0,
      planting_date: '2022-07-20',
      updated_at: '2024-03-05T10:00:00Z'
    }
  ],
  tasks: [
    // Campo La Esperanza - Lote A1 (Malbec) tasks
    {
      id: 'task-001',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      lot_id: '660e8400-e29b-41d4-a716-446655440001',
      title: 'Riego programado',
      description: 'Revisar sistema de riego por goteo y realizar riego según necesidades del cultivo. Verificar presión de agua y estado de goteros.',
      type_code: 'riego',
      status_code: 'pendiente',
      scheduled_date: '2025-10-11',
      worker_id: '770e8400-e29b-41d4-a716-446655440001', // Juan Pérez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    {
      id: 'task-002',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      lot_id: '660e8400-e29b-41d4-a716-446655440001',
      title: 'Aplicación de fertilizantes',
      description: 'Aplicar fertilizante NPK según análisis de suelo. Respetar dosis recomendadas (150kg/ha) y condiciones climáticas.',
      type_code: 'fertilizacion',
      status_code: 'pendiente',
      scheduled_date: '2025-10-16',
      worker_id: '770e8400-e29b-41d4-a716-446655440006', // Laura Ramírez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    {
      id: 'task-003',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      lot_id: '660e8400-e29b-41d4-a716-446655440001',
      title: 'Poda de formación',
      description: 'Realizar poda de verano para control de vigor. Eliminar chupones y ramas mal orientadas. Dejar 8-10 yemas por sarmiento.',
      type_code: 'poda',
      status_code: 'pendiente',
      scheduled_date: '2025-10-23',
      worker_id: '770e8400-e29b-41d4-a716-446655440005', // Roberto Sánchez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    {
      id: 'task-004',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      lot_id: '660e8400-e29b-41d4-a716-446655440001',
      title: 'Control de plagas',
      description: 'Monitoreo de plagas (trips, ácaros) y enfermedades (oidio, botrytis). Aplicar tratamiento preventivo con productos autorizados.',
      type_code: 'control_plagas',
      status_code: 'pendiente',
      scheduled_date: '2025-10-14',
      worker_id: '770e8400-e29b-41d4-a716-446655440001', // Juan Pérez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    // Campo La Esperanza - Lote A2 (Cabernet) tasks
    {
      id: 'task-005',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      lot_id: '660e8400-e29b-41d4-a716-446655440002',
      title: 'Riego programado',
      description: 'Control de riego por goteo. Ajustar frecuencia según estado fenológico (envero). Verificar humedad del suelo.',
      type_code: 'riego',
      status_code: 'pendiente',
      scheduled_date: '2025-10-12',
      worker_id: '770e8400-e29b-41d4-a716-446655440005', // Roberto Sánchez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    {
      id: 'task-006',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      lot_id: '660e8400-e29b-41d4-a716-446655440002',
      title: 'Fertilización foliar',
      description: 'Aplicar fertilizante foliar con micronutrientes (Zinc, Boro). Aplicar al atardecer para mejor absorción.',
      type_code: 'fertilizacion',
      status_code: 'pendiente',
      scheduled_date: '2025-10-17',
      worker_id: '770e8400-e29b-41d4-a716-446655440006', // Laura Ramírez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    {
      id: 'task-007',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      lot_id: '660e8400-e29b-41d4-a716-446655440002',
      title: 'Deshoje',
      description: 'Realizar deshoje en zona de racimos para mejorar ventilación y exposición solar. Cuidar de no sobre-exponer.',
      type_code: 'poda',
      status_code: 'en_progreso',
      scheduled_date: '2025-10-10',
      worker_id: '770e8400-e29b-41d4-a716-446655440001', // Juan Pérez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    {
      id: 'task-008',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      lot_id: '660e8400-e29b-41d4-a716-446655440002',
      title: 'Monitoreo sanitario',
      description: 'Inspección general del lote. Detectar síntomas de enfermedades o plagas. Registro fotográfico si es necesario.',
      type_code: 'control_plagas',
      status_code: 'completada',
      scheduled_date: '2025-10-08',
      worker_id: '770e8400-e29b-41d4-a716-446655440006', // Laura Ramírez
      created_by: 'demo-user',
      created_at: '2025-10-06T10:00:00Z'
    },
    // Campo La Esperanza - Lote A3 (Syrah) tasks
    {
      id: 'task-009',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      lot_id: '660e8400-e29b-41d4-a716-446655440003',
      title: 'Riego de mantenimiento',
      description: 'Riego profundo para preparar plantas para período de calor. Verificar funcionamiento de todos los sectores.',
      type_code: 'riego',
      status_code: 'pendiente',
      scheduled_date: '2025-10-13',
      worker_id: '770e8400-e29b-41d4-a716-446655440005', // Roberto Sánchez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    {
      id: 'task-010',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      lot_id: '660e8400-e29b-41d4-a716-446655440003',
      title: 'Fertilización de cobertura',
      description: 'Aplicar sulfato de potasio (100kg/ha) para mejorar calidad de uva. Incorporar con riego.',
      type_code: 'fertilizacion',
      status_code: 'pendiente',
      scheduled_date: '2025-10-18',
      worker_id: '770e8400-e29b-41d4-a716-446655440001', // Juan Pérez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    {
      id: 'task-011',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      lot_id: '660e8400-e29b-41d4-a716-446655440003',
      title: 'Poda en verde',
      description: 'Despunte de brotes para controlar crecimiento vegetativo. Mantener equilibrio planta-fruto.',
      type_code: 'poda',
      status_code: 'pendiente',
      scheduled_date: '2025-10-20',
      worker_id: '770e8400-e29b-41d4-a716-446655440006', // Laura Ramírez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    {
      id: 'task-012',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440001',
      lot_id: '660e8400-e29b-41d4-a716-446655440003',
      title: 'Control de orugas',
      description: 'Aplicar insecticida selectivo para control de orugas del racimo. Respetar período de carencia.',
      type_code: 'control_plagas',
      status_code: 'pendiente',
      scheduled_date: '2025-10-15',
      worker_id: '770e8400-e29b-41d4-a716-446655440005', // Roberto Sánchez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    // Campo San José - Lote O1 (Olivos) tasks
    {
      id: 'task-013',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440002',
      lot_id: '660e8400-e29b-41d4-a716-446655440006',
      title: 'Riego por goteo',
      description: 'Programar riego de acuerdo a evapotranspiración. Verificar presión y caudal de goteros.',
      type_code: 'riego',
      status_code: 'pendiente',
      scheduled_date: '2025-10-11',
      worker_id: '770e8400-e29b-41d4-a716-446655440001', // Juan Pérez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    {
      id: 'task-014',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440002',
      lot_id: '660e8400-e29b-41d4-a716-446655440006',
      title: 'Fertilización nitrogenada',
      description: 'Aplicar urea (80kg/ha) vía fertirrigación. Fraccionada en 3 aplicaciones semanales.',
      type_code: 'fertilizacion',
      status_code: 'en_progreso',
      scheduled_date: '2025-10-09',
      worker_id: '770e8400-e29b-41d4-a716-446655440006', // Laura Ramírez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    {
      id: 'task-015',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440002',
      lot_id: '660e8400-e29b-41d4-a716-446655440006',
      title: 'Poda de producción',
      description: 'Poda de aclareo de ramas improductivas. Mantener copa abierta para buena iluminación.',
      type_code: 'poda',
      status_code: 'pendiente',
      scheduled_date: '2025-10-25',
      worker_id: '770e8400-e29b-41d4-a716-446655440005', // Roberto Sánchez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    {
      id: 'task-016',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440002',
      lot_id: '660e8400-e29b-41d4-a716-446655440006',
      title: 'Control de mosca del olivo',
      description: 'Monitoreo con trampas. Si supera umbral, aplicar tratamiento específico. Usar productos autorizados.',
      type_code: 'control_plagas',
      status_code: 'completada',
      scheduled_date: '2025-10-07',
      worker_id: '770e8400-e29b-41d4-a716-446655440001', // Juan Pérez
      created_by: 'demo-user',
      created_at: '2025-10-05T10:00:00Z'
    },
    // Finca Los Andes - Lote C1 (Cerezas) tasks
    {
      id: 'task-017',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440003',
      lot_id: '660e8400-e29b-41d4-a716-446655440009',
      title: 'Riego localizado',
      description: 'Ajustar riego para fase de desarrollo de fruto. Mantener humedad constante sin encharcamiento.',
      type_code: 'riego',
      status_code: 'pendiente',
      scheduled_date: '2025-10-12',
      worker_id: '770e8400-e29b-41d4-a716-446655440005', // Roberto Sánchez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    {
      id: 'task-018',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440003',
      lot_id: '660e8400-e29b-41d4-a716-446655440009',
      title: 'Fertilización completa',
      description: 'Aplicar fertilizante completo NPK 15-15-15 (120kg/ha). Complementar con calcio foliar.',
      type_code: 'fertilizacion',
      status_code: 'pendiente',
      scheduled_date: '2025-10-19',
      worker_id: '770e8400-e29b-41d4-a716-446655440006', // Laura Ramírez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    {
      id: 'task-019',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440003',
      lot_id: '660e8400-e29b-41d4-a716-446655440009',
      title: 'Poda de verano',
      description: 'Eliminar chupones y ramas secas. Mejorar entrada de luz para mejor color de fruta.',
      type_code: 'poda',
      status_code: 'pendiente',
      scheduled_date: '2025-10-22',
      worker_id: '770e8400-e29b-41d4-a716-446655440001', // Juan Pérez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    },
    {
      id: 'task-020',
      tenant_id: 'demo-tenant',
      farm_id: '550e8400-e29b-41d4-a716-446655440003',
      lot_id: '660e8400-e29b-41d4-a716-446655440009',
      title: 'Control de mosca de la fruta',
      description: 'Instalación y monitoreo de trampas. Aplicar cebo tóxico en caso de alta presión.',
      type_code: 'control_plagas',
      status_code: 'en_progreso',
      scheduled_date: '2025-10-10',
      worker_id: '770e8400-e29b-41d4-a716-446655440005', // Roberto Sánchez
      created_by: 'demo-user',
      created_at: '2025-10-08T10:00:00Z'
    }
  ],
  workers: [
    {
      id: '770e8400-e29b-41d4-a716-446655440001',
      tenant_id: 'demo-tenant',
      full_name: 'Juan Pérez González',
      email: 'juan.perez@demo.com',
      document_id: '35.456.789',
      phone: '+54 261 123-4567',
      birth_date: '1990-05-15',
      address: 'Calle San Martín 1234, Mendoza',
      area_module: 'campo',
      hire_date: '2023-01-10',
      salary: 450000,
      status: 'active',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440002',
      tenant_id: 'demo-tenant',
      full_name: 'María Rodríguez Silva',
      email: 'maria.rodriguez@demo.com',
      document_id: '32.123.456',
      phone: '+54 261 234-5678',
      birth_date: '1988-08-22',
      address: 'Av. Las Heras 567, Mendoza',
      area_module: 'empaque',
      hire_date: '2022-06-15',
      salary: 650000,
      status: 'active',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440003',
      tenant_id: 'demo-tenant',
      full_name: 'Carlos López Martínez',
      email: 'carlos.lopez@demo.com',
      document_id: '38.789.012',
      phone: '+54 261 345-6789',
      birth_date: '1992-03-10',
      address: 'Calle Belgrano 890, Luján de Cuyo',
      area_module: 'empaque',
      hire_date: '2023-03-20',
      salary: 480000,
      status: 'active',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440004',
      tenant_id: 'demo-tenant',
      full_name: 'Ana García Fernández',
      email: 'ana.garcia@demo.com',
      document_id: '36.234.567',
      phone: '+54 261 456-7890',
      birth_date: '1991-11-28',
      address: 'Calle Mitre 2345, Maipú',
      area_module: 'empaque',
      hire_date: '2022-09-01',
      salary: 600000,
      status: 'active',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440005',
      tenant_id: 'demo-tenant',
      full_name: 'Roberto Sánchez Torres',
      email: 'roberto.sanchez@demo.com',
      document_id: '40.345.678',
      phone: '+54 261 567-8901',
      birth_date: '1994-07-14',
      address: 'Calle Sarmiento 456, Godoy Cruz',
      area_module: 'campo',
      hire_date: '2023-05-10',
      salary: 450000,
      status: 'active',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440006',
      tenant_id: 'demo-tenant',
      full_name: 'Laura Ramírez Díaz',
      email: 'laura.ramirez@demo.com',
      document_id: '34.567.890',
      phone: '+54 261 678-9012',
      birth_date: '1989-12-05',
      address: 'Av. España 789, Mendoza',
      area_module: 'campo',
      hire_date: '2021-11-20',
      salary: 680000,
      status: 'active',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440007',
      tenant_id: 'demo-tenant',
      full_name: 'Diego Morales Ruiz',
      email: 'diego.morales@demo.com',
      document_id: '37.890.123',
      phone: '+54 261 789-0123',
      birth_date: '1993-04-18',
      address: 'Calle Colón 1122, Luján de Cuyo',
      area_module: 'empaque',
      hire_date: '2023-07-15',
      salary: 480000,
      status: 'active',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440008',
      tenant_id: 'demo-tenant',
      full_name: 'Patricia Vargas Méndez',
      email: 'patricia.vargas@demo.com',
      document_id: '33.901.234',
      phone: '+54 261 890-1234',
      birth_date: '1987-09-25',
      address: 'Calle Rivadavia 3344, Maipú',
      area_module: 'finanzas',
      hire_date: '2021-04-12',
      salary: 720000,
      status: 'active',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440009',
      tenant_id: 'demo-tenant',
      full_name: 'Fernando Castro Herrera',
      email: 'fernando.castro@demo.com',
      document_id: '39.012.345',
      phone: '+54 261 901-2345',
      birth_date: '1995-02-08',
      address: 'Av. Godoy Cruz 5566, Godoy Cruz',
      area_module: 'empaque',
      hire_date: '2023-09-05',
      salary: 480000,
      status: 'active',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440010',
      tenant_id: 'demo-tenant',
      full_name: 'Gabriela Núñez Flores',
      email: 'gabriela.nunez@demo.com',
      document_id: '36.123.789',
      phone: '+54 261 012-3456',
      birth_date: '1991-06-30',
      address: 'Calle Alberti 778, Mendoza',
      area_module: 'admin',
      hire_date: '2022-08-18',
      salary: 550000,
      status: 'active',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440011',
      tenant_id: 'demo-tenant',
      full_name: 'Martín Gutiérrez Paz',
      email: 'martin.gutierrez@demo.com',
      document_id: '41.234.890',
      phone: '+54 261 123-7890',
      birth_date: '1996-10-12',
      address: 'Calle Alem 991, Luján de Cuyo',
      area_module: 'campo',
      hire_date: '2024-01-08',
      salary: 450000,
      status: 'active',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440012',
      tenant_id: 'demo-tenant',
      full_name: 'Valeria Ortiz Romero',
      email: 'valeria.ortiz@demo.com',
      document_id: '35.345.901',
      phone: '+54 261 234-8901',
      birth_date: '1990-01-20',
      address: 'Av. San Martín 1122, Maipú',
      area_module: 'campo',
      hire_date: '2022-03-15',
      salary: 780000,
      status: 'active',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    }
  ],
  users: [
    {
      id: 'user-admin-demo',
      email: 'admin@demo.com',
      full_name: 'Administrador Demo',
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 'user-campo-demo',
      email: 'campo@demo.com',
      full_name: 'Usuario Campo Demo',
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 'user-empaque-demo',
      email: 'empaque@demo.com',
      full_name: 'Usuario Empaque Demo',
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 'user-finanzas-demo',
      email: 'finanzas@demo.com',
      full_name: 'Usuario Finanzas Demo',
      created_at: '2024-01-15T10:00:00Z'
    }
  ],
  tenant_memberships: [
    {
      id: 'membership-admin-demo',
      tenant_id: 'demo-tenant',
      user_id: 'user-admin-demo',
      role_code: 'admin',
      status: 'active',
      accepted_at: '2024-01-15T10:00:00Z',
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 'membership-campo-demo',
      tenant_id: 'demo-tenant',
      user_id: 'user-campo-demo',
      role_code: 'campo',
      status: 'active',
      accepted_at: '2024-01-15T10:00:00Z',
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 'membership-empaque-demo',
      tenant_id: 'demo-tenant',
      user_id: 'user-empaque-demo',
      role_code: 'empaque',
      status: 'active',
      accepted_at: '2024-01-15T10:00:00Z',
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 'membership-finanzas-demo',
      tenant_id: 'demo-tenant',
      user_id: 'user-finanzas-demo',
      role_code: 'finanzas',
      status: 'active',
      accepted_at: '2024-01-15T10:00:00Z',
      created_at: '2024-01-15T10:00:00Z'
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
        num_pallet: 'PAL-001',
        codigo: 'PAL-001',
        producto: 'Uva Malbec',
        tipoFruta: 'Uva Malbec',
        variedad: 'Malbec',
        kilos: 450.5,
        peso: 450.5,
        cant_cajas: 25,
        cajas: 25,
        fecha: '2024-10-05',
        fechaCreacion: '2024-10-05',
        fecha_empaque: '2024-10-05',
        estado: 'en_camara',
        ubicacion: 'Cámara 1',
        temperatura: 2.5,
        temperaturaAlmacen: 2.5,
        lote_origen: 'Lote A1',
        loteOrigen: 'Lote A1',
        destino: null,
        vencimiento: null,
        created_at: '2024-10-05T10:00:00Z'
      },
      {
        id: 'aa0e8400-e29b-41d4-a716-446655440002',
        tenant_id: 'demo-tenant',
        num_pallet: 'PAL-002',
        codigo: 'PAL-002',
        producto: 'Uva Cabernet Sauvignon',
        tipoFruta: 'Uva Cabernet Sauvignon',
        variedad: 'Cabernet',
        kilos: 480.0,
        peso: 480.0,
        cant_cajas: 27,
        cajas: 27,
        fecha: '2024-10-06',
        fechaCreacion: '2024-10-06',
        fecha_empaque: '2024-10-06',
        estado: 'despachado',
        ubicacion: 'En tránsito',
        temperatura: 2.0,
        temperaturaAlmacen: 2.0,
        lote_origen: 'Lote A2',
        loteOrigen: 'Lote A2',
        destino: 'Buenos Aires',
        vencimiento: '2024-10-20',
        created_at: '2024-10-06T10:00:00Z'
      },
      {
        id: 'aa0e8400-e29b-41d4-a716-446655440003',
        tenant_id: 'demo-tenant',
        num_pallet: 'PAL-003',
        codigo: 'PAL-003',
        producto: 'Uva Malbec',
        tipoFruta: 'Uva Malbec',
        variedad: 'Malbec',
        kilos: 465.0,
        peso: 465.0,
        cant_cajas: 26,
        cajas: 26,
        fecha: '2024-10-07',
        fechaCreacion: '2024-10-07',
        fecha_empaque: '2024-10-07',
        estado: 'listo_despacho',
        ubicacion: 'Cámara 2',
        temperatura: 2.2,
        temperaturaAlmacen: 2.2,
        lote_origen: 'Lote A1',
        loteOrigen: 'Lote A1',
        destino: 'Córdoba',
        vencimiento: '2024-10-22',
        created_at: '2024-10-07T10:00:00Z'
      },
      {
        id: 'aa0e8400-e29b-41d4-a716-446655440004',
        tenant_id: 'demo-tenant',
        num_pallet: 'PAL-004',
        codigo: 'PAL-004',
        producto: 'Uva Syrah',
        tipoFruta: 'Uva Syrah',
        variedad: 'Syrah',
        kilos: 442.5,
        peso: 442.5,
        cant_cajas: 24,
        cajas: 24,
        fecha: '2024-10-08',
        fechaCreacion: '2024-10-08',
        fecha_empaque: '2024-10-08',
        estado: 'armado',
        ubicacion: 'Área de empaque',
        temperatura: null,
        temperaturaAlmacen: null,
        lote_origen: 'Lote A2',
        loteOrigen: 'Lote A2',
        destino: null,
        vencimiento: null,
        created_at: '2024-10-08T10:00:00Z'
      },
      {
        id: 'aa0e8400-e29b-41d4-a716-446655440005',
        tenant_id: 'demo-tenant',
        num_pallet: 'PAL-005',
        codigo: 'PAL-005',
        producto: 'Uva Malbec',
        tipoFruta: 'Uva Malbec',
        variedad: 'Malbec',
        kilos: 458.0,
        peso: 458.0,
        cant_cajas: 25,
        cajas: 25,
        fecha: '2024-10-09',
        fechaCreacion: '2024-10-09',
        fecha_empaque: '2024-10-09',
        estado: 'en_camara',
        ubicacion: 'Cámara 1',
        temperatura: 2.3,
        temperaturaAlmacen: 2.3,
        lote_origen: 'Lote A1',
        loteOrigen: 'Lote A1',
        destino: null,
        vencimiento: '2024-10-25',
        created_at: '2024-10-09T11:00:00Z'
      }
    ],
    ingreso_fruta: [
      {
        id: 'bb0e8400-e29b-41d4-a716-446655440001',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-05',
        num_ticket: 1001,
        num_remito: 5001,
        productor: 'Agro San Martín SA',
        finca: 'Campo La Esperanza',
        producto: 'Uva Malbec',
        lote: 'A1',
        contratista: 'Cosecha del Valle SRL',
        tipo_cosecha: 'Manual',
        estado_liquidacion: true,
        transporte: 'Transportes del Sur',
        chofer: 'Jorge Ramírez',
        chasis: 'AB-123-CD',
        acoplado: 'EF-456-GH',
        operario: 'Juan Pérez',
        cant_bin: 45,
        tipo_bin: 'Bin 400kg',
        peso_neto: 18000,
        observaciones: 'Fruta en excelente estado',
        created_at: '2024-10-05T08:00:00Z'
      },
      {
        id: 'bb0e8400-e29b-41d4-a716-446655440002',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-06',
        num_ticket: 1002,
        num_remito: 5002,
        productor: 'Viñedos del Valle',
        finca: 'Campo La Esperanza',
        producto: 'Uva Cabernet Sauvignon',
        lote: 'A2',
        contratista: 'Cosecha Premium',
        tipo_cosecha: 'Manual',
        estado_liquidacion: true,
        transporte: 'Transportes Cuyo',
        chofer: 'Carlos Sosa',
        chasis: 'IJ-789-KL',
        acoplado: 'MN-012-OP',
        operario: 'María Rodríguez',
        cant_bin: 52,
        tipo_bin: 'Bin 400kg',
        peso_neto: 20800,
        observaciones: 'Grado de madurez óptimo',
        created_at: '2024-10-06T08:30:00Z'
      },
      {
        id: 'bb0e8400-e29b-41d4-a716-446655440003',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-07',
        num_ticket: 1003,
        num_remito: 5003,
        productor: 'Agro San Martín SA',
        finca: 'Campo La Esperanza',
        producto: 'Uva Malbec',
        lote: 'A1',
        contratista: 'Cosecha del Valle SRL',
        tipo_cosecha: 'Manual',
        estado_liquidacion: false,
        transporte: 'Transportes del Sur',
        chofer: 'Jorge Ramírez',
        chasis: 'AB-123-CD',
        acoplado: 'EF-456-GH',
        operario: 'Carlos López',
        cant_bin: 38,
        tipo_bin: 'Bin 400kg',
        peso_neto: 15200,
        observaciones: 'Algunos racimos con leve deterioro',
        created_at: '2024-10-07T07:45:00Z'
      },
      {
        id: 'bb0e8400-e29b-41d4-a716-446655440004',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-08',
        num_ticket: 1004,
        num_remito: 5004,
        productor: 'Finca Los Olivos',
        finca: 'Campo San José',
        producto: 'Uva Syrah',
        lote: 'B1',
        contratista: 'Cosecha Express',
        tipo_cosecha: 'Mecánica',
        estado_liquidacion: true,
        transporte: 'Logística Mendoza',
        chofer: 'Roberto Martínez',
        chasis: 'QR-345-ST',
        acoplado: 'UV-678-WX',
        operario: 'Ana García',
        cant_bin: 28,
        tipo_bin: 'Bin 500kg',
        peso_neto: 14000,
        observaciones: 'Cosecha temprana, excelente calidad',
        created_at: '2024-10-08T09:00:00Z'
      },
      {
        id: 'bb0e8400-e29b-41d4-a716-446655440005',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-09',
        num_ticket: 1005,
        num_remito: 5005,
        productor: 'Viñedos del Valle',
        finca: 'Campo La Esperanza',
        producto: 'Uva Chardonnay',
        lote: 'A4',
        contratista: 'Cosecha Premium',
        tipo_cosecha: 'Manual',
        estado_liquidacion: false,
        transporte: 'Transportes Cuyo',
        chofer: 'Carlos Sosa',
        chasis: 'IJ-789-KL',
        acoplado: 'MN-012-OP',
        operario: 'Roberto Sánchez',
        cant_bin: 35,
        tipo_bin: 'Bin 400kg',
        peso_neto: 14000,
        observaciones: 'Fruta de alta calidad, inicio de procesamiento',
        created_at: '2024-10-09T08:15:00Z'
      },
      {
        id: 'bb0e8400-e29b-41d4-a716-446655440006',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-09',
        num_ticket: 1006,
        num_remito: 5006,
        productor: 'Agro San Martín SA',
        finca: 'Campo La Esperanza',
        producto: 'Uva Malbec',
        lote: 'B1',
        contratista: 'Cosecha del Valle SRL',
        tipo_cosecha: 'Manual',
        estado_liquidacion: true,
        transporte: 'Transportes del Sur',
        chofer: 'Jorge Ramírez',
        chasis: 'AB-123-CD',
        acoplado: 'EF-456-GH',
        operario: 'Diego Morales',
        cant_bin: 60,
        tipo_bin: 'Bin 400kg',
        peso_neto: 24000,
        observaciones: 'Excelente cosecha, fruta premium',
        created_at: '2024-10-09T10:30:00Z'
      },
      {
        id: 'bb0e8400-e29b-41d4-a716-446655440007',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-08',
        num_ticket: 1007,
        num_remito: 5007,
        productor: 'Finca Los Olivos',
        finca: 'Campo San José',
        producto: 'Uva Cabernet Franc',
        lote: 'O1',
        contratista: 'Cosecha Express',
        tipo_cosecha: 'Manual',
        estado_liquidacion: true,
        transporte: 'Logística Mendoza',
        chofer: 'Roberto Martínez',
        chasis: 'QR-345-ST',
        acoplado: 'UV-678-WX',
        operario: 'Laura Ramírez',
        cant_bin: 42,
        tipo_bin: 'Bin 400kg',
        peso_neto: 16800,
        observaciones: 'Fruta muy buena, apta para reserva',
        created_at: '2024-10-08T11:00:00Z'
      },
      {
        id: 'bb0e8400-e29b-41d4-a716-446655440008',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-07',
        num_ticket: 1008,
        num_remito: 5008,
        productor: 'Viñedos del Valle',
        finca: 'Campo La Esperanza',
        producto: 'Uva Malbec',
        lote: 'A3',
        contratista: 'Cosecha Premium',
        tipo_cosecha: 'Manual',
        estado_liquidacion: false,
        transporte: 'Transportes Cuyo',
        chofer: 'Carlos Sosa',
        chasis: 'IJ-789-KL',
        acoplado: 'MN-012-OP',
        operario: 'Patricia Vargas',
        cant_bin: 48,
        tipo_bin: 'Bin 400kg',
        peso_neto: 19200,
        observaciones: 'Pendiente revisión de calidad',
        created_at: '2024-10-07T09:20:00Z'
      }
    ],
    egreso_fruta: [
      {
        id: 'cc0e8400-e29b-41d4-a716-446655440001',
        tenant_id: 'demo-tenant',
        fecha: '2024-10-08',
        pallet_id: 'aa0e8400-e29b-41d4-a716-446655440002',
        producto: 'Uva Cabernet Sauvignon',
        tipo_fruta: 'Uva Cabernet',
        peso_neto: 480.0,
        peso_kg: 480.0,
        cliente: 'Distribuidora XYZ',
        destino: 'Exportación - Europa',
        finca: 'Campo La Esperanza',
        num_remito: 'EGR-2024-001',
        chofer: 'Jorge Ramírez',
        transporte: 'Camión ABC-123',
        chasis: 'ABC-123',
        acoplado: 'DEF-456',
        estado: 'Despachado',
        tipo_movimiento: 'venta',
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
        producto: 'Uva Malbec',
        tipo_fruta: 'Uva Malbec',
        peso_neto: 465.0,
        peso_kg: 465.0,
        cliente: 'Distribuidora XYZ',
        destino: 'Buenos Aires',
        finca: 'Campo La Esperanza',
        num_remito: 'EGR-2024-002',
        chofer: 'Carlos Sosa',
        transporte: 'Camión DEF-456',
        chasis: 'DEF-456',
        acoplado: 'GHI-789',
        estado: 'En tránsito',
        tipo_movimiento: 'venta',
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
        producto: 'Uva mixta',
        tipo_fruta: 'Uva mixta',
        peso_neto: 85.5,
        peso_kg: 85.5,
        cliente: 'Descarte',
        destino: 'Compostaje',
        finca: 'Campo La Esperanza',
        num_remito: 'DESC-2024-001',
        chofer: 'N/A',
        transporte: 'N/A',
        chasis: 'N/A',
        acoplado: 'N/A',
        estado: 'Completado',
        tipo_movimiento: 'merma',
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
        producto: 'Uva Malbec',
        tipo_fruta: 'Uva Malbec',
        peso_neto: 458.0,
        peso_kg: 458.0,
        cliente: 'Supermercados del Centro',
        destino: 'Córdoba',
        finca: 'Campo La Esperanza',
        num_remito: 'EGR-2024-003',
        chofer: 'Roberto Martínez',
        transporte: 'Camión GHI-789',
        chasis: 'GHI-789',
        acoplado: 'JKL-012',
        estado: 'Preparando',
        tipo_movimiento: 'venta',
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
        num_remito: 'DESP-2024-001',
        numero_guia: 'DESP-2024-001',
        cliente: 'Distribuidora XYZ',
        transporte: 'Transportes del Valle',
        transportista: 'Transportes del Valle',
        chofer: 'Jorge Ramírez',
        pallets: ['aa0e8400-e29b-41d4-a716-446655440002'],
        total_pallets: 1,
        total_cajas: 27,
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
        num_remito: 'DESP-2024-002',
        numero_guia: 'DESP-2024-002',
        cliente: 'Exportadora del Sur',
        transporte: 'Logística Internacional SA',
        transportista: 'Logística Internacional SA',
        chofer: 'Carlos Sosa',
        pallets: ['aa0e8400-e29b-41d4-a716-446655440003'],
        total_pallets: 1,
        total_cajas: 26,
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
        num_remito: 'DESP-2024-003',
        numero_guia: 'DESP-2024-003',
        cliente: 'Supermercados del Centro',
        transporte: 'Transportes Rápidos',
        transportista: 'Transportes Rápidos',
        chofer: 'Roberto Martínez',
        pallets: ['aa0e8400-e29b-41d4-a716-446655440001'],
        total_pallets: 1,
        total_cajas: 25,
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
        num_remito: 'DESP-2024-004',
        numero_guia: 'DESP-2024-004',
        cliente: 'Bodega Los Andes',
        transporte: 'Transportes del Valle',
        transportista: 'Transportes del Valle',
        chofer: 'Ana García',
        pallets: ['aa0e8400-e29b-41d4-a716-446655440004'],
        total_pallets: 1,
        total_cajas: 24,
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
    ],
    tasks: [
      {
        id: 'task-demo-001',
        tenant_id: 'demo-tenant',
        farm_id: '550e8400-e29b-41d4-a716-446655440001',
        lot_id: '660e8400-e29b-41d4-a716-446655440001',
        title: 'Control de riego',
        description: 'Verificar sistema de riego y ajustar según necesidad',
        type_code: 'riego',
        status_code: 'pendiente',
        scheduled_date: '2024-10-15',
        responsible_membership_id: 'membership-campo-demo',
        worker_id: '770e8400-e29b-41d4-a716-446655440001',
        created_by: 'user-admin-demo',
        created_at: '2024-10-01T10:00:00Z',
        updated_at: '2024-10-01T10:00:00Z'
      },
      {
        id: 'task-demo-002',
        tenant_id: 'demo-tenant',
        farm_id: '550e8400-e29b-41d4-a716-446655440001',
        lot_id: '660e8400-e29b-41d4-a716-446655440002',
        title: 'Aplicación de fertilizante',
        description: 'Aplicar fertilizante NPK según recomendación agronómica',
        type_code: 'fertilizacion',
        status_code: 'completada',
        scheduled_date: '2024-10-05',
        responsible_membership_id: 'membership-campo-demo',
        worker_id: '770e8400-e29b-41d4-a716-446655440005',
        created_by: 'user-admin-demo',
        created_at: '2024-10-01T10:00:00Z',
        updated_at: '2024-10-05T16:00:00Z'
      },
      {
        id: 'task-demo-003',
        tenant_id: 'demo-tenant',
        farm_id: '550e8400-e29b-41d4-a716-446655440001',
        lot_id: '660e8400-e29b-41d4-a716-446655440001',
        title: 'Control fitosanitario',
        description: 'Inspección de plagas y enfermedades',
        type_code: 'fitosanitario',
        status_code: 'pendiente',
        scheduled_date: '2024-10-20',
        responsible_membership_id: 'membership-campo-demo',
        worker_id: '770e8400-e29b-41d4-a716-446655440006',
        created_by: 'user-admin-demo',
        created_at: '2024-10-02T10:00:00Z',
        updated_at: '2024-10-02T10:00:00Z'
      }
    ]
  }
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
    const index = demoData.farms.findIndex((f: any) => f.id === id)
    if (index !== -1) {
      demoData.farms[index] = { ...demoData.farms[index], ...data, updated_at: new Date().toISOString() }
      return demoData.farms[index]
    }
    return null
  },

  deleteFarm(id: string) {
    const index = demoData.farms.findIndex((f: any) => f.id === id)
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
    const index = demoData.workers.findIndex((w: any) => w.id === id)
    if (index !== -1) {
      demoData.workers[index] = { ...demoData.workers[index], ...data, updated_at: new Date().toISOString() }
      return demoData.workers[index]
    }
    return null
  },

  deleteWorker(id: string) {
    const index = demoData.workers.findIndex((w: any) => w.id === id)
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
