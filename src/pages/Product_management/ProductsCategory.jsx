import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const ProductsCategory = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Product Category' />
            {/* <!-- Input Fields --> */}
            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                    <h3 className='font-medium text-black dark:text-white'>
                        Products Category
                    </h3>
                </div>
                <form className='flex flex-col gap-5.5 p-6.5'>
                
                    {/* add Product input form */}
                    <div>
                        <label className='mb-3 block text-black dark:text-white'>
                            Product category Name
                        </label>
                        <input
                            name='productCategoryName'
                            type='text'
                            placeholder='Product category Name'
                            className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        />
                    </div>

                    <Link
                        to='#'
                        className='inline-flex items-center justify-center rounded-full bg-[#3c50e0] py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
                    >
                        Submit
                    </Link>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default ProductsCategory;