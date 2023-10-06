import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../../ApiProvider/ApiProvider";
import CircleLoader from "../../components/CircleLoader";
import BillModal from "../../Bill/BillModal";

const ITEMS_PER_PAGE = 10;

const Credit = () => {
  const { customarbills, loading, setIsModalOpen, scode } = useContext(ApiContext);
  const [customarbill, setCustomarbill] = useState([]);

  const handlebillEdit = (id) => {
    setIsModalOpen(true);
    const CustomarBill = customarbills.find((customar) => customar._id === id);
    setCustomarbill(CustomarBill);
  };

  const filteredData = customarbills.filter(
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
    <>
      <div className="overflow-x-auto my-5">
        <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 dark:border-strokedark">
            <h3 className="text-black dark:text-white text-xl font-bold">দেনাদার</h3>
          </div>
          {loading ? (
            <CircleLoader />
          ) : (
            <div className="overflow-x-auto mt-2">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 text-left">#</th>
                    <th className="px-4 text-left">Shop's Name</th>
                    <th className="px-4 text-left">Customer's Name</th>
                    <th className="px-4 text-left">Customer's Number</th>
                    <th className="px-4 text-left">Quantity</th>
                    <th className="px-4 text-left">Total</th>
                    <th className="px-4 text-left">Discount</th>
                    <th className="px-4 text-left">Advance</th>
                    <th className="px-4 text-left">Date</th>
                    <th className="px-4 text-left">Remaining</th>
                    <th className="px-4 text-left"></th>
                    <th className="px-4 text-left"></th>
                    <th className="px-4 text-left"></th>
                  </tr>
                </thead>
                {!loading && (
                  <tbody>

                    {displayedData.map((product, index) => (
                      <tr
                        key={product?._id}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
                      >
                        <td className="border px-4 py-2">{startIndex + index + 1}</td>
                        <td className="border px-4 py-2">{product?.shopname}</td>
                        <td className="border px-4 py-2">{product?.name}</td>
                        <td className="border px-4 py-2">{product?.phonenumber}</td>
                        <td className="border px-4 py-2">
                          {displayedData[0].products.length}
                        </td>
                        <td className="border px-4 py-2">{scode === "false" ? product?.total / 2 : product?.total}</td>
                        <td className="border px-4 py-2">{product?.get_discount}%</td>
                        <td className="border px-4 py-2">{scode === "false" ? product?.advance / 2 : product?.advance}</td>
                        <td className="border px-4 py-2">{product?.date}</td>
                        {
                          scode === "false" ? <td
                            className={`border px-4 py-2 ${product?.newbalance / 2 ? "bg-danger" : ""
                              }`}
                          >
                            {product?.newbalance / 2}
                          </td> : <td
                            className={`border px-4 py-2 ${product?.newbalance ? "bg-danger" : ""
                              }`}
                          >
                            {product?.newbalance}
                          </td>
                        }

                        <td className="border px-4 py-2 hover:bg-black cursor-pointer font-extrabold text-warning">
                          <Link to={`/bills/${product?._id}`}>Print</Link>
                        </td>
                        <td className="border px-4 py-2 hover:bg-black font-extrabold text-success">
                          <Link className="cursor-pointer" to={`/product/details/${product._id}`}>Details</Link>
                        </td>

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
        <BillModal customarbill={customarbill} />
      </div>
    </>
  );
};

export default Credit;
