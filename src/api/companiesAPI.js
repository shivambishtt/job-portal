import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function fetchCompanies(supabaseAccessToken) {
  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase.from("companies").select("*");

  if (error) {
    console.error("Error occured while fetching the companies", error);
    return null;
  }
  return data;
}

export async function uploadCompany(supabaseAccessToken, _, companyData) {
  const supabase = await supabaseClient(supabaseAccessToken);
  const random = Math.floor(Math.random() * 9000);
  const fileName = `logo- ${random} - ${companyData.companyName}`;

  const { error: storageError } = await supabase.storage
    .from("companyLogo")
    .upload(fileName, companyData.companyLogoURL);

  if (storageError) {
    console.log("Error occured while uploading the URL", error);
    return null;
  }

  const companyLogo = `${supabaseUrl}/storage/v1/object/public/companyLogo/${fileName}`;
  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        companyName: companyData.companyName,
        companyLogo,
      },
    ])
    .select();

  if (error) {
    console.log("Error occured while adding the company", error);
    return null;
  }
  return data;
}
