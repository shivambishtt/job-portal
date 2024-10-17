import React, { useEffect } from 'react'
import { getJobs } from "../api/jobsAPI.js"
import { useSession } from "@clerk/clerk-react"
function JobListing() {
  const { isSignedIn, session } = useSession()
  console.log(isSignedIn, session);

  if (!isSignedIn) {
    console.log("User is not signed in");
  }

  const fetchJobs = async () => {
    const supabaseAccessToken = await session?.getToken({ template: "supabase" })
    console.log(session, "session");

    console.log(supabaseAccessToken, "supabase access token");

    const data = await getJobs(supabaseAccessToken)
    console.log(data, "data");
  }

  useEffect(() => {
    fetchJobs()
  }, [isSignedIn, session]) // this is a fix

  return (
    <div>
      <h1>Job listing</h1>
    </div>
  )
}

export default JobListing
