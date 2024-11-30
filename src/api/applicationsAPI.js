import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyForJob(supabaseAccessToken, _, jobData) {
  const supabase = await supabaseClient(supabaseAccessToken);
  const random = Math.floor(Math.random() * 90000);
  const resumeId = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(resumeId, jobData.resume);

  if (storageError) {
    console.error("Error occured while uploading the resume", storageError);
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${resumeId}`;

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error("Error occured while applying to the job", error);
    return null;
  }
  return data;
}

export async function updateApplicationStatus(
  supabaseAccessToken,
  { job_id },
  status
) {
  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id);
  select();

  if (error || data.length === 0) {
    console.log("Error occured while updating the application", error);
    return null;
  }

  return data;
}
