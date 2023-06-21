import React, { useContext } from "react";
import { ApiContext } from "../ApiProvider/ApiProvider";
import CircleLoader from "./CircleLoader";

function Table() {
    const { data, loading, handleProductDelete } = useContext(ApiContext);

    const ClickDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            handleProductDelete(id);
        }
    }
    return (
        <div className="overflow-x-auto">
            <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
                <div className='border-b border-stroke py-4 dark:border-strokedark'>
                    <h3 className='font-medium text-black dark:text-white'>
                        All Products
                    </h3>
                </div>
                {
                    loading ? <CircleLoader></CircleLoader> : <div className="overflow-x-auto mt-2">
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 text-left">#</th>
                                    <th className="px-4 text-left">Product</th>
                                    <th className="px-4 text-left">Watt</th>
                                    <th className="px-4 text-left">Stock In</th>
                                    <th className="px-4 text-left">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.slice(0, 10).map((product, index) => (
                                    <tr
                                        key={product.id}
                                        className={
                                            product.id % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                                        }
                                    >
                                        {/* <td className="border px-4 py-2">{product.barCode}</td> */}
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{product.productname}</td>
                                        <td className="border px-4 py-2">{product.watt}</td>
                                        <td className="border px-4 py-2">{product.quantity}</td>
                                        <td className="border px-4 py-2">{product.purchaseprice}</td>

                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    );
}

export default Table;
