import React from 'react'
import { useUser } from '@clerk/clerk-react'
import {BarLoader} from "react-spinners"

function OnBoarding() {
  const { user,isLoaded } = useUser()

  if(!isLoaded){
    return <BarLoader className='mb-4' width={"100%"} color='#11111'/>
  }
  return (
    <div>
      <h1>Onboarding</h1>
    </div>
  )
}

export default OnBoarding
