import supabaseClient from "@/utils/supabase";

export async function fetchCompanies(supabaseAccessToken,){
    const supabase= await supabaseClient(supabaseAccessToken)
    console.log(supabaseAccessToken);
    

    const {data,error}= await supabase.from("companies").select("*")

        if(error){
        console.error("Error occured while fetching the companies", error);
            return null
    }
    return data
}