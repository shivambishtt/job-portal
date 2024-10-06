import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/LandingPage';
import OnBoarding from './pages/OnBoarding';
import JobListing from './pages/JobListing';
import PostJob from './pages/PostJob';
import MyJobs from './pages/MyJobs';
import SavedJobs from './pages/SavedJobs';
import JobPage from './pages/JobPage';
import { ThemeProvider } from './components/ThemeProvider';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <OnBoarding />
        ),
      },
      {
        path: "/jobs",
        element: (
          <JobListing />
        ),
      },
      {
        path: "/post-job",
        element: (
          <PostJob />
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <MyJobs />
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <SavedJobs />
        ),
      },
      {
        path: "/job/:id",
        element: (
          <JobPage />
        ),
      },
    ],
  },
]);
function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ul-theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
