
import React, { useEffect, useState } from 'react'
import Navbar from '../components/shared/Navbar'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '../redux/jobSlice'
import AdminJobsTable from '../components/admin/AdminJobsTable'
import useGetAllAdminJobs from '../hooks/useGetAllAdminJobs'
const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  useGetAllCompanies();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input])
  return (

    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className={'w-fit'}
            placeholder='Filter by name'
            onChange={(e) => setInput(e.target.value)} />
          <Button onClick={() => navigate('/admin/job/create')} >New Jobs</Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs