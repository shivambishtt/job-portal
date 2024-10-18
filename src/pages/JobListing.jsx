import React, { useEffect } from 'react'
import { getJobs } from "../api/jobsAPI.js"
import useFetch from '@/hooks/useFetch.js'
import { useUser } from '@clerk/clerk-react'
function JobListing() {
  const { isLoaded } = useUser()
  const { fun: jobsFun, data: jobsData, loading: jobsLoading, session } = useFetch(getJobs, {})

  console.log(jobsData, "jobs data");

  useEffect(() => {
    if (isLoaded) {
      jobsFun()
    }
  }, [isLoaded])

  return (
    <div>
      <h1>Job listing</h1>
    </div>
  )
}

export default JobListing
