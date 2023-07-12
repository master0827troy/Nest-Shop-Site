import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className='section-container mt-10'>
        <Outlet />
      </div>
    </>
  )
}

export default RootLayout