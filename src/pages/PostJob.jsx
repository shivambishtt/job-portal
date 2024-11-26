import React, { useEffect } from 'react';
import { postJob } from '@/api/jobsAPI.js';
import useFetch from '@/hooks/useFetch.js';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { State } from 'country-state-city';
import { fetchCompanies } from '@/api/companiesAPI';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import { Navigate } from 'react-router-dom';

function PostJob() {
  const schema = z.object({
    jobTitle: z.string().min(1, { message: 'Title is required' }),
    jobDescription: z.string().min(1, { message: 'Description is required' }),
    jobLocation: z.string().min(1, { message: 'Select a location' }),
    company_id: z.string().min(1, { message: 'Select or add a new company' }),
    skills: z.string().min(1, { message: 'Skills are required' }),
  });

  const { user, isLoaded } = useUser();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobLocation: '',
      company_id: '',
      skills: '',
    },
    resolver: zodResolver(schema),
  });
  const { data: postJobData, fun: postJobFun, error: postJobError } = useFetch(postJob, {});
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
      <form className="flex flex-col gap-4 p-4 pb-0">
        <Input placeholder="Job Title" {...register('jobTitle')} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <Textarea placeholder="Job description" {...register('jobDescription')} />
        {errors.jobDescription && (
          <p className="text-red-500">{errors.jobDescription.message}</p>
        )}

        <div className="flex gap-4 justify-between">
          <Controller
            name="location"
            control={control}
            render={({ field }) => {
              return (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by location" />
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
              );
            }}
          />

          <Controller
            name="company_id"
            control={control}
            render={({ field }) => {
              return (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by company">
                      {field.value
                        ? companyData?.find((company) => company.company_id === Number(field.value))?.companyName : "Company"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companyData?.map(({ id, companyName }) => {
                        return (
                          <SelectItem key={id} value={companyName}>
                            {companyName}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            }}
          />

          {/* Add company drawer */}
        </div>
      </form>
    </div>
  );
}

export default PostJob;
