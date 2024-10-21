import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { savedJobs } from '@/api/jobsAPI'
import useFetch from '@/hooks/useFetch'

function JobCard({ job, isMyJob = false, savedInit = false, onJobSaved = () => { } }) {
    const [saved, setSaved] = useState(savedInit)
    const { fun: savedJobsFun, data: saveJobs, loading: savedJobsLoading } = useFetch(savedJobs)
    const { user } = useUser()

    const handleSavedJob = async () => {

        await savedJobsFun({
            user_id: user.user_id,
            jobId: job.jobId,
        })
        console.log(saveJobs, "saveJobs ");
        onJobSaved()
    }

    useEffect(() => {
        if (saveJobs !== undefined) setSaved(saveJobs?.length > 0) //edit
    }, [saveJobs])

    return (

        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between font-bold">{job.jobTitle}
                    {!isMyJob && <Trash2Icon className='cursor-pointer text-red-300' fill='red' size={20} />}
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 flex-1" >
                <div className='flex justify-between' >
                    {job.company && <img className='h-16' src={job.company.companyLogoURL} />}
                    <div className='flex gap-2 items-center'>
                        <MapPinIcon className='mt-2' size={15} />{job.jobLocation}
                    </div>
                </div>
                <hr />
                {job.jobDescription}
            </CardContent>
            <CardFooter className="flex gap-2">
                <Link to={`/job/${job.jobId}`} className="flex-1">
                    <Button variant="secondary" className="w-full">
                        More Details
                    </Button>
                </Link>

                {!isMyJob &&
                    (<Button
                        className="w-15"
                        onClick={handleSavedJob}
                        disabled={savedJobsLoading}
                        variant="outline" >
                        {saved ? <Heart size={25} stroke="red" fill='red' /> : <Heart size={25} />}

                    </Button>)}

            </CardFooter>
        </Card >
    )
}

export default JobCard
