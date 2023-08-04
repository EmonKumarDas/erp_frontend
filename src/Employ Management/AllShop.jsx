import React, { useContext, useState } from "react";
import ShopModel from "./ShopModel";
import { ApiContext } from "../ApiProvider/ApiProvider";
import DefaultLayout from "../layout/DefaultLayout";
import CircleLoader from "../components/CircleLoader";
import { Link } from "react-router-dom";


function AllShop() {
    const { loading, shop, setIsModalOpen, handleshopDelete } = useContext(ApiContext);
    const [shopData, setShopData] = useState([]);
    const handleShopBillPay = (id) => {
        setIsModalOpen(true);
        const shp = shop.find((shops) => shops._id === id);
        setShopData(shp)
    };
    const ClickDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            handleshopDelete(id);
        }
    }
    return (
        <DefaultLayout>
            <div className="overflow-x-auto">
                <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className='border-b border-stroke py-4 dark:border-strokedark'>
                        <h3 className='font-medium text-black dark:text-white'>
                            Shop Mangement
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

                                        <th className="px-4 text-left">Action</th>
                                        <th className="px-4 text-left"></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {shop?.map((product, index) => (
                                        <tr
                                            key={product._id}
                                            className="bg-gray-100"

                                        >

                                            <td className="border px-4 py-2">{index + 1}</td>
                                            <td className="border px-4 py-2">{product.shopname}</td>
                                            <td className="border px-4 py-2">{product.location}</td>

                                            {loading ? (
                                                <CircleLoader />
                                            ) : (
                                                <td
                                                    onClick={() => ClickDelete(product._id)}
                                                    className="border hover:bg-black cursor-pointer font-extrabold text-danger px-4 py-2"
                                                >
                                                    DELETE
                                                </td>
                                            )}
                                            <td onClick={() => handleShopBillPay(product?._id)} className="border hover:bg-black cursor-pointer font-extrabold text-primary px-4 py-2">
                                                EDIT
                                            </td>


                                            <Link to={`/shop_details/${product?._id}`}>

                                                <td className="border hover:bg-black cursor-pointer font-extrabold text-success px-4 py-2">
                                                    View
                                                </td>

                                            </Link >
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                <ShopModel shops={shopData}></ShopModel>
            </div>
        </DefaultLayout>
    );
}

export default AllShop;
