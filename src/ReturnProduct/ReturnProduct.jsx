import React, { useContext } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumb';
import { ApiContext } from '../ApiProvider/ApiProvider';

const ReturnProduct = () => {
    const { handle_return_product,stockIn, allcompany, loading } = useContext(ApiContext);

    const handleReturn = (e) => {
        handle_return_product(e)
    }
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Return Product' />
            <div className=''>
                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                        <h3 className='font-medium text-black dark:text-white'>
                            Return Product
                        </h3>
                    </div>
                    <form onSubmit={handleReturn}>
                        <div className='p-6.5'>

                            <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                               

                                <div className='w-full'>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Select Product
                                </label>
                                <select
                                    required
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    name="product"
                                >
                                    <option selected disabled>Select Product</option>
                                    {stockIn.map((product) => (
                                        <option
                                        key={stockIn?._id}
                                        value={product.productname}>
                                            {product.productname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                                <div className='w-full'>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Select watt
                                </label>
                                <select
                                    required
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    name="watt"
                                >
                                    <option selected disabled>Select watt</option>
                                    {stockIn.map((product) => (
                                        <option
                                        key={product?._id}
                                        value={product.watt}>
                                            {product.watt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            </div>

                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Company
                                </label>
                                <select
                                    required
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    name="company"
                                >
                                    <option selected disabled>Select Company</option>
                                    {allcompany.map((company) => (
                                        <option
                                        key={allcompany?._id}
                                        value={company.comapanyname}>
                                            {company.comapanyname}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div className='mb-4.5'>
                                <label className='mb-2.5 block text-black dark:text-white'>
                                    Quantity <span className='text-meta-1'>*</span>
                                </label>
                                <input
                                    defaultValue={1}
                                    name="quantity"
                                    type='Quantity'
                                    placeholder='Enter your Quantity'
                                    className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                />
                            </div>

                            <div className='mb-4.5'>
                                <label className='mb-2.5 block text-black dark:text-white'>
                                    Price
                                </label>
                                <input
                                    name='price'
                                    type='text'
                                    placeholder='Enter Price'
                                    className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                />
                            </div>
                            <button className='flex w-full justify-center rounded bg-primary p-3 font-medium text-gray'>
                                {
                                    loading ? "Loading...." : "ADD"
                                }

                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default ReturnProduct;
