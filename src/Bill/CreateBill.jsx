import React, { useContext } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumb';
import { ApiContext } from '../ApiProvider/ApiProvider';
import CashMemo from './CashMemo';
import { ToastContainer } from 'react-toastify';

const CreateBill = () => {
    const { data, handleCodeChange, selectedCode, selectedProduct,
        handleProductChange, codeData, ProductData, handleBillcreating } = useContext(ApiContext);

    const handleProdcutCodeChange = (e) => {
        handleCodeChange(e)

    }
    const handleProduct = (e) => {
        handleProductChange(e)

    }

    const handleBillcreate = (e) => {
        handleBillcreating(e)
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName='Create Bill' />
            {/* <!-- Input Fields --> */}
            <div className='grid lg:grid-cols-2 grid-cols-1'>
                <div className='rounded-sm  border flex-1 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                        <h3 className='font-medium text-black dark:text-white'>
                            Create Bill
                        </h3>
                    </div>
                    <form onSubmit={handleBillcreate} className='flex flex-col gap-5.5 p-6.5'>

                        <div>
                            <label className='mb-3 block text-black dark:text-white'>
                                Product's Code
                            </label>
                            <select
                                required
                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                name="code"
                                value={!selectedCode? selectedProduct?.barcode:selectedCode}
                                onChange={handleProdcutCodeChange}
                            >
                                <option selected>Select Product's Code</option>
                                {data.map((code) => (
                                    <option key={code.barcode} value={code.barcode}>
                                        {code.barcode}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className='mb-3 block text-black dark:text-white'>
                                Product's Name
                            </label>
                            <select
                                required
                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                name="productname"
                                value={!selectedProduct ? codeData?.productname : selectedProduct}
                                onChange={handleProduct}
                            >
                                <option selected>Select Product's Name</option>
                                {data.map((product) => (
                                    <option key={product.productname} value={product.productname}>
                                        {product.productname}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className='mb-3 block text-black dark:text-white'>
                                Watt
                            </label>
                            <select
                                required
                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                name="watt"
                               
                            >
                                <option selected>Select Watt </option>
                                {data.map((product) => (
                                    <option key={product.watt} value={product.watt}>
                                        {product.watt}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className='mb-3 block text-black dark:text-white'>
                                Purchased Product's Price
                            </label>
                            <input

                                required
                                name='PurchasePrice'
                                defaultValue={!codeData?.singleproductprice ? ProductData?.singleproductprice : codeData?.singleproductprice}
                                type='text'
                                placeholder='Purchased Product Price'
                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'

                            />
                        </div>
                        <label className='block text-black dark:text-white'>
                            Discount
                        </label>
                        <input
                            name='Discount'
                            type='number'
                            placeholder='Discount'
                            className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'

                        />

                        {/* <!-- Select input --> */}
                        <div>
                            <label className='mb-3 block text-black dark:text-white'>
                                Quantity
                            </label>
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
                        >Submit</button>


                    </form>
                </div>
                <CashMemo></CashMemo>
            </div>
            <ToastContainer/>
        </DefaultLayout>
    );
};

export default CreateBill;