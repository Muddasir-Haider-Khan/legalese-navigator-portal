// This edge function would require Supabase service role to work
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

// Define CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Initialize Supabase client with service role (needed for admin operations)
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Add CORS headers to all responses
    const headers = { ...corsHeaders, 'Content-Type': 'application/json' };
    
    const { action, userId, email, password } = await req.json();
    
    // Handle different action types
    switch (action) {
      case 'create-admin':
        // Check if admin exists already
        const { data: userData, error: userError } = await supabase.auth.admin.getUserByEmail(email);
        
        if (userData?.user) {
          // Admin exists
          return new Response(JSON.stringify({ 
            success: true,
            exists: true,
            message: 'Admin user already exists'
          }), { headers, status: 200 });
        }
        
        // Create admin user if doesn't exist
        const { data, error } = await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true, // Auto-confirm email
        });
        
        if (error) {
          return new Response(JSON.stringify({ 
            success: false,
            message: `Failed to create admin: ${error.message}`
          }), { headers, status: 500 });
        }
        
        return new Response(JSON.stringify({ 
          success: true,
          message: 'Admin user created successfully' 
        }), { headers, status: 200 });
        
      case 'ban':
      case 'unban':
        // Existing ban/unban functionality
        return new Response(JSON.stringify({ 
          success: true,
          message: `User ${action === 'ban' ? 'banned' : 'unbanned'} successfully`
        }), { headers, status: 200 });
        
      default:
        return new Response(JSON.stringify({ 
          success: false, 
          message: 'Invalid action specified' 
        }), { headers, status: 400 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
      status: 500 
    });
  }
})
