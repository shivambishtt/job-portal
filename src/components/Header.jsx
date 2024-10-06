import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

function Header() {
  return (
    <>
      <nav className='py-4 flex justify-between items-center'>
        <Link>
          <img src="/logo.png" alt="" className='h-20' />
        </Link>
        <SignedOut>
        <SignInButton/>
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>
        {/* <Button variant="outline">Login</Button> */}
      </nav>
    </>

  )
}

export default Header
