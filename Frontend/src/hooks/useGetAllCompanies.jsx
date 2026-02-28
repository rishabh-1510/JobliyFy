import axios from 'axios'
import React, { useEffect } from 'react'
import {COMPANIES_API_ENDPONTS} from '../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import {  setCompanies} from '../redux/companySlice'
import store from '../redux/store'
const useGetAllCompanies = (companyId) => {
    const {user} = useSelector(store=>store.auth);
     
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanies = async()=>{
            try {
                const res = await axios.get(`${COMPANIES_API_ENDPONTS}/getcompanies`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies))
                }
                console.log('res is',res)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCompanies();
    },[companyId,dispatch])
}

export default useGetAllCompanies