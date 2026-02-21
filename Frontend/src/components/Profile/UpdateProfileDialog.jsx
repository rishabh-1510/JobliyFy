//7:35
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import {USER_API_ENDPOINT} from '../../utils/api'
import { setUser } from '../../redux/authSlice'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(store=>store.auth)
  const[input , setInput]=useState({
    fullname:user?.fullName || "",
    email:user?.email || "",
    phoneNumber:user?.phoneNumber || "",
    bio:user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file:user?.profile?.resume || ""
  })
  const changeEventHandler  = (e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }
  const SubmitHandler=async(e)=>{
    e.preventDefault();
    const formData =new FormData();
    formData.append("fullName",input.fullname);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("bio",input.bio);
    formData.append("skills",input.skills);
    if(input.file){
      formData.append('file',input.file)
    }

    try{
      setLoading(true)
      const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`,formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        },
        withCredentials:true
      });
      if(res.data.success){
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    }catch(err){
      console.log(err);
      toast.error(err.response.data.message)
    }finally{
      setLoading(false);
    }
    setOpen(false); 
  }
  const fileChangeHandler = (e)=>{
    const file = e.target.files?.[0];
    setInput({...input,file})
  } 
  console.log(input)
  return (
    <Dialog open={open}>
      <DialogContent className={'sm:max-w-[425px] '} onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>
            Update Profile
          </DialogTitle>
        </DialogHeader>
          <form onSubmit={SubmitHandler}>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>

                <Label htmlFor="name" className={'text-right'}>Name</Label>
                <Input
                  id='name'
                  name='fullname'
                  className={'col-span-3'}
                  value={input.fullname}
                  onChange={changeEventHandler}
                />

              </div>
              <div className='grid grid-cols-4 items-center gap-4'>

                <Label htmlFor="email" className={'text-right'}>Email</Label>
                <Input
                  type={'email'}
                  id='email'
                  value={input.email}
                  onChange={changeEventHandler}
                  name='email'
                  className={'col-span-3'}
                />

              </div>
              <div className='grid grid-cols-4 items-center gap-4'>

                <Label htmlFor="number" className={'text-right'}>Number</Label>
                <Input
                  id='number'
                  name='phoneNumber'
                  onChange={changeEventHandler}
                  className={'col-span-3'}
                  value={input.phoneNumber}
                />

              </div>
              <div className='grid grid-cols-4 items-center gap-4'>

                <Label htmlFor="bio" className={'text-right'}>Bio</Label>
                <Input
                  id='bio'
                  name='bio'
                  onChange={changeEventHandler}
                  className={'col-span-3'}
                  value={input.bio}
                />

              </div>
              <div className='grid grid-cols-4 items-center gap-4'>

                <Label htmlFor="skills" className={'text-right'}>Skills</Label>
                <Input
                  id='skills'
                  name='skills'
                  onChange={changeEventHandler}
                  value={input.skills}
                  className={'col-span-3'}
                />

              </div>

              <div className='grid grid-cols-4 items-center gap-4'>

                <Label htmlFor="resume" className={'text-right'}>Resume</Label>
                <Input
                  type='file'
                  accept="application/pdf"
                  id='resume'
                  onChange={fileChangeHandler}
                  name='resume' 
                  className={'col-span-3'}
                />

              </div>
            </div>
            <DialogFooter>
              {
                loading ? (<Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /></Button>) : (
                  <Button type="submit" className='w-full my-4'>Update</Button>
                )

              }
            </DialogFooter>
          </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog