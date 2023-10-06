import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { ApiContext } from '../../ApiProvider/ApiProvider';
import CircleLoader from '../../components/CircleLoader';

const AddCompany = () => {
    const { handleCompany, loading } = useContext(ApiContext)
    const handleAddComPany = (e) => {
        handleCompany(e);
    }
    
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Add Company' />
            {/* <!-- Input Fields --> */}
            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                    <h3 className='font-medium text-black dark:text-white'>
                        Add Company
                    </h3>
                </div>
                <form onSubmit={handleAddComPany} className='flex flex-col gap-5.5 p-6.5'>
                    <div>
                        <label className='mb-3 block text-black dark:text-white'>
                            Company Name
                        </label>
                        <input
                            name='comapanyname'
                            type='text'
                            placeholder='Company Name'
                            className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        />
                    </div>
                    <div>
                        <label className='mb-3 block text-black dark:text-white'>
                            Contact Number
                        </label>
                        <input
                            name='contactnumber'
                            type='text'
                            placeholder='Contact Number'
                            className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        />
                    </div>
                    <div>
                        <label className='mb-3 block text-black dark:text-white'>
                            Company Adress
                        </label>
                        <input
                            name='adress'
                            type='text'
                            placeholder='Company Adress'
                            className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        />
                    </div>

                    {
                        loading ? <CircleLoader></CircleLoader> :
                            <button
                                className='inline-flex items-center justify-center rounded-full bg-[#3c50e0] py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
                            >Submit</button>
                    }
                </form>
            </div>
        </DefaultLayout>
    );
};

export default AddCompany;