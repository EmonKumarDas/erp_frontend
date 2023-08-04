import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../ApiProvider/ApiProvider";
import CircleLoader from "../components/CircleLoader";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumb";


const ITEMS_PER_PAGE = 10;

const ReturnProducts = () => {
    const { ReturnProducts, loading } = useContext(ApiContext);
    const filteredData = ReturnProducts.filter(
        (entry) => entry.newbalance !== 0 && entry.newbalance !== null
    );

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const displayedData = filteredData.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Return Products" />
            <div className="overflow-x-auto my-5">
                <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">Return Products</h3>
                    </div>
                    {loading ? (
                        <CircleLoader />
                    ) : (
                        <div className="overflow-x-auto mt-2">
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 text-left">#</th>
                                        <th className="px-4 text-left">Product's Name</th>
                                        <th className="px-4 text-left">Watt</th>
                                        <th className="px-4 text-left">Company</th>
                                        <th className="px-4 text-left">Quantity</th>
                                        <th className="px-4 text-left">Price</th>
                                        <th className="px-4 text-left">TotalAmount</th>
                                        <th className="px-4 text-left">Date</th>
                                        <th className="px-4 text-left"></th>
                                        <th className="px-4 text-left"></th>
                                        <th className="px-4 text-left"></th>
                                    </tr>
                                </thead>
                                {!loading && (
                                    <tbody>
                                        {ReturnProducts.map((product, index) => (
                                            <tr
                                                key={product?._id}
                                                className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                                                <td className="border px-4 py-2">{startIndex + index + 1}</td>
                                                <td className="border px-4 py-2">{product?.product}</td>
                                                <td className="border px-4 py-2">{product?.watt}</td>
                                                <td className="border px-4 py-2">{product?.company}</td>
                                                <td className="border px-4 py-2">{product?.quantity}</td>
                                                <td className="border px-4 py-2">{product?.price}%</td>
                                                <td className="border px-4 py-2">{product?.TotalAmount}</td>
                                                <td className="border px-4 py-2">{product?.date}</td>
                                               
                                                <td className="border hover:bg-black cursor-pointer font-extrabold text-warning px-4 py-2">
                                                    <Link to={`/bills/${product?._id}`}>View</Link>
                                                </td>
                                                <td className="border hover:bg-black cursor-pointer font-extrabold text-warning px-4 py-2" onClick={() => handlebillEdit(product?._id)}>Edit</td>
                                                <td className="border hover:bg-black cursor-pointer font-extrabold text-warning px-4 py-2">Call</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    )}
                    {!loading && (
                        <div className="mt-4 flex justify-center">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`mx-1 bg-secondary px-4 py-2  ${currentPage === index + 1 ? "bg-blue-500 text-black-2" : "bg-gray-300"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ReturnProducts;
