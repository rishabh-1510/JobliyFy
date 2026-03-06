import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../../redux/jobSlice'
const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    }
]


const FilterCard = () => {
    const [selectedValue , setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) =>{
        setSelectedValue(value)
    }
    useEffect(()=>{ 
        dispatch(setSearchQuery(selectedValue));
    },[selectedValue]); 
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}> 
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>
                                {data.filterType}
                            </h1>
                            {
                                data.array.map((item, indx) => {
                                    const itemId = `r${index}-${indx}` 
                                    return (
                                        <div className='flex gap-2.5 mb-2 mt-2 items-center space-x-2' key={indx}>
                                            <RadioGroupItem value={item}  id={itemId}/>
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard   