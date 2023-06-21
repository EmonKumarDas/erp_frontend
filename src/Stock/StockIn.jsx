import React, { useContext } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumb";
import { ApiContext } from "../ApiProvider/ApiProvider";
import CircleLoader from "../components/CircleLoader";

function StockIn() {
    const { stockIn, loading } = useContext(ApiContext);
  
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Stock In' />
            <div className="overflow-x-auto">
                <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className='border-b border-stroke py-4 dark:border-strokedark'>
                        <h3 className='font-medium text-black dark:text-white'>
                            Stock In
                        </h3>
                    </div>
                    {loading ? (
                        <CircleLoader />
                    ) : (
                        <div className="overflow-x-auto mt-2">
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 text-left">#</th>
                                        <th className="px-4 text-left">productname</th>
                                        <th className="px-4 text-left">watt</th>
                                        <th className="px-4 text-left">quantity</th>
                                        <th className="px-4 text-left">companyname</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {stockIn.map((product, index) => (
                                        <tr
                                            key={product?.id}
                                            className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
                                        >
                                            <td className="border px-4 py-2">{index + 1}</td>
                                            <td className="border px-4 py-2">{product?.productname}</td>
                                            <td className="border px-4 py-2">{product?.watt}</td>
                                            <td className="border px-4 py-2">{product?.quantity}</td>
                                            <td className="border px-4 py-2">{product?.companyname}</td>
                                           
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
               
            </div>
        </DefaultLayout>

    );
}

export default StockIn;
