import React from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../components/ui/drawer.jsx'
import { Button } from './ui/button'
import { Input } from "../components/ui/input.jsx"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import useFetch from '@/hooks/useFetch.js';
import { applyForJob } from '@/api/applicationsAPI.js';
import { BarLoader } from 'react-spinners';
import { zodResolver } from "@hookform/resolvers/zod";
//asChild extends something in the shadcn ui

const schema = z.object({
  experience: z.number().min(0, { message: "Experience must be atleast 0 " }).int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post-Graduate"], { message: "Education is required" }),
  resume: z.any().refine((file) => {
    return file[0] && (file[0].type === "application/pdf" || file[0].type === "application/msword"), { message: "Only PDF or Word documents are allowed" }
  })
})
function ApplyJobs({ user, job, fetchJobFun, applied = false }) {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  })
  const { loading: loadingApply, error: errorApply, fun: fnApply } = useFetch(applyForJob)

  const onSubmit = (data) => {

    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJobFun();
      reset()
    })
  }
  return (
    <Drawer open={applied ? false : undefined} >
      <DrawerTrigger asChild>
        <Button
          variant={job?.jobStatus && !applied ? "blue" : "destructive"}
          disabled={!job?.jobStatus || applied} //job not open
        >{job?.jobStatus ? (applied ? "Applied" : "Apply") : "Hiring Closed"}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Apply for {job?.jobTitle} at {job?.company?.companyName}</DrawerTitle>
          <DrawerDescription>Please fill the form below.</DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4 pb-0' >
          <Input
            className="flex-1"
            type="number"
            placeholder="Years of experience"
            {...register("experience",
              { valueAsNumber: true }
            )}
          />
          {errors.experience &&
            (<p className='text-red-500'>{errors.experience.message}</p>)
          }
          <Input
            className="flex-1"
            type="text"
            placeholder="Skills (Comma Separated)"
            {...register("skills")}
          />

          {errors.skills &&
            (<p className='text-red-500'>{errors.skills.message}</p>)}

          <Controller
            name='education'
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                {...field}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Graduate" id="graduate" />
                  <Label htmlFor="graduate">Graduate</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Post-Graduate" id="post-graduate" />
                  <Label htmlFor="post-graduate">Post Graduate</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.education && (
            <p className='text-red-500'>{errors.education.message}</p>
          )}
          <Input
            type="file"
            accept=".pdf , .doc, .docx"
            className="flex-1 file:text-gray-500"
            {...register("resume")}
          />
          {errors.resume && (
            <p className='text-red-500'>{errors.resume.message}</p>
          )}
          {errorApply?.message && (
            <p className='text-red-500'>{errorApply?.message}</p>
          )}
          {loadingApply && <BarLoader width={"100%"} color='#36d7b7' />}
          <Button
            type="submit"
            variant="blue"
            size="lg"
          >Apply</Button>
        </form>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ApplyJobs;
