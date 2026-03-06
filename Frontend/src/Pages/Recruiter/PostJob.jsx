//11:18
import React, { useState } from 'react'
import Navbar from '../../components/shared/Navbar'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useSelector } from 'react-redux'
import store from '../../redux/store'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components/ui/select'
import axios from 'axios'
import { JOB_API_ENDPOINT } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
const companyArray = [];
const PostJob = () => {
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        position: 0,
        companyId: ""
    });
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const { companies } = useSelector(store => store.company);
    
    const selectChangeHandle = (value) => {
        setInput({ ...input, companyId: value });
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
           
            const res = await axios.post(`${JOB_API_ENDPOINT}/postJob`, input, {
                withCredentials: true
            });
            
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs');

            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md ' onSubmit={onSubmitHandler}>

                    <div className='grid grid-cols-2 gap-2'>

                        <div>
                            <Label>Title</Label>
                            <Input
                                onChange={changeEventHandler}
                                type={'text'}
                                name='title'
                                className={'focus-visble:ring-offset-0 focus-visible:ring-0 my-1'}
                                value={input.title}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                onChange={changeEventHandler}
                                type={'text'}
                                name='description'
                                className={'focus-visble:ring-offset-0 focus-visible:ring-0 my-1'}
                                value={input.description}

                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                onChange={changeEventHandler}
                                type={'text'}
                                name='requirements'
                                className={'focus-visble:ring-offset-0 focus-visible:ring-0 my-1'}
                                value={input.requirements}
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type={'text'}
                                onChange={changeEventHandler}
                                name='salary'
                                className={'focus-visble:ring-offset-0 focus-visible:ring-0 my-1'}
                                value={input.salary}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type={'text'}
                                name='location'
                                className={'focus-visble:ring-offset-0 focus-visible:ring-0 my-1'}
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type={'text'}
                                name='jobType'
                                className={'focus-visble:ring-offset-0 focus-visible:ring-0 my-1'}
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type={'number'}
                                name='experienceLevel'
                                className={'focus-visble:ring-offset-0 focus-visible:ring-0 my-1'}
                                value={input.experienceLevel}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Positions</Label>
                            <Input
                                type={'number'}
                                name='position'
                                className={'focus-visble:ring-offset-0 focus-visible:ring-0 my-1'}
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select
                                    value={input.companyId}
                                    onValueChange={selectChangeHandle}

                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Company</SelectLabel>

                                            {companies.map((company) => (
                                                <SelectItem
                                                    key={company._id}
                                                    value={company._id}
                                                >
                                                    {company.name}
                                                </SelectItem>
                                            ))}

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    {
                        loading ? (<Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /></Button>) : (
                            <Button type={'submit'} className={'w-full mt-8'}>
                                Post New Job
                            </Button>
                        )
                    }

                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>Please register a company before first posting a job</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob