import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { getSingleJob, updateHiringStatus } from '@/api/jobsAPI'
import { useParams } from 'react-router-dom'
import useFetch from '@/hooks/useFetch'
import { BarLoader } from 'react-spinners'
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from 'lucide-react'
import MDEditor from '@uiw/react-md-editor'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select'

function JobPage() {
  const { isLoaded, user } = useUser()

  const { id } = useParams()

  const { fun: jobIdFun, data: jobData, loading: isJobLoading } = useFetch(getSingleJob, {
    job_id: id
  })

  const { fun: updateJobStatus, data: updatedData, loading: isLoading } = useFetch(updateHiringStatus, {
    job_id: id
  })

  const handleStatusChange = (value) => {
    const jobStatus = value === "open"
    updateJobStatus(jobStatus).then(() => {
      jobIdFun()
    })
  }


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
        <div className='flex gap-2' >
          {jobData?.jobStatus ? <><DoorOpen />Open </> : <><DoorClosed />Closed</>}
        </div>
      </div>

      {isLoading && <BarLoader width={"100%"} color='#36d7b7' />}
      {jobData?.recruiter_id === user?.id &&
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${jobData?.jobStatus ? "bg-green-950" : "bg-red-950"}`}>
            <SelectValue placeholder={"Hiring Status" + (jobData?.jobStatus ? "(Open)" : "(Closed)")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open </SelectItem>
            <SelectItem value="closed">Closed </SelectItem>
          </SelectContent>
        </Select>
      }

      <h2 className='text-2xl sm:text-3xl font-bold'>About the Job</h2>
      <p className='sm:text-lg'>{jobData?.jobDescription}</p>
      <h2 className='text-2xl sm:text-3xl font-bold'>
        What we are looking for
      </h2>
      <MDEditor.Markdown className='bg-transparent sm:text-lg' source={jobData?.jobRequirements} />

    </div>

  )
}

export default JobPage
