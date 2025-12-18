import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/footer'
import SecondFooter from '../components/footer/secondFooter'
import Navbar from '../components/navbar/navbar'

const Layout = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        <SecondFooter/>
    </>
  )
}

export default Layout
