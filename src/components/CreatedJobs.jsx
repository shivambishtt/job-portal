import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { getMyJob } from '@/api/jobsAPI.js'
import useFetch from '@/hooks/useFetch'
import { BarLoader } from 'react-spinners'
import JobCard from './JobCard'


function CreatedJobs() {
    const { user } = useUser()

    const {
        loading: myJobLoading,
        data: myJobData,
        fun: getMyJobFun
    } = useFetch(getMyJob, {
        recruiter_id: user?.id
    })

    useEffect(() => {
        getMyJobFun()
    }, [])

    if (myJobLoading) {
        return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
    }

    return (
        <div className='mt-8 grid md:grip-cols-2 lg:grid-cols-3 gap-4'>
            {myJobData?.length ? (
                myJobData?.map((job) => {
                    return (
                        <JobCard
                            key={job?.id}
                            job={job}
                            onJobSaved={getMyJobFun}
                            isMyJob
                        />
                    )
                })
            ) : "asasnlk"}
        </div>
    )
}
export default CreatedJobs;
