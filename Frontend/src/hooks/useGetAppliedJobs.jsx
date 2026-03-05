import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API_ENDPOINT } from "../utils/api";
import { setallAppliedJobs } from "../redux/jobSlice";
const useGetAppliedJobs = () =>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAppliedJobs = async()=>{
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/getAppliedjobs`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setallAppliedJobs(res.data.appliaction))
                } 
            } catch (error) {
                
            }
        };
        fetchAppliedJobs();
    },[])
}

export default useGetAppliedJobs;