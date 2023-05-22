import React, { useContext } from 'react';
import { ApiContext } from '../ApiProvider/ApiProvider';

const Modal = ({ employData }) => {
    const { isModalOpen, setIsModalOpen, handlePayBill, loading } = useContext(ApiContext);

    const handlePayBillform = (e) => {
        handlePayBill(e)

    }
    return (
        <div>
            {isModalOpen ? (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-boxdark rounded-lg shadow-lg p-6">
                            <form onSubmit={handlePayBillform}>
                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Name
                                    </label>
                                    <input
                                        required
                                        name='name'
                                        defaultValue={employData?.name}
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
                                        defaultValue={employData?.number}
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
                                        name='pay'
                                        type='text'
                                        placeholder='pay'
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

export default Modal;
