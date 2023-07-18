import React, { useEffect, useContext } from "react";
import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import CircleLoader from "../../components/CircleLoader";
import { ApiContext } from "../../ApiProvider/ApiProvider";
import StockData from "../Dashboard/StockInData";

const AddProduct = () => {
  const { handleGetProduct, allcompany, loading } = useContext(ApiContext);

  const handleProduct = (e) => {
    handleGetProduct(e);
  }

  // ---------------------- bar code -------------------------------
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Add Product' />
      {/* <!-- Input Fields --> */}
      <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4'>
        <div className='rounded-sm  border flex-1 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
            <h3 className='font-medium text-black dark:text-white'>
              Add Product
            </h3>
          </div>
          <form onSubmit={handleProduct} className='flex flex-col gap-5.5 p-6.5'>
            <div>
              {
                <div>
                  <label className='mb-3 block text-black dark:text-white'>
                    Product's Code
                  </label>
                  <input

                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                    placeholder="Product's Code"
                    type="text"
                    name="code"
                  />
                </div>
              }
            </div>
            <div>
              <label className='mb-3 block text-black dark:text-white'>
                Product's Name
              </label>
              <input
                required
                name='productname'
                type='text'
                placeholder='Product Name'
                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
              />
            </div>
            <div>
              <label className='mb-3 block text-black dark:text-white'>
                WATT
              </label>
              <input

                name='watt'
                type='text'
                defaultValue={0}
                placeholder='Watt'
                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
              />
            </div>


            <div>
              <label className='mb-3 block text-black dark:text-white'>
                Company
              </label>
              <select
                required
                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                name="companyName"
              >
                <option selected>Select Company</option>
                {allcompany.map((company) => (
                  <option value={company.comapanyname}>
                    {company.comapanyname}
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
                type="number"
                name='PurchasePrice'
                placeholder='Purchased Product Price'
                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                onKeyPress={(event) => {
                  const keyCode = event.which || event.keyCode;
                  const keyValue = String.fromCharCode(keyCode);
                  if (/\D/.test(keyValue)) { // Allow only numbers
                    event.preventDefault();
                  }
                }}
              />
            </div>
            <div>
              <label className='mb-3 block text-black dark:text-white'>
                Advance
              </label>
              <input
                type="number"
                name="advance"
                placeholder='advance'
                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                onKeyPress={(event) => {
                  const keyCode = event.which || event.keyCode;
                  const keyValue = String.fromCharCode(keyCode);
                  if (/\D/.test(keyValue)) { // Allow only numbers
                    event.preventDefault();
                  }
                }}
              />
            </div>
            {/* <!-- Select input --> */}
            <div>
              <label className='mb-3 block text-black dark:text-white'>
                Quantity
              </label>
              <input
                required
                name='quantity'
                type='number'
                placeholder='Quantity'
                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
              />
            </div>
            {
              loading ? <CircleLoader></CircleLoader> :
                <button
                  className='inline-flex items-center justify-center rounded-full bg-[#3c50e0] py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
                >Submit</button>
            }

          </form>
        </div>
        <StockData></StockData>
      </div>
    </DefaultLayout>
  );
};

export default AddProduct;





