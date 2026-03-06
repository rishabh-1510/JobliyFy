import React, { useEffect, useState } from 'react'
import Navbar from '../components/shared/Navbar'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { Button } from '../components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../utils/api'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading,setUser } from '../redux/authSlice'
import store from '../redux/store'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user,loading } = useSelector(store => store.auth)
  const [input, setinput] = useState({
    email: "",
    password: "",
    role: ""
  })
  const changeEventhandler = (event) => {
    setinput({ ...input, [event.target.name]: event.target.value })
    event.preventDefault();
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message);
        navigate("/")
      }
    }
    catch(err){
      console.log(err)
      toast.error(err.response.data.message);

    } finally {
      dispatch(setLoading(false));
    }
  }
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user])
  return (
    <>
      <div className='text-2xl font-bold '>
        <Navbar />
      </div>
      <div className='flex justify-center items-center mx-auto max-w-7xl'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>

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
            <Label className="mb-2">Password</Label>
            <Input
              type="text"
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

          </div>{
            loading ? (<Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'/></Button>) : (
              <Button type="submit" className='w-full my-4'>Login</Button>
            )

          }
          <span className='text-sm'>Dont have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
        </form>
      </div>
    </>


  )
}

export default Login