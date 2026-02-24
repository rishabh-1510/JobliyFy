
import React from 'react'
import {Badge} from "../ui/badge"
import useGetAllJobs from '../../hooks/useGetAllJobs'
const LatestJobCard = (job) =>{
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
            <h1 className='font-medium text-lg'>{job?.job?.company?.name}</h1>
            <p className='text-sm text-gray-500'>{job?.job?.location}</p>
        </div>
        <div>
            
            <h1 className='font-bold text-lg my-2'>{job?.job?.title}</h1>
            <p className='text-sm text-gray-600  '>{job?.job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-500 font-bold'} variant='ghost'>{job?.job?.position} Positions</Badge>
            <Badge className={'text-[#f83002] font-bold'} variant='ghost'>{job?.job?.jobType}</Badge>
            <Badge className={'text-[#7209b7] font-bold'} variant='ghost'>{job?.job?.salary}</Badge>
        </div>
    </div>
  )
}

export default LatestJobCard