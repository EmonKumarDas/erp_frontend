import React, { useContext } from 'react';
import { ApiContext } from '../ApiProvider/ApiProvider';

function CashMemo() {
    const { handleBillMemo, loading } = useContext(ApiContext)
    const products = JSON.parse(localStorage.getItem('billData'));
    const total = products?.reduce((acc, product) => acc + product.total, 0);
    if (!Array.isArray(products) || products.length === 0) {
        return <p>No bills to display.</p>;
    }

    const handleBill = (e) => {
        handleBillMemo(e, products, total)
    }
    const handleDelete = (barCode) => {
        // Retrieve existing data from local storage
        let existingData = JSON.parse(localStorage.getItem('billData'));

        // If there's no existing data, create an empty array
        if (!Array.isArray(existingData)) {
            existingData = [];
        }

        // Filter out the item with the matching barcode
        const updatedData = existingData.filter((item) => item.barCode !== barCode);

        // Save updated data to local storage
        localStorage.setItem('billData', JSON.stringify(updatedData));


    };

    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
            <h2 className="mb-4 text-2xl font-semibold leading-tight">CashMemo</h2>
            <form onSubmit={handleBill} className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input type="text" name="name" placeholder='Customar Name' required className="border dark:bg-black border-gray-300 p-2 rounded-md" />
                    <input type="text" name="phonenumber" placeholder='Customar number' required className="border dark:bg-black border-gray-300 p-2 rounded-md" />
                    <input type="text" name="location" placeholder='Address' className="border dark:bg-black border-gray-300 p-2 rounded-md" />
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
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody>


                            {products.map((product, index) => (
                                <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                                    <td className="p-3"><p>{index + 1}</p></td>
                                    <td className="p-3"><p>{product.productname}</p></td>
                                    <td className="p-3"><p>{product.quantity}</p></td>
                                    <td className="p-3"><p>{product.SellPrice}</p></td>
                                    <td className="p-3"><p>{product.watt}</p></td>
                                    <td className="p-3"><p>{product.total}</p></td>
                                    <td onClick={() => handleDelete(product.barCode)} className="p-3 text-right">
                                        <span className="px-3 bg-danger text-white cursor-pointer py-1 font-semibold rounded-md dark:bg-emerald-400 dark:text-gray-900">
                                            <span>Delete</span>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="5" className="text-right font-bold py-2 px-4">Total:</td>
                                <td className="py-2 font-bold">{total}</td>
                            </tr>
                            <tr>
                                <td colSpan="5" className="text-right font-bold py-2 px-4">Advance:</td>
                                <td className="py-2 text-white font-bold">
                                    <input type="number" name='advance' className="border text-black border-gray-300 p-2 rounded-md w-full" />
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

export default CashMemo;


