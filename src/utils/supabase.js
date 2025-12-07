import { createClient } from "@supabase/supabase-js"; 

 export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
 export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = async (supabaseAccessToken) => {
  console.log(supabaseAccessToken,"supabase access token before client");
  
  const supabase = createClient(supabaseUrl,  supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  });  
  return supabase;
};

export default supabaseClient;
