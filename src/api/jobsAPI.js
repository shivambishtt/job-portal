import supabaseClient from "@/utils/supabase";

export async function getJobs(
  supabaseAccessToken,
  { location, companyId, searchQuery }
) {
  const supabase = await supabaseClient(supabaseAccessToken);

  let query = supabase
    .from("jobs")
    .select(
      "* ,company:companies(companyName, companyLogoURL),savedJobs:savedJobs(jobId)"
    );
  if (location) {
    query = query.eq("location", location);
  }
  if (companyId) {
    query = query.eq("companyId", companyId);
  }
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching the jobs", error);
    return null;
  }
  return data;
}

export async function savedJobs(
  supabaseAccessToken,
  savedJobData,
  { alreadySaved }
) {
  const supabase = await supabaseClient(supabaseAccessToken);
  if (alreadySaved) {
    const { data, error } = await supabase
      .from("savedJobs")
      .delete()
      .eq("jobId", savedJobData.jobId);
    console.log(savedJobData, "saved job data");

    if (error) {
      console.error("Error deleting Saved Jobs:", error);
      return null;
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("savedJobs")
      .insert([savedJobData])
      .select();
    if (error) {
      console.error("Error inserting the Jobs", error);
      return data;
    }
    return data;
  }
}
