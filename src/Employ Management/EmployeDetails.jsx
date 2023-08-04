import React, { useContext, useState } from 'react'
import CircleLoader from '../components/CircleLoader';
import { ApiContext } from '../ApiProvider/ApiProvider';


const EmployeDetails = ({ employee, loading }) => {
    const { getMonthName } = useContext(ApiContext);

    return (
        <div className='col-span-12 mt-5 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark'>

            {
                loading ? <CircleLoader></CircleLoader> :
                    employee?.map((employ, index) => (
                        <div>
                            <a
                                className='flex items-center gap-5 py-3 px-7.5'
>
                               
                                <div
                                    key={index}
                                    className={`${index % 2 === 0 ? 'flex gap-10 w-full bg-gray-3 dark:bg-meta-4' : 'flex w-full gap-10 bg-gray-5 dark:bg-primary'
                                        } flex items-center gap-5 py-3 px-7.5`}
                                >

                                    <div className=''>
                                        <h5 className='font-medium text-white'>{employ?.date}</h5>
                               
                                    </div>
                                    <div className=''>
                                        <h5 className='font-medium text-white'>||</h5>
                                    </div>

                                    <div className=''>
                                        <h5 className='font-medium text-white'>{employ?.pay} TK</h5>
                                        <p>Salary</p>
                                    </div>
                                    <div className=''>
                                        <h5 className='font-medium text-white'>||</h5>
                                    </div>

                                    <div className=''>
                                        <h5 className='font-medium text-white'>{employ?.pay} TK</h5>
                                        <p>Others Bill</p>
                                    </div>

                                </div>

                            </a>
                        </div>
                    ))
            }
        </div>

    )
}

export default EmployeDetails;
