// lib/demo-runtime.ts - Server-side utilities for demo mode
'use server'

import { cookies } from 'next/headers'
import { getProfessionalPlanConfig } from './plan-features'

export async function getRuntimeFeatures() {
  const cookieStore = await cookies()
  const demoValue = cookieStore.get('demo')?.value

  if (demoValue === '1') {
    const professionalConfig = getProfessionalPlanConfig()
    return {
      isDemo: true,
      plan: 'professional',
      limits: professionalConfig,
      trialEndsAt: null,
      daysLeft: null
    }
  }

  return {
    isDemo: false,
    plan: null,
    limits: null,
    trialEndsAt: null,
    daysLeft: null
  }
}

