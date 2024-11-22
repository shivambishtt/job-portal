import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { BarLoader } from "react-spinners"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function OnBoarding() {
  const { user, isLoaded } = useUser()
  console.log(user);

  const navigate = useNavigate()


  const handleRole = async (role) => {
    await user.update({
      unsafeMetadata: { role }
    }).then(() => {
      navigate(role === "Recruiter" ? "/post-job" : "/jobs")
    }).catch((error) => {
      console.log("Error occured while updating the role :", error);
    })
  }
  useEffect(() => {
    if (user?.unsafeMetadata.role) {
      navigate(user?.unsafeMetadata?.role === "Recruiter" ? "/post-job" : "/jobs")
    }
  }, [user])




  return (
    <div className=" flex flex-col items-center justify-center mt-31">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          onClick={() => handleRole("Candidate")}
          variant="blue"
          className="h-36 text-2xl"
        >
          Candidate
        </Button>
        <Button
          onClick={() => handleRole("Recruiter")}
          variant="destructive"
          className="h-36 text-2xl"
        >
          Recruiter
        </Button>
      </div>
    </div>
  )
}

export default OnBoarding
