//11:00
import React, { useEffect, useState } from 'react'
import {
  Table, TableBody, TableCaption,
  TableCell, TableHead, TableHeader, TableRow
} from "../ui/table"
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '../../redux/store'


const AdminJobsTable = () => {
  const { adminJobs, searchJobByText } = useSelector(store => store.job)

  //   const { companies , searchCompanyByText } = useSelector(store => store.company);
  const [filterJobs, setFilterJobs] = useState(adminJobs);
  const navigate = useNavigate()
  useEffect(() => {
    const filteredJobs = adminJobs?.filter((job) => {
      if (!searchJobByText) return true;

      return job?.title
        ?.toLowerCase()
        .includes(searchJobByText.toLowerCase());
    });

    setFilterJobs(filteredJobs);
  }, [adminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>
          A list of your recent Posted Job
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!adminJobs || adminJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Companies not found
              </TableCell>
            </TableRow>
          ) : (
            filterJobs?.map((job) => (
              <TableRow key={job._id}>

                <TableCell>{job?.company?.name}</TableCell>

                <TableCell>
                  {(job?.title)}
                </TableCell>

                <TableCell>
                  {new Date(job?.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      <div onClick={() => navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2 '>
                        <Eye className='w-4'/>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

      </Table>
    </div>
  )
}

export default AdminJobsTable