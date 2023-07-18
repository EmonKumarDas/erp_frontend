import React, { useContext, useEffect, useState } from "react";
import CircleLoader from "../components/CircleLoader";
import DefaultLayout from "../layout/DefaultLayout";
import { ApiContext } from "../ApiProvider/ApiProvider";
import Breadcrumb from "../components/Breadcrumb";
import { useParams } from 'react-router-dom';

function ShowShopDetails() {
    const { loading } = useContext(ApiContext);
    const { id } = useParams();
    const [shopDetails, setShopDetails] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/getShopById/${id}`)
            .then(response => {
                return response.json();
            })
            .then(res => {
                console.log(res)
                setShopDetails(res)
            });
    }, [])
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Shop details' />
            <div className="overflow-x-auto">
                <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className='border-b border-stroke py-4 dark:border-strokedark'>
                        <h3 className='font-medium text-black dark:text-white'>
                            Shop Details
                        </h3>
                    </div>
                    {
                        loading ? <CircleLoader></CircleLoader> : <div className="overflow-x-auto mt-2">
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 text-left">#</th>
                                        <th className="px-4 text-left">Shop Name</th>
                                        <th className="px-4 text-left">Location</th>
                                        <th className="px-4 text-left">Shop's rent</th>
                                        <th className="px-4 text-left">Tax</th>
                                        <th className="px-4 text-left">Electricity</th>
                                        <th className="px-4 text-left">Date</th>
                                        <th className="px-4 text-left">Total</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {shopDetails?.map((product, index) => (
                                        <tr
                                            key={product._id}
                                            className="bg-gray-100"

                                        >

                                            <td className="border px-4 py-2">{index + 1}</td>
                                            <td className="border px-4 py-2">{product?.shopname}</td>
                                            <td className="border px-4 py-2">{product?.location}</td>
                                            <td className="border px-4 py-2">{product?.pay}</td>
                                            <td className="border px-4 py-2">{product?.tax}</td>
                                            <td className="border px-4 py-2">{product?.electricity}</td>
                                            <td className="border px-4 py-2">{product?.date}</td>
                                            <td className="border px-4 py-2">{product?.total}</td>

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

export default ShowShopDetails;
