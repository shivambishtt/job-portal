import React, { useEffect, useState } from 'react'
import { getJobs, updateHiringStatus } from "../api/jobsAPI.js"
import useFetch from '@/hooks/useFetch.js'
import { useUser } from '@clerk/clerk-react'
import { BarLoader } from 'react-spinners'
import JobCard from '@/components/JobCard.jsx'
import { fetchCompanies } from '@/api/companiesAPI.js'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { State } from 'country-state-city'
// import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination.jsx'
// import { Link } from 'react-router-dom'

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

  const handleSearch = (event) => {
    event.preventDefault()
    let formData = new FormData(event.target)

    const query = formData.get("search-query")
    if (query) {
      setSearchQuery(query)
    }
  }

  const handleClearFilters = () => {
    setLocation("")
    setCompanyId("")
    setSearchQuery("")
  }


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

      <form
        className="h-14 flex flex-row w-full gap-2 items-center mb-3"
        onSubmit={handleSearch}>

        <Input type="text"
          className="h-full flex-1  px-4 text-md"
          placeholder="Search Jobs by Title.."
          name="search-query" />

        <Button type="submit" className="h-full sm:w-28" variant="blue">Search</Button>
      </form>

      <div className='flex flex-col sm:flex-row gap-2' >
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name, countryCode }) => {
                return <SelectItem key={name} value={name}>{name} </SelectItem>
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={companyId} onValueChange={(id) => setCompanyId(id)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companyData?.map((company) => {                
                return <SelectItem key={company.id} value={company.id} >
                  {company.companyName}
                </SelectItem>
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="sm:w-1/2"
          onClick={handleClearFilters}
          variant="destructive"
        >
          Clear Filters
        </Button>
      </div>


      {
        jobsLoading && (
          <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
        )
      }

      {
        jobsLoading === false && (
          <div className='mt-10 grid md:grid-cols-2 lg:grid-cols-2 gap-4 '>
            {jobs?.length ? (
              jobs.map((job) => {
                return <JobCard
                  key={job?.id}
                  job={job}
                  savedInit={job?.savedJobs?.length > 0}
                />

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
