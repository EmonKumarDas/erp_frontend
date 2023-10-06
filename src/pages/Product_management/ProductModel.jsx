import React, { useContext } from 'react';
import { ApiContext } from '../../ApiProvider/ApiProvider';

const ProductModel = ({ product, setIsModalOpen, isModalOpen }) => {
    const { handle_comapany_bill_pay, loading } = useContext(ApiContext);
    const product_id = product?._id;
    
    const handleshopPayBillform = (e) => {
        handle_comapany_bill_pay(e, product_id);
        setIsModalOpen(false)
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
                                        Product Name
                                    </label>
                                    <input
                                        required

                                        name='productname'
                                        defaultValue={product?.shopname
                                        }
                                        type='text'
                                        placeholder='productName'
                                        className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                </div>


                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Remaining
                                    </label>
                                    <input
                                        name='advance'
                                        type='text'
                                        defaultValue={product?.remaining}
                                        placeholder='advance'
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
                                <br></br>
                                <div>
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
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ProductModel;
