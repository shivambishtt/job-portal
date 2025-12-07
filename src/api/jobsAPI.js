import supabaseClient from "@/utils/supabase";

export async function getJobs(
  supabaseAccessToken,
  { location, companyId, searchQuery }
) {
<<<<<<< HEAD
    const supabase = await supabaseClient(supabaseAccessToken);

=======
  const supabase = await supabaseClient(supabaseAccessToken);
>>>>>>> a6932d823e34cfa243cc0deecfea79752ed516db

  let query = supabase
    .from("jobs")
    .select(
      "* ,company:companies(companyName, companyLogoURL),savedJobs:savedJobs(job_id)"
    );
  if (location) {
    query = query.eq("jobLocation", location);
  }
  if (companyId) {
<<<<<<< HEAD
    query = query.eq("company_id", companyId);
=======
    query = query.eq("companyId", companyId);
>>>>>>> a6932d823e34cfa243cc0deecfea79752ed516db
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
  { alreadySaved },
  savedJob
) {
  const supabase = await supabaseClient(supabaseAccessToken);

  if (alreadySaved) {
    const { data, error: deletionError } = await supabase
      .from("savedJobs")
      .delete()
      .eq("job_id", savedJob.job_id);

    if (deletionError) {
      console.log("Error occured while deleting the saved job", deletionError);
      return null;
    }
    return data;
  }

  const { data, error: insertionError } = await supabase
    .from("savedJobs")
    .insert([savedJob])
    .select();

  if (insertionError) {
    console.log("Error occured while saving the job", insertionError);
    return null;
  }
  return data;
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

export async function deleteSavedJob(supabaseAccessToken, { job_id }) {
  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (error) {
    console.log("Error occured while deleting the saved job", error);
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

export async function getMyJob(supabaseAccessToken, { recruiter_id }) {
  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase
    .from("jobs")
    .select("*,company:companies(companyName,companyLogoURL)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.log("Error occured while fetching your jobs", error);
    return null;
  }
  return data;
}
