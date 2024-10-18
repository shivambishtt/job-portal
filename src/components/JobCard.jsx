import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

function JobCard({ job, isMyJob = false, isSaved = false, onJobSaved = () => { } }) {
    const { user } = useUser()
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
                <Heart size={25} stroke="red" fill='red' />
            </CardFooter>
        </Card >
    )
}

export default JobCard
