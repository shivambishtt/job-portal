import React, { useEffect } from 'react'
import { getJobs } from "../api/jobsAPI.js"
import useFetch from '@/hooks/useFetch.js'
function JobListing() {

  const { fun: jobsFun, data: jobsData, loading: jobsLoading, session } = useFetch(getJobs, {})

  console.log(jobsData, "jobs data");

  useEffect(() => {
    jobsFun()
  }, [session])

  return (
    <div>
      <h1>Job listing</h1>
    </div>
  )
}

export default JobListing
