import React, { useEffect } from 'react'
import { fetchSavedJob } from '@/api/jobsAPI'
import { BarLoader } from 'react-spinners'
import { useUser } from '@clerk/clerk-react'
import JobCard from '@/components/JobCard'
import useFetch from '@/hooks/useFetch'

function SavedJobs() {
  const { isLoaded: userLoaded } = useUser()

  const {
    data: savedJobData,
    error: savedJobError,
    loading: savedJobLoading,
    fun: fetchSaved } = useFetch(fetchSavedJob)

  useEffect(() => {
    if (userLoaded) {
      fetchSaved()
    }
  }, [userLoaded])


  if (!userLoaded || savedJobLoading) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
  }


  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>

      {savedJobLoading === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobData?.length ? (
            savedJobData?.map((savedJob) => {
              return (
                <JobCard
                  key={savedJob?.id}
                  job={savedJob?.job}
                  savedInit={true}
                  onJobSaved={fetchSaved}
                />
              );
            })
          ) : (
            <div>No Saved Jobs 👀</div>
          )}
        </div>
      )}

      {savedJobError && <p className='text-red-500'>{savedJobError.message}</p>}
    </div>
  )
}

export default SavedJobs
