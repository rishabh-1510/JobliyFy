//13:00

import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobtable = () => {

  const { allAppliedJobs } = useSelector(state => state.job)
  const statusStyle = {
    accepted: "bg-green-500 hover:bg-green-600 text-white",
    rejected: "bg-red-500 hover:bg-red-600 text-white",
    pending: "bg-gray-500 hover:bg-gray-600 text-white"
  }; 

  return (
    <div>
      <Table>
        <TableCaption>
          A list of your applied jobs
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs?.map((appliedJob) => (
            <TableRow key={appliedJob._id}>
              <TableCell>{appliedJob?.createdAt?.split('T')[0]}</TableCell>
              <TableCell>{appliedJob?.job?.title}</TableCell>
              <TableCell>{appliedJob?.job?.company?.name}</TableCell>
              <TableCell className="text-right">
                <Badge className={statusStyle[appliedJob.status]}>
                  {appliedJob.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  )
}

export default AppliedJobtable