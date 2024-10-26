import supabaseClient from "@/utils/supabase";

export async function getJobs(supabaseAccessToken,{ location, companyId, searchQuery }) {
  const supabase = await supabaseClient(supabaseAccessToken);

  let query = supabase
    .from("jobs")
    .select(
      "* ,company:companies(companyName, companyLogoURL),savedJobs:savedJobs(job_id)"
    );
  if (location) {
    query = query.eq("location", location);
  }
  if (companyId) {
    query = query.eq("companyId", companyId);
  }
  if (searchQuery) {
    query = query.ilike("jobTitle", `%${searchQuery}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching the jobs", error);
    return null;
  }
  return data;
}

// save jobs data


export async function savedJobs(supabaseAccessToken,savedJobData,{ alreadySaved }) {
  const supabase = await supabaseClient(supabaseAccessToken);

  if (alreadySaved) {
    const { data, error } = await supabase
      .from("savedJobs")
      .delete()
      .eq("job_id", savedJobData.job_id);

    if (error) {
      console.error("Error deleting Saved Jobs:", error);
      return null;
    }
    return data 
  } else {
    console.log("savedJobData before insert:", savedJobData);
    const { data, error } = await supabase
      .from("savedJobs")
      .insert([savedJobData])
      .select();
    if (error) {
      console.error("Error inserting the Jobs", error.message);
      return null;
    }
    return data

  }
  
}
