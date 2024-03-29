import React, { useContext } from 'react';
import { ApiContext } from '../ApiProvider/ApiProvider';

const ShopModel = ({ shops }) => {
    const { isModalOpen, setIsModalOpen, handleshopBill, loading } = useContext(ApiContext);

    const handleshopPayBillform = (e) => {
        handleshopBill(e, shops?._id)
    }

    return (
        <div>
            {isModalOpen ? (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-boxdark rounded-lg shadow-lg p-6">
                            <form onSubmit={handleshopPayBillform} className='grid grid-cols-2 gap-3'>
                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Shop Name
                                    </label>
                                    <input
                                        required

                                        name='shopname'
                                        defaultValue={shops?.shopname}
                                        type='text'
                                        placeholder='shopname'
                                        className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                </div>
                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Number
                                    </label>
                                    <input
                                        required
                                        defaultValue={shops?.location}
                                        name='location'
                                        type='text'
                                        placeholder='location'
                                        className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                </div>
                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Shop bill
                                    </label>
                                    <input
                                        required
                                        name='pay'
                                        type='text'
                                        defaultValue={0}
                                        placeholder='pay'
                                        className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                </div>
                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Tax
                                    </label>
                                    <input
                                        name='tax'
                                        type='text'
                                        defaultValue={0}
                                        placeholder='tax'
                                        className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                </div>

                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Electricity Bill
                                    </label>
                                    <input
                                        name='electricity'
                                        type='text'
                                        defaultValue={0}
                                        placeholder='Electricity bill'
                                        className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                </div>

                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Date
                                    </label>
                                    <input
                                        required
                                        name='date'
                                        type='date'
                                        className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                </div>

                                <button
                                    className="bg-primary text-white px-4 py-2 my-2 rounded"
                                >
                                    {
                                        loading ? "Loading..." : "Submit"
                                    }

                                </button>
                                <button
                                    className="bg-danger ml-2 text-white px-4 py-2 my-2 rounded"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ShopModel;
