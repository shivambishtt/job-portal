import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from '@clerk/clerk-react'
import { PenBox } from 'lucide-react'

function Header() {
  const [showSignIn, setShowSignIn] = useState(false)
  const [search, setSearch] = useSearchParams()

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true)
    }
  }, [search])

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowSignIn(false)
      setSearch({})
    }
  }
  return (
    <>
      <nav className='py-4 flex justify-between items-center'>
        <Link>
          <img src="/logo.png" alt="" className='h-20' />
        </Link>

        <div className='flex gap-8'>
          <SignedOut>
            <Button
              variant="outline"
              onClick={() => setShowSignIn(true)}
            >

              Login
            </Button>
          </SignedOut>

          <SignedIn>
            <Link to="/post-job">
              {/* to add a condition here */}
              <Button
                variant="destructive"
                className="rounded-full">
                <PenBox size={20} className='mr-5' />
                Post A Job
              </Button>
            </Link>

            <UserButton />
          </SignedIn>
        </div>
      </nav>
      {showSignIn &&
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

          <SignIn signUpForceRedirectUrl='/onboarding' fallbackRedirectUrl='/onboarding' /></div>}
    </>

  )
}

export default Header
