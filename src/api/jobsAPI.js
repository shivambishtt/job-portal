import supabaseClient from "@/utils/supabase";

export async function getJobs(
  supabaseAccessToken,
  { location, companyId, searchQuery }
) {
  const supabase = await supabaseClient(supabaseAccessToken);

  let query = supabase
    .from("jobs")
    .select(
      "* ,company:companies(companyName, companyLogoURL),savedJobs:savedJobs(job_id)"
    );
  if (location) {
    query = query.eq("jobLocation", location);
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

export async function savedJobs(
  supabaseAccessToken,
  savedJobData,
  { alreadySaved }
) {
  const supabase = await supabaseClient(supabaseAccessToken);

  if (alreadySaved) {
    const { data, error: deleteError } = await supabase
      .from("savedJobs")
      .delete()
      .eq("job_id", savedJobData.job_id);

    if (deleteError) {
      console.error("Error deleting Saved Jobs:", deleteError);
    }
    return data;
  } else {
    const { data, error: insertionError } = await supabase
      .from("savedJobs")
      .insert([savedJobData])
      .select();

    if (insertionError) {
      console.error("Error inserting the Jobs", insertionError.message);
      return null;
    }
    return data;
  }
}

export async function getSingleJob(supabaseAccessToken, { job_id }) {
  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase
    .from("jobs")
    .select(
      "*, company: companies(companyName,companyLogoURL),applications:applications!applications_job_id_fkey(*)"
    )
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Error fetching the company", error);
    return null;
  }
  return data;
}

export async function updateHiringStatus(
  supabaseAccessToken,
  { job_id },
  jobStatus
) {
  const supabase = await supabaseClient(supabaseAccessToken);
  const { data, error } = await supabase
    .from("jobs")
    .update({ jobStatus })
    .eq("id", job_id)
    .select();
  if (error) {
    console.error("Error updating the job", error);
  }
  return data;
}

export async function postJob(supabaseAccessToken, _, jobData) {
  const supabase = await supabaseClient(supabaseAccessToken);
  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.log("Error occured while posting the job", error.message);
    return null;
  }
  return data;
}

export async function fetchSavedJob(supabaseAccessToken) {
  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase
    .from("savedJobs")
    .select("*, job:jobs(*,company:companies(companyName,companyLogoURL))");

  if (error) {
    console.log("Error occured while fetching the saved jobs", error);
    return null;
  }
  return data;
}
