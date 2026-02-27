//9;40
import React from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Input } from '../ui/input'
import { useState } from 'react'
import { Label } from '../ui/label'
const CompanySetup = () => {
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.targer.name]: [e.target.value] })
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form action='submit'>
                    <div className='flex items-center  gap-5 p-8 '>
                        <Button className={'flex items-center gap-2 text-gray-500 font-semibold'} variant='outline'>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl '>Comapny Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type={'text'}
                                name='name'
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup