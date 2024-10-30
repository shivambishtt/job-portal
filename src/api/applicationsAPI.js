import supabaseClient from "@/utils/supabase";

export async function applyForJob(supabaseAccessToken,_,jobData){
    const supabase= await supabaseClient(supabaseAccessToken)
    const random= Math.floor(Math.random()*90000)
    const resumeId = `resume-${random}-${jobData.candidate_id}`

   const {error:storageError}= await supabase.storage
   .from("resumes")
   .upload(resumeId, jobData.resume)

   if(storageError){
    console.error("Error occured while uploading the resume",error);
   }
   
    const {data,error}= await supabase
    .from("applications")
    .insert([{
        ...jobData
    }])

    if(error){
        console.error("Error occured while applying to the job",error);   
        return null
    }
    return data
}