
// This edge function would require Supabase service role to work
// It would be properly implemented when the database is set up
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

// In a real application, use the service role key from environment variables
// For now, we'll just return a mock response

serve(async (req) => {
  try {
    // Mock data for development
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

    return new Response(JSON.stringify(mockUsers), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
})
