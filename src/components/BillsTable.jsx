import React, { useContext } from "react";
import { ApiContext } from "../ApiProvider/ApiProvider";
import CircleLoader from "./CircleLoader";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "./Breadcrumb";
import { Link } from "react-router-dom";

function BillsTable() {
    const { customarbills, loading } = useContext(ApiContext);
    return (
        <DefaultLayout>
            <Breadcrumb pageName='All Bills' />
            <div className="overflow-x-auto">
                <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className='border-b border-stroke py-4 dark:border-strokedark'>
                        <h3 className='font-medium text-black dark:text-white'>
                            All Bills
                        </h3>
                    </div>
                    {
                        loading ? <CircleLoader></CircleLoader> : <div className="overflow-x-auto mt-2">
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 text-left">#</th>
                                        <th className="px-4 text-left">Customar Name</th>
                                        <th className="px-4 text-left">Customar Number</th>
                                        <th className="px-4 text-left">Advance</th>
                                        <th className="px-4 text-left">Date</th>
                                        <th className="px-4 text-left">Remaining</th>
                                        <th className="px-4 text-left"></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {customarbills.map((product, index) => (
                                        <tr
                                            key={product.id}
                                            className={
                                                product.id % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                                            }
                                        >
                            
                                            <td className="border px-4 py-2">{index + 1}</td>
                                            <td className="border px-4 py-2">{product.name}</td>
                                            <td className="border px-4 py-2">{product.phonenumber}</td>
                                            <td className="border px-4 py-2">{product.advance}</td>
                                            <td className="border px-4 py-2">{product.date}</td>
                                            <td className="border px-4 py-2">{product.newbalance}</td>
                                            {
                                                loading ? <CircleLoader></CircleLoader> :
                                                    <Link to={`/bills/${product._id}`} className="ml-2">
                                                        <td className="border hover:bg-black cursor-pointer font-extrabold text-warning px-4 py-2">View</td>
                                                    </Link>
                                            }
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </DefaultLayout>
    );
}

export default BillsTable;
