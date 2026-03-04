import axios from 'axios'
import React, { useEffect } from 'react'
import {JOB_API_ENDPOINT} from '../utils/api'
import { useDispatch } from 'react-redux'
import { setAdminJobs} from '../redux/jobSlice'
const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAdminjobs = async()=>{
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/getAdminJobs`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAdminjobs();
    },[])
}

export default useGetAllAdminJobs