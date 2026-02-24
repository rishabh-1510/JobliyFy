import React from 'react'
import Navbar from '../components/shared/Navbar'
import HeroSection from '../components/Home/HeroSection'
import CategoryCrousal from '../components/Home/CategoryCrousal'
import LatestJobs from '../components/Home/LatestJobs'
import Footer from '../components/Home/Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'

const Home = () => {
  useGetAllJobs();
  return (
    <div >
        <Navbar/>
        <HeroSection/>
        <CategoryCrousal/>
        <LatestJobs/>
        <Footer/>


    </div>
  )
}

export default Home