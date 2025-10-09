import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Check if in demo mode
function isDemoMode(request: NextRequest): boolean {
  const cookies = request.cookies.get('demo');
  return cookies?.value === '1';
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, fullName, role, documentId, phone } = body;

    if (!email || !fullName || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Handle demo mode
    if (isDemoMode(request)) {
      console.log('🎭 DEMO MODE: Creating new user in demo data', { email, fullName, role });

      // Dynamic import using relative path
      const { demoData } = await import('../../../../../lib/mocks');

      // Check if user already exists in demoData.users
      const existingUser = demoData.users?.find((u: any) => u.email === email);
      if (existingUser) {
        console.log('🎭 DEMO MODE: User already exists');
        return NextResponse.json({ error: 'Usuario con este email ya existe' }, { status: 409 });
      }

      // Check if worker already exists in demoData.workers
      const existingWorker = demoData.workers?.find((w: any) => w.email === email);
      if (existingWorker) {
        console.log('🎭 DEMO MODE: Worker already exists');
        return NextResponse.json({ error: 'Trabajador con este email ya existe' }, { status: 409 });
      }

      // Generate unique IDs
      const timestamp = Date.now();
      const userId = `user-${role}-${timestamp}`;
      const membershipId = `membership-${role}-${timestamp}`;
      const workerId = `worker-${timestamp}`;

      // Create new user
      const newUser = {
        id: userId,
        email: email,
        full_name: fullName,
        created_at: new Date().toISOString()
      };

      // Create new membership
      const newMembership = {
        id: membershipId,
        tenant_id: 'demo-tenant',
        user_id: userId,
        role_code: role,
        status: 'active',
        accepted_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      };

      // Create new worker
      const newWorker = {
        id: workerId,
        tenant_id: 'demo-tenant',
        full_name: fullName,
        email: email,
        document_id: documentId || `DEMO-${Math.floor(Math.random() * 100000)}`,
        phone: phone || `+54 261 ${Math.floor(Math.random() * 9000000) + 1000000}`,
        birth_date: '1990-01-01',
        address: 'Dirección Demo',
        area_module: role,
        membership_id: membershipId,
        hire_date: new Date().toISOString().split('T')[0],
        salary: 500000,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Initialize arrays if they don't exist
      if (!demoData.users) demoData.users = [];
      if (!demoData.tenant_memberships) demoData.tenant_memberships = [];
      if (!demoData.workers) demoData.workers = [];

      // Add to demo data
      demoData.users.push(newUser);
      demoData.tenant_memberships.push(newMembership);
      demoData.workers.push(newWorker);

      console.log('✅ DEMO MODE: User created successfully', {
        userId,
        workerId,
        email,
        role,
        totalUsers: demoData.users.length,
        totalWorkers: demoData.workers.length
      });

      return NextResponse.json({
        success: true,
        user: newUser,
        worker: newWorker,
        membership: newMembership,
        message: 'Usuario creado exitosamente en modo demo'
      });
    }

    // Normal mode - require authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization token' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data: currentWorker, error: currentWorkerError } = await supabaseAdmin
      .from('workers')
      .select('*, membership:tenant_memberships!workers_membership_id_fkey(*)')
      .eq('email', user.email)
      .single();

    if (currentWorkerError || !currentWorker) {
      return NextResponse.json({ error: 'Worker profile not found' }, { status: 404 });
    }

    if (!currentWorker.membership || currentWorker.membership.role_code !== 'admin') {
      return NextResponse.json({ error: 'Access denied. Admin role required.' }, { status: 403 });
    }

    const { data: existingWorker } = await supabaseAdmin
      .from('workers')
      .select('email')
      .eq('email', email)
      .eq('tenant_id', currentWorker.tenant_id)
      .single();

    if (existingWorker) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    const tempPassword = `Temp${Math.random().toString(36).slice(-8)}!`;

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: false, 
      user_metadata: {
        full_name: fullName,
        invited_by: currentWorker.id
      }
    });

    if (authError || !authData.user) {
      console.error('Auth error:', authError);
      return NextResponse.json({ 
        error: 'Failed to create auth user: ' + authError?.message 
      }, { status: 500 });
    }

    const { data: membership, error: membershipError } = await supabaseAdmin
      .from('tenant_memberships')
      .insert([{
        tenant_id: currentWorker.tenant_id,
        user_id: authData.user.id,
        role_code: role,
        status: 'pending',
        invited_by: currentWorker.id
      }])
      .select()
      .single();

    if (membershipError) {
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      console.error('Membership error:', membershipError);
      return NextResponse.json({ 
        error: 'Failed to create membership: ' + membershipError.message 
      }, { status: 500 });
    }
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert([{
        user_id: authData.user.id,
        full_name: fullName,
        phone: phone || null,
        default_tenant_id: currentWorker.tenant_id
      }])
      .select()
      .single();

    if (profileError) {
    } else {
    }

    const { data: worker, error: workerError } = await supabaseAdmin
      .from('workers')
      .insert([{
        tenant_id: currentWorker.tenant_id,
        full_name: fullName,
        document_id: documentId || '',
        email: email,
        phone: phone || null,
        area_module: role,
        membership_id: membership.id,
        status: 'active'
      }])
      .select()
      .single();

    if (workerError) {
      await supabaseAdmin.from('tenant_memberships').delete().eq('id', membership.id);
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      console.error('Worker error:', workerError);
      return NextResponse.json({ 
        error: 'Failed to create worker profile: ' + workerError.message 
      }, { status: 500 });
    }

    try {
      await supabaseAdmin.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password`
      });
    } catch (emailError) {
      console.error('Failed to send reset email:', emailError);
    }

    return NextResponse.json({ 
      success: true,
      worker: worker,
      message: 'User invited successfully. They will receive an email to set their password.'
    });

  } catch (error) {
    console.error('POST /api/admin/users/invite error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
