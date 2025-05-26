import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <div className="w-screen overflow-x-hidden">
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout