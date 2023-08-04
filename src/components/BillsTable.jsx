import React, { useContext, useState } from "react";
import { ApiContext } from "../ApiProvider/ApiProvider";
import CircleLoader from "./CircleLoader";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "./Breadcrumb";
import { Link } from "react-router-dom";
import BillModal from "../Bill/BillModal";

function BillsTable() {
  const { customarbills, setIsModalOpen, loading } = useContext(ApiContext);
  const [customarbill, setCustomarbill] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const billsPerPage = 10; // Set the number of bills to display per page (you can adjust this as needed)

  const handlebillEdit = (id) => {
    setIsModalOpen(true);
    const customarBill = customarbills.find((customar) => customar._id === id);
    setCustomarbill(customarBill);
  };

  const handlecall = (phoneNumber) => {
    const message = `Hello! ${phoneNumber}.`;

    // Open the user's default messaging app with the pre-filled message
    window.open(`sms:${phoneNumber}?body=${encodeURIComponent(message)}`);
  };

  // Calculate the current bills to display based on pagination
  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = customarbills.slice(indexOfFirstBill, indexOfLastBill);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Sells" />
      <div className="overflow-x-auto">
        <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">All Sells</h3>
          </div>
          {loading ? (
            <CircleLoader />
          ) : (
            <>
              <div className="overflow-x-auto mt-2">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="px-4 text-left">#</th>
                      <th className="px-4 text-left">Shop's Name</th>
                      <th className="px-4 text-left">Customer's Name</th>
                      <th className="px-4 text-left">Customer's Number</th>
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
                  <tbody>
                    {currentBills.map((product, index) => (
                      <tr
                        key={product?._id}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
                      >
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{product?.shopname}</td>
                        <td className="border px-4 py-2">{product?.name}</td>
                        <td className="border px-4 py-2">{product?.phonenumber}</td>
                        <td className="border px-4 py-2">{product?.total}</td>
                        <td className="border px-4 py-2">{product?.get_discount}%</td>
                        <td className="border px-4 py-2">{product?.advance}</td>
                        <td className="border px-4 py-2">{product?.date}</td>
                        <td className={`border px-4 py-2 ${product?.newbalance ? "bg-danger" : ""}`}>
                          {product?.newbalance}
                        </td>
                        <td className="border hover:bg-black cursor-pointer font-extrabold text-warning px-4 py-2">
                          <Link to={`/bills/${product?._id}`}>View</Link>
                        </td>
                        <td
                          className="border hover:bg-black cursor-pointer font-extrabold text-warning px-4 py-2"
                          onClick={() => handlebillEdit(product?._id)}
                        >
                          Edit
                        </td>
                        <td
                          onClick={() => handlecall(product?.phonenumber)}
                          className="border hover:bg-black cursor-pointer font-extrabold text-warning px-4 py-2"
                        >
                          Call
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="flex justify-center mt-4">
                <nav className="block">
                  <ul className="flex pl-0 rounded list-none flex-wrap">
                    {Array.from({ length: Math.ceil(customarbills.length / billsPerPage) }, (_, index) => (
                      <li key={index}>
                        <button
                          className={`px-3 py-1 rounded-full mx-1 font-semibold ${
                            currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white"
                          }`}
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </>
          )}
        </div>
        <BillModal customarbill={customarbill} />
      </div>
    </DefaultLayout>
  );
}

export default BillsTable;
