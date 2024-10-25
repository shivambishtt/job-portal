import React, { useEffect, useState } from 'react'
import { getJobs } from "../api/jobsAPI.js"
import useFetch from '@/hooks/useFetch.js'
import { useUser } from '@clerk/clerk-react'
import { BarLoader } from 'react-spinners'
import JobCard from '@/components/JobCard.jsx'
import { fetchCompanies } from '@/api/companiesAPI.js'
function JobListing() {
  const { isLoaded } = useUser()
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [companyId, setCompanyId] = useState("")

  const { fun: jobsFun, data: jobs, loading: jobsLoading } = useFetch(getJobs, {
    location,
    companyId,
    searchQuery
  })
  const { fun: companyFun, data: companyData } = useFetch(fetchCompanies)

  useEffect(() => {
    if (isLoaded) companyFun()
  }, [isLoaded])

  useEffect(() => {
    companyFun()
  }, [])
  useEffect(() => {
    if (isLoaded) {
      jobsFun()
    }
  }, [isLoaded, location, companyId, searchQuery])

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
  }
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      {jobsLoading && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {jobsLoading === false && (
        <div className='mt-10 grid md:grid-cols-2 lg:grid-cols-2 gap-4 '>
          {jobs?.length ? (
            jobs.map((job) => {
              return <JobCard key={job.id} job={job} savedInit={job?.savedJobs?.length > 0} />
            })
          ) :
            <div>No Jobs Found</div>
          }
        </div>
      )
      }
    </div >
  )
}

export default JobListing
