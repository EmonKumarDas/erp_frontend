import React, { useContext } from 'react';
import { ApiContext } from '../ApiProvider/ApiProvider';

const BillModal = ({ customarbill }) => {
    const { isModalOpen, setIsModalOpen, handleUpdatePaybill, loading } = useContext(ApiContext);

    const UpdatePaybill = (e) => {
        handleUpdatePaybill(e, customarbill)
    }
    
    return (
        <div>
            {isModalOpen ? (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-boxdark rounded-lg shadow-lg p-6">
                            <form onSubmit={UpdatePaybill}>
                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Name
                                    </label>
                                    <input
                                        required
                                        name='name'
                                        defaultValue={customarbill?.name}
                                        disabled
                                        type='text'
                                        placeholder='Name'
                                        className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                </div>
                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Number
                                    </label>
                                    <input
                                        required
                                        defaultValue={customarbill?.phonenumber}
                                        disabled
                                        name='number'
                                        type='text'
                                        placeholder='Number'
                                        className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                </div>
                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Pay
                                    </label>
                                    <input
                                        required
                                        name='advance'
                                        defaultValue={customarbill?.advance}
                                        type='text'
                                        placeholder='pay'
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

export default BillModal;
