import React from 'react'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Link } from 'react-router-dom'
import companies from "../data/companies.js"

function LandingPage() {
  return (
    <main
      className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">

      <section
        className="text-center ">
        <h1
          className="flex flex-col items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4">Find Your Dream Job
          <span className='flex items-center gap-3 gradient-title'>and get <img src="/logo.png" alt="Hirrd logo" className='h-14 sm:h-24 lg:h-32' />
          </span>
        </h1>

        <p
          className="text-gray-300 sm:mt-5 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>

      </section>

      <div className='flex justify-center items-center gap-2 -top-2'>
        <Link to="/jobs">
          <Button
            variant="blue"
            size="xl">
            Find Jobs
          </Button>
        </Link>

        <Link to="/post-job">
          <Button
            variant="green"
            size="xl">
            Post A Job
          </Button>

        </Link>

      </div>

      <Carousel
        plugins={[    
        ]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* banner */}
      <section>
        {/* cards */}
      </section>
      {/* accordion */}
    </main>
  )
}

export default LandingPage
