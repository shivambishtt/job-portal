import React, { useEffect } from 'react';
import { postJob } from '@/api/jobsAPI.js';
import useFetch from '@/hooks/useFetch.js';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { State } from 'country-state-city';
import { fetchCompanies } from '@/api/companiesAPI';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import CompanyDrawer from '@/components/CompanyDrawer.jsx';

function PostJob() {
  const schema = z.object({
    jobTitle: z.string().min(1, { message: 'Title is required' }),
    jobDescription: z.string().min(1, { message: 'Description is required' }),
    jobLocation: z.string().min(1, { message: 'Select a location' }),
    companyId: z.string().min(1, { message: 'Select or add a new company' }),
    jobRequirements: z.string().min(1, { message: 'jobRequirements are required' }),
    jobExperience: z.string().min(1, { message: "Experience is required" })
  });

  const { user, isLoaded } = useUser();
  const navigate = useNavigate()
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { jobLocation: '', companyId: "", jobRequirements: '' }, resolver: zodResolver(schema)
  });


  const { data: postJobData, loading: postJobLoading, fun: postJobFun, error: postJobError } = useFetch(postJob);

  const onSubmit = (data) => {
    postJobFun({
      ...data,
      recruiter_id: user?.id,
      jobStatus: true,
    });
  }

  useEffect(() => {
    if (postJobData?.length > 0) {
      navigate("/jobs")
    }
  }, [postJobLoading])

  const { data: companyData, loading: dataLoading, fun: fetchCompanyFun } = useFetch(fetchCompanies);

  useEffect(() => {
    if (isLoaded) fetchCompanyFun();
  }, [isLoaded]);

  if (!isLoaded || dataLoading) {
    return <BarLoader className="mb-4" width={'100%'} color="#36d7b7" />;
  }

  if (user?.unsafeMetadata?.role !== 'Recruiter') {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="">
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Post A Job
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 pb-0">
        <Input placeholder="Job Title" {...register('jobTitle')} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Textarea placeholder="Job description" {...register('jobDescription')} />
        {errors.jobDescription && (
          <p className="text-red-500">{errors.jobDescription.message}</p>
        )}

        <Input placeholder="Experience" {...register('jobExperience')} />
        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
        <div className="flex gap-4 justify-between">
          <Controller
            name="jobLocation"
            control={control}
            render={({ field }) => <Select value={field?.value} onValueChange={field?.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Add location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {State.getStatesOfCountry('IN').map(({ name }) => {
                    return (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            }
          />

          <Controller
            name="companyId"
            control={control}
            render={({ field }) => <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Company">
                  {field.value ? companyData?.find((company) => company.id === Number(field.value))?.companyName : "Company"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companyData?.map(({ id, companyName }) => {
                    return (
                      <SelectItem key={companyName} value={id}>
                        {companyName}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            }
          />

          <CompanyDrawer fetchCompanies={fetchCompanyFun} />
        </div>
        {errors.jobLocation && <p className='text-red-500'>{errors.jobLocation.message}</p>}
        {errors.companyId && <p className='text-red-500'>{errors.companyId.message}</p>}
        <Controller
          name="jobRequirements"
          control={control}
          render={({ field }) => {
            return <MDEditor value={field?.value} onChange={field?.onChange} />
          }} />
        {errors?.jobRequirements && <p className='text-red-500'>{errors?.jobRequirements?.message}</p>}

        {postJobError?.message && <p className='text-red-500'>{postJobError?.message}</p>}

        {postJobLoading && <BarLoader width={"100%"} color='#36d7b7' />}
        <Button type="submit" variant="blue" size="lg" className="mt-2" >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default PostJob;
