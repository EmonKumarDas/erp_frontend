import React, { useContext } from 'react';
import { ApiContext } from '../../ApiProvider/ApiProvider';
import { userContext } from '../Authentication/AuthProvider';

function CreateOtherProductBill() {
    const { shop, loading, handleOtherProductBill } = useContext(ApiContext);
    const { user } = useContext(userContext)
    const email = user?.email;
    const products = JSON.parse(localStorage.getItem('newProducts'));
    if (!Array.isArray(products) || products.length === 0) {
        return <p>No bills to display.</p>;
    }

    // Function to calculate the sum of amounts
    function calculateTotalAmount(products) {
        let totalAmount = 0;
        for (const product of products) {
            totalAmount += product.amount;
        }
        return totalAmount;
    }

    // Call the function with the products array
    const totalAmount = calculateTotalAmount(products);

    const handleCompanyProducts = (e) => {
        handleOtherProductBill(e, products, totalAmount, email)
    }

    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
            <h2 className="mb-4 text-2xl font-semibold leading-tight">CashMemo</h2>
            <form onSubmit={handleCompanyProducts} className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                <input type="text" name="name" placeholder='Customar Name' required className="border dark:bg-black border-gray-300 p-2 rounded-md" />
                    <input type="text" name="phonenumber" placeholder='Customar number' required className="border dark:bg-black border-gray-300 p-2 rounded-md" />
                    <input type="text" name="location" placeholder='Address' className="border dark:bg-black border-gray-300 p-2 rounded-md" />
                    <select
                        required
                        className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        name="shopname"

                    >
                        <option selected disabled>Select Shop</option>
                        {shop.map((product) => (
                            <option >
                                {product?.shopname}
                            </option>
                        ))}
                    </select>

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
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col className="w-24" />
                        </colgroup>
                        <thead className="dark:bg-gray-700">
                            <tr className="text-left">
                                <th className="p-3">#</th>
                                <th className="p-3">Product Name</th>
                                <th className="p-3">Quantity</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Watt</th>
                                <th className="p-3">Taka</th>


                            </tr>
                        </thead>
                        <tbody>


                            {products?.map((product, index) => (
                                <tr key={product?.id} className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                                    <td className="p-3"><p>{index + 1}</p></td>
                                    <td className="p-3"><p>{product.productname}</p></td>
                                    <td className="p-3"><p>{product.quantity}</p></td>
                                    <td className="p-3"><p>{product.PurchasePrice}</p></td>
                                    <td className="p-3"><p>{product.watt}</p></td>
                                    <td className="p-3"><p>{product.quantity * product.PurchasePrice}</p></td>

                                </tr>
                            ))}
                        </tbody>
                        <tfoot>

                            <tr>
                                <td colSpan="5" className="text-right font-bold py-2 px-4">Total:</td>
                                <td className="py-2 font-bold">{totalAmount}</td>
                            </tr>

                            <tr>
                                <td colSpan="5" className="text-right font-bold py-2 px-4">Advance:</td>
                                <td className="py-2 text-white font-bold">
                                    <input type="number" name='advance' defaultValue={0} className="border text-black border-gray-300 p-2 rounded-md w-full" />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <button className="w-full text-center bg-[#3c50e0] text-white p-3 mt-4 font-bold text-xl rounded-md hover:bg-[#161830c9]">{loading ? "Wait.." : "Create"}</button>
            </form>
        </div >
    );
}

export default CreateOtherProductBill;