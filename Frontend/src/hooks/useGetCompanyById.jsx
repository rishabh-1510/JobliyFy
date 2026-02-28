import axios from 'axios'
import React, { useEffect } from 'react'
import {COMPANIES_API_ENDPONTS} from '../utils/api'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'
import { setSingleCompany } from '../redux/companySlice'
const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanyById = async()=>{
            try {
                const res = await axios.get(`${COMPANIES_API_ENDPONTS}/get/${companyId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCompanyById();
    },[companyId,dispatch])
}

export default useGetCompanyById