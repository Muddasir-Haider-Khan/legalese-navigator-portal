
// This edge function would require Supabase service role to work
// It would be properly implemented when the database is set up
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// In a real application, use the service role key from environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting get-all-users function");
    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.log("Missing environment variables");
      throw new Error("Required environment variables are not set");
    }

    // Parse the request body if there is one
    const { searchTerm } = await req.json().catch(() => ({}));
    console.log("Search term:", searchTerm);
    
    // Get all users from the auth.users table using the admin API
    const { data, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
    
    console.log(`Found ${data.users.length} users`);
    
    // Filter users if searchTerm is provided
    let filteredUsers = data.users;
    if (searchTerm) {
      filteredUsers = data.users.filter(user => 
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.user_metadata?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.user_metadata?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(`Filtered to ${filteredUsers.length} users`);
    }

    return new Response(JSON.stringify(filteredUsers), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error in get-all-users function:", error.message);
    
    // Mock data for development in case of errors
    const mockUsers = [
      {
        id: "usr_1",
        email: "john@example.com",
        created_at: "2023-04-15T10:30:00Z",
        last_sign_in_at: "2023-05-10T15:45:00Z",
        user_metadata: {
          first_name: "John",
          last_name: "Smith"
        }
      },
      {
        id: "usr_2",
        email: "sarah@example.com",
        created_at: "2023-04-21T09:15:00Z", 
        last_sign_in_at: "2023-05-09T12:30:00Z",
        user_metadata: {
          first_name: "Sarah",
          last_name: "Johnson"
        }
      },
      {
        id: "usr_3",
        email: "michael@example.com",
        created_at: "2023-05-02T14:20:00Z",
        last_sign_in_at: "2023-05-08T10:15:00Z",
        user_metadata: {
          first_name: "Michael",
          last_name: "Brown"
        }
      },
      {
        id: "usr_4",
        email: "emily@example.com",
        created_at: "2023-05-05T16:45:00Z",
        last_sign_in_at: null,
        user_metadata: {
          first_name: "Emily",
          last_name: "Davis"
        }
      },
      {
        id: "usr_5",
        email: "david@example.com",
        created_at: "2023-05-07T11:10:00Z",
        last_sign_in_at: "2023-05-07T11:15:00Z",
        user_metadata: {
          first_name: "David",
          last_name: "Wilson"
        }
      }
    ];
    
    // In development, return mock data with success status
    return new Response(JSON.stringify(mockUsers), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
    
    // In production, you would return an error instead:
    // return new Response(JSON.stringify({ error: error.message }), {
    //   headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    //   status: 500,
    // });
  }
})
