import React from 'react'
import {Table,  TableBody,  TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
const CompaniesTable = () => {
  return (
    <div>
        <Table>
            <TableCaption>A list of your recent registered Companies</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className={'text-right'}>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableCell>
                    <Avatar>
                        <AvatarImage src="https://img.freepik.com/premium-vector/company-logo-design-any-corporate-brand-suitable-your-business-company-etc_1300464-373.jpg?w=2000"/>
                    </Avatar>
                </TableCell>
                <TableCell>Google</TableCell>
                <TableCell>15-10-2004</TableCell>
                <TableCell className={'text-right'}>
                    <Popover>
                        <PopoverTrigger ><MoreHorizontal/></PopoverTrigger>
                        <PopoverContent className={'w-32'}>
                            <div className='flex items-center gap-2'>
                                <Edit2 className='w-4'/>
                                <span>Edit</span>
                            </div>
                        </PopoverContent>
                    </Popover>
                </TableCell>
            </TableBody>
        </Table>
    </div>
  )
}

export default CompaniesTable