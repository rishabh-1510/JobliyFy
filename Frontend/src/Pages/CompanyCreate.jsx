import React, { useState } from 'react'
import Navbar from '../components/shared/Navbar'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { COMPANIES_API_ENDPONTS } from '../utils/api'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setSingleCompany } from '../redux/companySlice'
const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [companyName, setCompanyName] = useState('')
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(
                `${COMPANIES_API_ENDPONTS}/register`,
                { name: companyName },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (res?.data?.success) {
                dispatch(setSingleCompany(res?.data?.company))
                toast.success(res?.data?.message);
                const CompanyId = res?.data?.company?._id;
                navigate(`/admin/companies/${CompanyId}`)
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto '>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name</p>
                </div>

                <Label>Comapny Name</Label>
                <Input
                    type={'text'}
                    className={'my-2'}
                    placeholder='JobLify , Microsoft etc.'
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant='outline' onClick={() => navigate('/admin/companies')}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate