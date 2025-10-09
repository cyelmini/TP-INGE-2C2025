/**
 * Script to populate existing farms and lots with complete data
 * Run with: npx ts-node scripts/seed-farm-data.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Sample data for farms
const farmEnhancements = {
  'Campo Norte': {
    location: 'Ruta 40, Km 1250, Mendoza',
    area_ha: 125.5,
    default_crop: 'Manzanas Red Delicious',
    notes: 'Campo principal con sistema de riego por goteo instalado en 2023. Suelo arcilloso con buen drenaje.'
  },
  'Campo Sur': {
    location: 'Camino Rural 234, Valle de Uco',
    area_ha: 87.3,
    default_crop: 'Uvas Malbec',
    notes: 'Viñedo establecido en 2015. Exposición norte ideal para uvas de alta calidad.'
  },
  'Finca San José': {
    location: 'Ruta Provincial 15, Tupungato',
    area_ha: 56.8,
    default_crop: 'Cerezas',
    notes: 'Terreno con pendiente moderada, protección natural contra heladas. Sistema de riego tecnificado.'
  },
  'La Esperanza': {
    location: 'Calle Los Álamos 456, San Rafael',
    area_ha: 98.2,
    default_crop: 'Peras',
    notes: 'Campo certificado orgánico. Suelo franco limoso, ideal para cultivos de pepita.'
  }
}

// Sample data for lots by crop type
const lotData = {
  manzanas: [
    { code: 'L-01A', crop: 'Manzanas', variety: 'Red Delicious', area_ha: 12.5, status: 'activo' },
    { code: 'L-02A', crop: 'Manzanas', variety: 'Granny Smith', area_ha: 10.3, status: 'activo' },
    { code: 'L-03A', crop: 'Manzanas', variety: 'Fuji', area_ha: 8.7, status: 'activo' },
    { code: 'L-04A', crop: 'Manzanas', variety: 'Gala', area_ha: 15.2, status: 'preparacion' }
  ],
  uvas: [
    { code: 'V-01', crop: 'Uvas', variety: 'Malbec', area_ha: 8.5, status: 'activo' },
    { code: 'V-02', crop: 'Uvas', variety: 'Cabernet Sauvignon', area_ha: 9.2, status: 'activo' },
    { code: 'V-03', crop: 'Uvas', variety: 'Malbec', area_ha: 7.8, status: 'activo' },
    { code: 'V-04', crop: 'Uvas', variety: 'Syrah', area_ha: 6.5, status: 'preparacion' }
  ],
  cerezas: [
    { code: 'C-01', crop: 'Cerezas', variety: 'Bing', area_ha: 5.5, status: 'activo' },
    { code: 'C-02', crop: 'Cerezas', variety: 'Lapins', area_ha: 6.2, status: 'activo' },
    { code: 'C-03', crop: 'Cerezas', variety: 'Sweetheart', area_ha: 4.8, status: 'activo' }
  ],
  peras: [
    { code: 'P-01', crop: 'Peras', variety: 'Williams', area_ha: 10.5, status: 'activo' },
    { code: 'P-02', crop: 'Peras', variety: 'Packham', area_ha: 9.8, status: 'activo' },
    { code: 'P-03', crop: 'Peras', variety: 'Beurré', area_ha: 8.2, status: 'activo' },
    { code: 'P-04', crop: 'Peras', variety: 'Abate Fetel', area_ha: 7.5, status: 'preparacion' }
  ]
}

// Task types with descriptions
const taskTemplates = [
  {
    type_code: 'riego',
    title: 'Riego programado',
    description: 'Revisar sistema de riego y realizar riego según necesidades del cultivo. Verificar presión de agua y estado de goteros/aspersores.'
  },
  {
    type_code: 'fertilizacion',
    title: 'Aplicación de fertilizantes',
    description: 'Aplicar fertilizante según análisis de suelo. Respetar dosis recomendadas y condiciones climáticas.'
  },
  {
    type_code: 'poda',
    title: 'Poda de formación y producción',
    description: 'Realizar poda según tipo de cultivo y época del año. Eliminar ramas secas, enfermas o mal orientadas.'
  },
  {
    type_code: 'control_plagas',
    title: 'Control de plagas y enfermedades',
    description: 'Monitoreo de plagas y enfermedades. Aplicar tratamientos preventivos o curativos según sea necesario.'
  }
]

// Helper function to get a date relative to today
function getRelativeDate(daysOffset: number): string {
  const date = new Date('2025-10-09')
  date.setDate(date.getDate() + daysOffset)
  return date.toISOString().split('T')[0]
}

async function main() {
  console.log('🌾 Starting farm data seeding process...\n')

  // 1. Get all farms
  const { data: farms, error: farmsError } = await supabase
    .from('farms')
    .select('*')
    .order('created_at', { ascending: true })

  if (farmsError) {
    console.error('❌ Error fetching farms:', farmsError)
    return
  }

  if (!farms || farms.length === 0) {
    console.log('⚠️  No farms found in database')
    return
  }

  console.log(`✅ Found ${farms.length} farms\n`)

  // 2. Update each farm with complete data
  for (const farm of farms) {
    console.log(`📍 Processing farm: ${farm.name}`)

    // Find enhancement data or create default
    const enhancement = farmEnhancements[farm.name as keyof typeof farmEnhancements] || {
      location: `Ubicación de ${farm.name}`,
      area_ha: 100,
      default_crop: 'Cultivo mixto',
      notes: `Campo ${farm.name} - Notas generales del campo`
    }

    // Update farm if it's missing data
    if (!farm.location || !farm.area_ha || !farm.default_crop) {
      const { error: updateError } = await supabase
        .from('farms')
        .update({
          location: farm.location || enhancement.location,
          area_ha: farm.area_ha || enhancement.area_ha,
          default_crop: farm.default_crop || enhancement.default_crop,
          notes: farm.notes || enhancement.notes
        })
        .eq('id', farm.id)

      if (updateError) {
        console.error(`   ❌ Error updating farm: ${updateError.message}`)
      } else {
        console.log(`   ✅ Updated farm data`)
      }
    } else {
      console.log(`   ℹ️  Farm already has complete data`)
    }

    // 3. Get or create lots for this farm
    const { data: existingLots, error: lotsError } = await supabase
      .from('lots')
      .select('*')
      .eq('farm_id', farm.id)

    if (lotsError) {
      console.error(`   ❌ Error fetching lots: ${lotsError.message}`)
      continue
    }

    console.log(`   📦 Found ${existingLots?.length || 0} existing lots`)

    // Determine which lot template to use based on farm name or default crop
    let lotTemplate = lotData.manzanas
    const cropLower = (farm.default_crop || enhancement.default_crop).toLowerCase()
    if (cropLower.includes('uva')) lotTemplate = lotData.uvas
    else if (cropLower.includes('cerez')) lotTemplate = lotData.cerezas
    else if (cropLower.includes('pera')) lotTemplate = lotData.peras

    // Update existing lots or create new ones
    const lotsToProcess = existingLots && existingLots.length > 0
      ? existingLots
      : []

    // If we have fewer lots than templates, create more
    if (lotsToProcess.length < lotTemplate.length) {
      const lotsToCreate = lotTemplate.slice(lotsToProcess.length)

      for (const lotInfo of lotsToCreate) {
        const plantDate = getRelativeDate(-Math.floor(Math.random() * 730) - 365) // 1-3 years ago

        const { data: newLot, error: createError } = await supabase
          .from('lots')
          .insert({
            tenant_id: farm.tenant_id,
            farm_id: farm.id,
            code: lotInfo.code,
            crop: lotInfo.crop,
            variety: lotInfo.variety,
            area_ha: lotInfo.area_ha,
            plant_date: plantDate,
            status: lotInfo.status
          })
          .select()
          .single()

        if (createError) {
          console.error(`   ❌ Error creating lot ${lotInfo.code}: ${createError.message}`)
        } else {
          console.log(`   ✅ Created lot: ${lotInfo.code}`)
          lotsToProcess.push(newLot)
        }
      }
    }

    // Update existing lots that are missing data
    for (let i = 0; i < Math.min(lotsToProcess.length, lotTemplate.length); i++) {
      const lot = lotsToProcess[i]
      const template = lotTemplate[i]

      if (!lot.variety || !lot.area_ha || !lot.plant_date) {
        const plantDate = lot.plant_date || getRelativeDate(-Math.floor(Math.random() * 730) - 365)

        const { error: updateError } = await supabase
          .from('lots')
          .update({
            code: lot.code || template.code,
            crop: lot.crop || template.crop,
            variety: lot.variety || template.variety,
            area_ha: lot.area_ha || template.area_ha,
            plant_date: plantDate,
            status: lot.status || template.status
          })
          .eq('id', lot.id)

        if (updateError) {
          console.error(`   ❌ Error updating lot ${lot.code}: ${updateError.message}`)
        } else {
          console.log(`   ✅ Updated lot: ${lot.code || lot.id}`)
        }
      }
    }

    // 4. Get workers for this tenant to assign tasks
    const { data: workers, error: workersError } = await supabase
      .from('workers')
      .select('*')
      .eq('tenant_id', farm.tenant_id)
      .eq('status', 'active')
      .limit(10)

    if (workersError || !workers || workers.length === 0) {
      console.log(`   ⚠️  No workers found for tenant, skipping task creation`)
      continue
    }

    console.log(`   👷 Found ${workers.length} workers for task assignment`)

    // 5. Create tasks for each lot
    const { data: updatedLots } = await supabase
      .from('lots')
      .select('*')
      .eq('farm_id', farm.id)

    if (!updatedLots) continue

    for (const lot of updatedLots) {
      console.log(`   📋 Creating tasks for lot: ${lot.code}`)

      // Check existing tasks for this lot
      const { data: existingTasks } = await supabase
        .from('tasks')
        .select('type_code')
        .eq('lot_id', lot.id)

      const existingTaskTypes = new Set(existingTasks?.map(t => t.type_code) || [])

      // Create one task of each type if it doesn't exist
      for (const template of taskTemplates) {
        if (existingTaskTypes.has(template.type_code)) {
          console.log(`      ℹ️  Task ${template.type_code} already exists`)
          continue
        }

        // Assign to a random worker
        const worker = workers[Math.floor(Math.random() * workers.length)]

        // Schedule tasks at different times
        let scheduledDate: string | null = null
        if (template.type_code === 'riego') {
          scheduledDate = getRelativeDate(2) // In 2 days
        } else if (template.type_code === 'fertilizacion') {
          scheduledDate = getRelativeDate(7) // In 1 week
        } else if (template.type_code === 'poda') {
          scheduledDate = getRelativeDate(14) // In 2 weeks
        } else if (template.type_code === 'control_plagas') {
          scheduledDate = getRelativeDate(5) // In 5 days
        }

        const { error: taskError } = await supabase
          .from('tasks')
          .insert({
            tenant_id: farm.tenant_id,
            farm_id: farm.id,
            lot_id: lot.id,
            title: template.title,
            description: template.description,
            type_code: template.type_code,
            status_code: 'pendiente',
            scheduled_date: scheduledDate,
            worker_id: worker.id,
            created_by: farm.created_by
          })

        if (taskError) {
          console.error(`      ❌ Error creating task ${template.type_code}: ${taskError.message}`)
        } else {
          console.log(`      ✅ Created task: ${template.title} (assigned to ${worker.full_name})`)
        }
      }
    }

    console.log('') // Empty line between farms
  }

  console.log('🎉 Farm data seeding completed!\n')
}

main()
  .then(() => {
    console.log('✅ Script finished successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  })

