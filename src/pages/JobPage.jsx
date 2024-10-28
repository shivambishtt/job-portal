import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { getSingleJob } from '@/api/jobsAPI'
import { useParams } from 'react-router-dom'
import useFetch from '@/hooks/useFetch'
import { BarLoader } from 'react-spinners'
import { Briefcase, MapPinIcon } from 'lucide-react'
function JobPage() {
  const { isLoaded, user } = useUser()

  const { id } = useParams()

  const { fun: jobIdFun, data: jobData, loading: isJobLoading } = useFetch(getSingleJob, {
    job_id: id
  })

  useEffect(() => {
    if (isLoaded) {
      jobIdFun()
    }
  }, [isLoaded])

  if (!isLoaded || !user) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-5xl sm:text-5xl">{jobData?.jobTitle}</h1>
        <img src={jobData?.company?.companyLogoURL} className='h-12' alt={jobData?.jobTitle} />
      </div>

      <div className="flex justify-between" >
        <div className='flex gap-2' >
          <MapPinIcon />
          {jobData?.jobLocation}
        </div>
        <div className='flex gap-2' >
          <Briefcase />{jobData?.applications?.length}Applicants
        </div>
      </div>
    </div>

  )
}

export default JobPage
