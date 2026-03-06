import axios from 'axios'
import { useEffect } from 'react'
import { JOB_API_ENDPOINT } from '../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'

const useGetAllJobs = () => {

    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {

        const fetchAllJobs = async () => {
            dispatch(setAllJobs([])); // clear old jobs

            const res = await axios.get(
                `${JOB_API_ENDPOINT}/getAllJobs?keyword=${searchedQuery}`,
                { withCredentials: true }
            );

            if (res.data.success) {
                dispatch(setAllJobs(res.data.jobs))
            }
        }

        fetchAllJobs()

    }, [searchedQuery])

}

export default useGetAllJobs