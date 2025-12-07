import { createClient } from "@supabase/supabase-js"; 

 export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
<<<<<<< HEAD
 export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = async (supabaseAccessToken) => {
  console.log(supabaseAccessToken,"supabase access token before client");
  
  const supabase = createClient(supabaseUrl,  supabaseAnonKey, {
=======
 export const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient(supabaseUrl, supabaseKey, {
>>>>>>> a6932d823e34cfa243cc0deecfea79752ed516db
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
<<<<<<< HEAD
  });  
=======
  });
>>>>>>> a6932d823e34cfa243cc0deecfea79752ed516db
  return supabase;
};

export default supabaseClient;
