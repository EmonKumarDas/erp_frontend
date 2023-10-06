import CircleLoader from "../../components/CircleLoader";
import { useContext, useState } from "react";
import { ApiContext } from "../../ApiProvider/ApiProvider";
import ProductModel from "../Product_management/ProductModel";
import { Link } from "react-router-dom";

function Creditor() {
    const { data, loading, handleProductDelete } = useContext(ApiContext);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [product, setProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleProductBillPay = (id) => {
        setIsModalOpen(true);
        const newProduct = data.find((product) => product._id === id);
        setProduct(newProduct);
    };

    const clickDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            handleProductDelete(id);
        }
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="overflow-x-auto">
            <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 dark:border-strokedark">
                    <h3 className="text-black dark:text-white text-xl font-bold"> পাওনাদার</h3>
                </div>
                {loading ? (
                    <CircleLoader />
                ) : (
                    <div className="overflow-x-auto mt-2">
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    {/* <th className="px-4 text-sm text-left">#</th> */}
                                    <th className="px-4 text-sm text-left">Shop Name</th>
                                    <th className="px-4 text-sm text-left">Product</th>
                                    <th className="px-4 text-sm text-left">Watt</th>
                                    <th className="px-4 text-sm text-left">Import</th>
                                    <th className="px-4 text-sm text-left">Purchase Price</th>
                                    <th className="px-4 text-sm text-left">Total Price</th>
                                    <th className="px-4 text-sm text-left">Paid</th>
                                    <th className="px-4 text-sm text-left">Remaining</th>
                                    <th className="px-4 text-sm text-left">Month</th>
                                    <th className="px-4 text-sm text-left">Company Name</th>
                                    <th className="px-4 text-sm text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems?.map((shopGroup, index) => (
                                    <>

                                        <tr key={shopGroup._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                                            <td className="border px-4 py-2" rowSpan={shopGroup.products.length}>
                                                {shopGroup.shopname}
                                            </td>
                                            {shopGroup.products[0] && (
                                                <>
                                                    <td className="border px-4 py-2">{shopGroup.products[0].productname}</td>
                                                    <td className="border px-4 py-2">{shopGroup.products[0].watt}</td>
                                                    <td className="border px-4 py-2">{shopGroup.products[0].quantity}</td>
                                                    <td className="border px-4 py-2">{shopGroup.products[0].PurchasePrice}</td>
                                                    <td className="border px-4 py-2" rowSpan={shopGroup.products.length}>{shopGroup.totalAmount}</td>
                                                    <td className="border px-4 py-2" rowSpan={shopGroup.products.length}>{shopGroup.advance}</td>
                                                    <td className="border px-4 py-2" rowSpan={shopGroup.products.length}>{shopGroup.totalAmount - shopGroup.advance}</td>
                                                    <td className="border px-4 py-2" rowSpan={shopGroup.products.length}>{shopGroup.month}</td>
                                                    <td className="border px-4 py-2" rowSpan={shopGroup.products.length}>{shopGroup.products[0].companyName}</td>
                                                    <td
                                                        onClick={() => clickDelete(shopGroup._id)}
                                                        className="border hover:bg-black cursor-pointer font-extrabold text-danger px-4 py-2"
                                                        rowSpan={shopGroup.products.length}>
                                                        DELETE
                                                    </td>
                                                    <td
                                                        onClick={() => handleProductBillPay(shopGroup._id)}
                                                        className="border hover:bg-black cursor-pointer font-extrabold text-primary px-4 py-2"
                                                        rowSpan={shopGroup.products.length}>
                                                        EDIT
                                                    </td>

                                                    <td className="border px-4 py-2 hover:bg-black font-extrabold text-success"
                                                        rowSpan={shopGroup.products.length}
                                                    >
                                                        <Link className="cursor-pointer" to={`/details/products/${shopGroup._id}`}
                                                        >Details</Link>
                                                    </td>

                                                </>
                                            )}
                                        </tr>
                                        {shopGroup.products.slice(1).map((product, productIndex) => (
                                            <tr
                                                key={`${shopGroup._id}_${productIndex}`}
                                                className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
                                            >
                                                <td className="border px-4 py-2">{product.productname}</td>
                                                <td className="border px-4 py-2">{product.watt}</td>
                                                <td className="border px-4 py-2">{product.quantity}</td>
                                                <td className="border px-4 py-2">{product.PurchasePrice}</td>
                                            </tr>
                                        ))}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {/* Pagination Buttons */}
                <div className="flex justify-center mt-4">
                    <button
                        className="px-4 py-2 cursor-pointer bg-meta-7 mx-2 bg-blue-500 text-white font-bold rounded"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        className="px-4 py-2 cursor-pointer bg-primary mx-2 bg-blue-500 text-white font-bold rounded"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
            <ProductModel product={product} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>

    );
}

export default Creditor;
