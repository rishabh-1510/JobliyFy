//12:27  

import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import store from '../../redux/store';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_ENDPOINT } from '../../utils/api';
import axios from 'axios'
const Applicants_Table = () => {
    const shortlistingStatus = ["Accepted", "Rejected"];
    const { applicants } = useSelector(store => store.application);
    
    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(
                `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
                { status: status.toLowerCase() },
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error)
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        }
    };
    return (
        <>
            <Table>
                <TableCaption>
                    A List of recent applied user
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className={'text-right'}>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants.applications.map((item) => (

                            <tr key={item._id}>
                                <TableCell>{item.applicant.fullName}</TableCell>
                                <TableCell>{item.applicant.email}</TableCell>
                                <TableCell>{item.applicant.mobileNumber}</TableCell>
                                <TableCell >
                                    {
                                        item?.applicant?.profile?.resume ? <a className={'text-blue-500'} href={`${item.applicant?.profile?.resume}`}>Click here</a> : <span>N/A</span>
                                    }</TableCell>
                                <TableCell>{new Date(item.applicant?.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className={'float-right cursor-pointer'}>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <MoreHorizontal className="cursor-pointer h-5 w-5" />
                                        </PopoverTrigger>

                                        <PopoverContent className="w-36 p-2">

                                            {shortlistingStatus.map((status, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => statusHandler(status, item?._id)}
                                                    className="px-3 py-2 rounded-md text-sm 
                                                            cursor-pointer 
                                                            hover:bg-gray-100 
                                                            transition flex items-center justify-between"
                                                >
                                                    <span
                                                        className={
                                                            status === "Accepted"
                                                                ? "text-green-600 font-medium"
                                                                : "text-red-500 font-medium"
                                                        }
                                                    >
                                                        {status}
                                                    </span>
                                                </div>
                                            ))}

                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>

            </Table>
        </>
    )
}

export default Applicants_Table