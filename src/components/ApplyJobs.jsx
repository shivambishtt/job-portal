import React from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../components/ui/drawer.jsx'
import { Button } from './ui/button'

//asChild extends something in the shadcn ui
function ApplyJobs({ user, job, fetchJobFun, applied = false }) {
  return (
    <Drawer open={applied ? false : undefined} >
      <DrawerTrigger asChild> 
        <Button
          variant={job?.jobStatus && !applied ? "blue" : "destructive"}
          disabled={!job?.jobStatus || applied}
        >{job?.jobStatus ? (applied ? "Applied" : "Apply") : "Hiring Closed"}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Apply for {job?.jobTitle} at {job?.company?.companyName}</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Open</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ApplyJobs;
