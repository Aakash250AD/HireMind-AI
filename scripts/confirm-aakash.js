const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing Supabase environment variables.');
}

const supabaseAdmin = createClient(
  supabaseUrl,
  serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

const userId = '28787136-ee2a-4e05-af17-2f1451c73f9f';

async function updatePassword() {
  const { data, error } =
    await supabaseAdmin.auth.admin.updateUserById(
      userId,
      {
        password: 'AakashTest@2026!',
      }
    );

  if (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }

  console.log('Password updated successfully.');
  console.log('User ID:', data.user.id);
  console.log('Email:', data.user.email);
}

updatePassword();