import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { SearchIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '../../redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import store from '../../redux/store'

const HeroSection = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [query, setQuery] = useState("");

    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
    }, [searchedQuery]);
    const searchJobHandler = () => {
        dispatch(setSearchQuery(query));
        navigate('/browse');

    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='px-4 mx-auto py-4 rounded-full bg-gray-100 text-[#f83002] font-medium'>No. 1 Job Search Website</span>
                <h1 className='text-5xl font-bold'>Search , Apply & <br /> get Your <span className='text-[#6a38c2]'>Dream Job</span></h1>
            </div>
            <div className='flex w-[40%] shadow-lg border-gray-200 rounded-full items-center mx-auto gap-4 pl-3 '>
                <input type='text'
                    placeholder='Find your dream jobs'
                    className='outline-none border-none w-full'
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6a38c2]">
                    <SearchIcon className='h-5 w-5' />
                </Button>

            </div>

        </div>
    )
}

export default HeroSection