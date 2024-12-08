import { getApplications } from '@/api/applicationsAPI'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners'
import ApplicationCard from './ApplicationCard.jsx'

function CreatedApplications() {
    const { user } = useUser()

    const {
        loading: applicationsLoading,
        data: applicationsData,
        fun: applicationsFun } = useFetch(getApplications, {
            user_id: user?.id
        })

    useEffect(() => {
        applicationsFun()
    }, [])

    if (applicationsLoading) {
        return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
    }
    return (
        <div className='flex flex-col gap-2'>
            {applicationsData?.map((application) => {
                return (
                    <ApplicationCard key={application.id} application={application} isCandidate />
                )
            })}
        </div>
    )
}

export default CreatedApplications
