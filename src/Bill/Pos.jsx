import React, { useContext, useState, useRef } from 'react'; // Import useRef
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumb';
import { ApiContext } from '../ApiProvider/ApiProvider';
import CashMemo from './CashMemo';
import { ToastContainer } from 'react-toastify';
import CircleLoader from '../components/CircleLoader';

const Pos = () => {
    const { loading, handleBillcreating } = useContext(ApiContext);
    const [barcode, setBarcode] = useState('');
    const [productData, setProductData] = useState(null);
    const buttonRef = useRef(null); // Create a ref for the button

    const handleBarcodeScan = async (e) => {
        e.preventDefault(); // Prevent form submission and page reload

        try {
            const response = await fetch(`http://localhost:5000/getProductsById/${barcode}`);
            if (response.ok) {
                const data = await response.json();
                setProductData(data);
                buttonRef.current.click();

            }

            else {

            }
        } catch (error) {

        }
    };
    const handleBillcreates = (e) => {
      
        handleBillcreating(e)

    }
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Create Bill' />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <div className='rounded-sm border flex-1 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                        <h3 className='font-medium text-black dark:text-white'>Create Bill with pos</h3>
                    </div>

                    <form className='flex flex-col gap-5.5 p-6.5'>
                        <label className='block text-black dark:text-white'>Bar Code</label>
                        <input
                            name='barcode'
                            type='number'
                            placeholder='BarCode'
                            className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                        />
                        <button
                            type="submit"
                            onClick={handleBarcodeScan}
                            ref={buttonRef}
                        >
                        </button>

                    </form>

                    <form onSubmit={handleBillcreates} className='flex flex-col gap-5.5 p-6.5'>
                        <div>
                            <label className='mb-3 block text-black dark:text-white'>Product Name</label>
                            <input
                                disabled
                                required
                                name='productname'
                                type='text'
                                value={productData?.productname}
                                placeholder='productname'
                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'

                            />
                        </div>

                        <div>
                            <label className='mb-3 block text-black dark:text-white'>company Name</label>
                            <input
                                required
                                disabled
                                name='company'
                                type='text'
                                value={productData?.companyName}
                                placeholder='company'
                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            />
                        </div>

                        <div>
                            <label className='mb-3 block text-black dark:text-white'>watt</label>
                            <input
                                disabled
                                required
                                name='watt'
                                type='number'
                                value={productData?.watt}
                                placeholder='watt'

                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            />
                        </div>

                        <div>
                            <label className='mb-3 block text-black dark:text-white'>Product's price</label>
                            <input
                       
                                required
                                name='PurchasePrice'
                                type='number'
                                placeholder='Product price'

                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            />
                        </div>
                        <div>
                            <label className='block text-black dark:text-white'>Discount</label>
                            <input
                                name='Discount'
                                type='number'
                                placeholder='Discount'
                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            />
                        </div>
                        <div>
                            <label className='mb-3 block text-black dark:text-white'>Quantity</label>
                            <input
                                required
                                defaultValue={1}
                                name='quantity'
                                type='number'
                                placeholder='Quantity'
                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            />
                        </div>

                        <button
                            className='inline-flex items-center justify-center rounded-xl bg-[#3c50e0] py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
                        >
                            {loading ? <CircleLoader></CircleLoader> : 'Submit'}
                        </button>
                    </form>
                </div>
                <CashMemo></CashMemo>
            </div>

            <ToastContainer />
        </DefaultLayout>
    );
};

export default Pos;
