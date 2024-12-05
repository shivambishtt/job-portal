import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { deleteSavedJob, savedJobs } from '@/api/jobsAPI'
import useFetch from '@/hooks/useFetch'
import { BarLoader } from 'react-spinners'


// issue happening when you are clicking the save job ideaally it should add the job_id also

function JobCard({ job, isMyJob = false, savedInit = false, onJobSaved = () => { } }) {
    const [saved, setSaved] = useState(savedInit)
    const { user } = useUser()


    // ab jab me koi job ko delete kar raha hu toh me chahta hu ki jab mera button click ho to ek loader type ka dikhaye uskoo hum achieve kar sakte hain ki agar deleteJobData.length -1
    const {
        loading: savedJobLoading,
        data: savedJobData,
        error: savedJobError,
        fun: savedJobFunction } = useFetch(savedJobs, { alreadySaved: saved })

    const { fun: deleteJobFun, error: deleteJobError, loading: deleteJobLoading } = useFetch(deleteSavedJob)


    const handleSavedJob = async () => {
        await savedJobFunction({
            user_id: user.id,
            job_id: job?.id
        })
        onJobSaved()
    }

    const handleDeleteJob = async () => {
        await deleteJobFun({
            job_id: job?.id
        })
        onJobSaved()
    }

    useEffect(() => {
        if (savedJobData !== undefined) setSaved(savedJobData?.length > 0) //edit
    }, [savedJobData])

    return (

        <Card className="flex flex-col">
            {savedJobLoading || deleteJobLoading  && (<BarLoader width={"100%"} color='#36d7b7' />)}
            <CardHeader className="flex">
                <CardTitle className="flex justify-between font-bold">
                    {job?.jobTitle}
                    {!isMyJob &&
                        <Trash2Icon
                            className='cursor-pointer text-red-300'
                            fill='red'
                            size={20}
                            onClick={handleDeleteJob}
                        />}
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 flex-1" >
                <div className='flex justify-between' >
                    {job?.company && <img
                        className='flex items-center h-12'
                        src={job?.company?.companyLogoURL} alt='company logo' />}
                    <div className='flex gap-2 items-center'>
                        <MapPinIcon className='mt-2' size={15} />{job?.jobLocation}
                    </div>
                </div>
                <hr />
                {job?.jobDescription}
            </CardContent>
            <CardFooter className="flex gap-2">
                <Link to={`/job/${job?.id}`} className="flex-1">
                    <Button variant="secondary" className="w-full">
                        More Details
                    </Button>
                </Link>

                {!isMyJob &&
                    (<Button
                        className="w-15"
                        onClick={handleSavedJob}
                        disabled={savedJobLoading}
                        variant="outline" >
                        {saved ? <Heart size={25} stroke="red" fill='red' /> : <Heart size={25} />}

                    </Button>)}

            </CardFooter>
        </Card >
    )
}

export default JobCard
