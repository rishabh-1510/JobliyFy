import React, { useState } from 'react'
import Navbar from '../components/shared/Navbar'
import { useDispatch } from 'react-redux'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { Button } from '../components/ui/button'
import axios from "axios"
import { USER_API_ENDPOINT } from '../utils/api'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { setLoading } from '../redux/authSlice'
import { useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
const Signup = () => {
    const dispatch = useDispatch();
    const [input, setinput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading } = useSelector(store => store.auth)
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("password", input.password);
        formData.append("mobileNumber", input.phoneNumber);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true))
            const res = await axios.post(
                `${USER_API_ENDPOINT}/register`,
                formData,
                {
                    withCredentials: true
                }
            );

if (res.data.success) {
    toast.success(res.data.message);
    navigate("/login")
}
        }
        catch (err) {
    console.log(err);
    toast.error(err.response.data.message)
} finally {
    dispatch(setLoading(false))
}
    }

const changeEventhandler = (event) => {
    setinput({ ...input, [event.target.name]: event.target.value })

}
const changeFileHandler = (event) => {
    setinput({ ...input, file: event.target.files?.[0] })
}
return (
    <>
        <div className='text-2xl font-bold '>
            <Navbar />
        </div>
        <div className='flex justify-center items-center mx-auto max-w-7xl'>
            <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                <div className='my-2'>
                    <Label className="mb-2">Full Name</Label>
                    <Input
                        onChange={changeEventhandler}
                        type="text"
                        placeholder="Full Name"
                        value={input.fullName}
                        name="fullName"

                    />
                </div>
                <div className='my-2'>
                    <Label className="mb-2">Email</Label>
                    <Input
                        type="email"
                        placeholder="abc@gmail.com"
                        onChange={changeEventhandler}
                        value={input.email}
                        name="email"
                    />
                </div>
                <div className='my-2'>
                    <Label className="mb-2">Mobile Number</Label>
                    <Input
                        type="text"
                        placeholder="1234567890"
                        onChange={changeEventhandler}
                        value={input.phoneNumber}
                        name="phoneNumber"
                    />
                </div>
                <div className='my-2'>
                    <Label className="mb-2">Password</Label>
                    <Input
                        type="password"
                        placeholder="Password"
                        onChange={changeEventhandler}
                        value={input.password}
                        name="password"
                    />
                </div>
                <div className='flex itmes-center justify-between'>
                    <RadioGroup className="flex items-center gap-4 my-5 ">
                        <div className="flex items-center gap-3">
                            <Input
                                type="radio"
                                name="role"
                                value="Student"
                                className="cursor-pointer"
                                checked={input.role === 'Student'}
                                onChange={changeEventhandler}


                            />
                            <Label htmlFor="option-one">Student</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Input
                                type="radio"
                                name="role"
                                value="Recruiter"
                                className="cursor-pointer"
                                checked={input.role === 'Recruiter'}
                                onChange={changeEventhandler}
                            />
                            <Label htmlFor="option-two">Recruiter</Label>
                        </div>
                    </RadioGroup>
                    <div className='flex items-center gap-2'>
                        <Label>Profile</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            className="cursor-pointer"
                            name="image"
                            onChange={changeFileHandler}
                        />
                    </div>
                </div>
                {
                    loading ? (<Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /></Button>) : (
                        <Button type="submit" className='w-full my-4'>Signup</Button>
                    )

                }

                <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
            </form>
        </div>
    </>


)
}

export default Signup