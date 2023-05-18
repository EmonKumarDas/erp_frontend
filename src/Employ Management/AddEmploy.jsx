import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumb';
import { ApiContext } from '../ApiProvider/ApiProvider';

const AddEmploy = () => {
    const { handleChangedata, handleEmploy, formData, loading } = useContext(ApiContext)
    const handleChange = (event) => {
        handleChangedata(event)
    };

    const handleSubmit = (event) => {
        handleEmploy(event)
    };
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Add Employ' />
            {/* <!-- Input Fields --> */}
            <div className='grid grid-cols-1'>
                <div className='rounded-sm  border flex-1 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                        <h3 className='font-medium text-black dark:text-white'>
                            Add Employ
                        </h3>
                    </div>
                    <form className='flex flex-col gap-5.5 p-6.5' onSubmit={handleSubmit}>
                        <div>
                            <label className='mb-3 block text-black dark:text-white'>Employ's Name</label>
                            <input
                                required
                                name='name'
                                type='text'
                                placeholder="Employ's Name"
                                value={formData.name}
                                onChange={handleChange}
                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            />
                        </div>

                        <div>
                            <label className='mb-3 block text-black dark:text-white'>Employ's Number</label>
                            <input
                                required
                                name='number'
                                type='text'
                                placeholder="Employ's Number"
                                value={formData.number}
                                onChange={handleChange}
                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            />
                        </div>

                        <div>
                            <label className='mb-3 block text-black dark:text-white'>Employ's Email</label>
                            <input
                                required
                                name='email'
                                type='text'
                                placeholder="Employ's Email"
                                value={formData.email}
                                onChange={handleChange}
                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            />
                        </div>

                        <button
                            className='inline-flex items-center justify-center rounded-xl bg-[#3c50e0] py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
                            type='submit'
                        >
                            {
                                loading ? "Loading" : "Submit"
                            }

                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </DefaultLayout>
    );
};

export default AddEmploy;