import supabaseClient from "@/utils/supabase";

export async function getJobs(supabaseAccessToken) {
  const supabase = await supabaseClient(supabaseAccessToken);
  // specifies the table name/ endpoint to hit to connect
  let query = supabase.from("jobs").select("*");
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching the jobs", error);
    return null;
  }
  return data;
}
