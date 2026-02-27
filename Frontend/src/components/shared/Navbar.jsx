import React from 'react'
import { Link } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User2 } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import store from '../../redux/store'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../../utils/api'
import { setUser } from '../../redux/authSlice'
const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(store => store.auth);
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`);
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message)
            }
        } catch (err) {
            console.log(err);
            toast.error(err)
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between max-w-7xl mx-auto h-16'>
                <div>
                    <h1 className='text-3xl font-bold'>Job<span className='font-bold  text-[#F83002] text-3xl'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12 '>
                    {
                        user && user.role === 'Recruiter' ? (
                            <ul className='flex font-medium items-center gap-5'>
                                <li className="cursor-pointer" onClick={() => navigate("/admin/companies")}>Companies</li>
                                <li className="cursor-pointer" onClick={() => navigate("/admin/jobs")}>Jobs</li>
                            </ul>
                        ) : (
                            <ul className='flex font-medium items-center gap-5'>
                                <li className="cursor-pointer" onClick={() => navigate("/")}>Home</li>
                                <li className="cursor-pointer" onClick={() => navigate("/jobs")}>Jobs</li>
                                <li className="cursor-pointer" onClick={() => navigate("/browse")}>Browse</li>
                            </ul>
                        )
                    }

                    {
                        user ? (

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={`${user.profile.profilePhoto}`} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar>
                                            <AvatarImage src={`${user.profile.profilePhoto}`} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullName}</h4>
                                            <p className='text-sm text-muted-foreground'>{user.fullName} Document</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 items-start text-gray-600'>
                                        {
                                            user && user.role === 'Recruiter' ? (
                                                <div>

                                                </div>
                                            ) : (
                                                <div className='flex w-fit items-center gap-1 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant='link' className="cursor-pointer" onClick={() => navigate("/profile")}>View Profile</Button>
                                                </div>
                                            )
                                        }
                                        <div className='flex w-fit items-center gap-1 cursor-pointer'>
                                            <LogOut />
                                            <Button variant='link' className="cursor-pointer" onClick={logoutHandler}>Logout</Button>
                                        </div>

                                    </div>

                                </PopoverContent>
                            </Popover>
                        ) : (
                            <div className='flex gap-2 itmes-center'>
                                <Link to="/login"><Button variant='outline'>Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#321568]">Signup</Button></Link>

                            </div>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar


//3:40