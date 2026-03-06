import React from 'react'
import Navbar from '../../components/shared/Navbar'
import Applicants_Table from '../../components/admin/Applicants_Table'
import { useEffect } from 'react'
import { APPLICATION_API_ENDPOINT } from '../../utils/api'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '../../redux/applicationslice'
import store from '../../redux/store'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, {
                    withCredentials: true
                })
                dispatch(setAllApplicants(res.data.job));

            } catch (error) {
                console.log(error)
            }
        }
        fetchAllApplicants();
    }, [])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto '>
                <h1 className='font-bold text-xl my-5'>
                    Applicants {applicants?.applications?.length}
                </h1>
                <Applicants_Table />
            </div>
        </div>
    )
}

export default Applicants