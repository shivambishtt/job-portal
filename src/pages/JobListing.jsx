import React, { useEffect } from 'react'
import { getJobs } from "../api/jobsAPI.js"
import { useSession } from "@clerk/clerk-react"
function JobListing() {
  const { session } = useSession()


  const fetchJobs = async () => {
    const supabaseAccessToken = await session?.getToken({ template: "supabase" })
    console.log(supabaseAccessToken, "supabase access token");

    const data = await getJobs(supabaseAccessToken)
    console.log(data, "data");
  }

  useEffect(() => {
    fetchJobs()
  }, [session]) // this is a fix

  return (
    <div>
      <h1>Job listing</h1>
    </div>
  )
}

export default JobListing
