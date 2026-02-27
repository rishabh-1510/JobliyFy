import React, { useEffect } from 'react'
import Navbar from '../components/shared/Navbar'
import HeroSection from '../components/Home/HeroSection'
import CategoryCrousal from '../components/Home/CategoryCrousal'
import LatestJobs from '../components/Home/LatestJobs'
import Footer from '../components/Home/Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies")
    }
  }, [])
  useGetAllJobs();
  return (
    <div >
      <Navbar />
      <HeroSection />
      <CategoryCrousal />
      <LatestJobs />
      <Footer />


    </div>
  )
}

export default Home