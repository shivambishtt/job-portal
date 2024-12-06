import { getApplications } from '@/api/applicationsAPI'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners'

function CreatedApplications() {
    const { user } = useUser()
    console.log(user,"user");
    
    const {
        loading: applicationsLoading,
        data: applicationsData,
        error: applicationsError,
        fun: applicationsFun } = useFetch(getApplications, {
            user_id: user?.id
        })

    // if (applicationsLoading || !user) {
    //     return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
    // }
    return (
        <div>

        </div>
    )
}

export default CreatedApplications
