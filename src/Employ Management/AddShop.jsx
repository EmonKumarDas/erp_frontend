import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { ApiContext } from '../ApiProvider/ApiProvider';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumb';


const AddShop = () => {
    const { handleShop, loading } = useContext(ApiContext)

    const handleSubmit = (event) => {
        handleShop(event)
    };
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Add Shop' />
            {/* <!-- Input Fields --> */}
            <div className='grid grid-cols-1'>
                <div className='rounded-sm  border flex-1 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                        <h3 className='font-medium text-black dark:text-white'>
                            Add Shop
                        </h3>
                    </div>
                    <form className='flex flex-col gap-5.5 p-6.5' onSubmit={handleSubmit}>
                        <div>
                            <label className='mb-3 block text-black dark:text-white'>Shop's Name</label>
                            <input
                                required
                                name='name'
                                type='text'
                                placeholder="Shop's Name"
                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            />
                        </div>

                        <div>
                            <label className='mb-3 block text-black dark:text-white'>Shop's Loacation</label>
                            <input
                                required
                                name='location'
                                type='text'
                                placeholder="Shop's Loacation"
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

export default AddShop;