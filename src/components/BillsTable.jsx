import React, { useContext, useState } from "react";
import { ApiContext } from "../ApiProvider/ApiProvider";
import CircleLoader from "./CircleLoader";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "./Breadcrumb";
import { Link } from "react-router-dom";
import BillModal from "../Bill/BillModal";
import SentMessage from "../Bill/SentMessageModel";

function BillsTable() {
  const { customarbills, setIsModalOpen, loading } = useContext(ApiContext);
  const [customarbill, setCustomarbill] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modelOpen, setModelOpen] = useState(false);
  const [phoneNumberFilter, setPhoneNumberFilter] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [shopNameFilter, setShopNameFilter] = useState("");

  const handlebillEdit = (id) => {
    setIsModalOpen(true);
    const customarBill = customarbills.find((customar) => customar._id === id);
    setCustomarbill(customarBill);
  };

  const handlecall = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
    setModelOpen(true);
  };

  const billsPerPage = 10;

  // Filter the bills based on filter criteria
  const filteredBills = customarbills.filter((bill) => {
    const nameMatch = bill.name.toLowerCase().includes(nameFilter.toLowerCase());
    const phoneNumberMatch = bill.phonenumber.includes(phoneNumberFilter);
    const shopNameMatch = bill.shopname.toLowerCase().includes(shopNameFilter.toLowerCase());
    return nameMatch && phoneNumberMatch && shopNameMatch;
  });

  // Calculate the current bills to display based on pagination
  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Sells" />
      <div className="overflow-x-auto">
        {/* Filter inputs */}
        <div className="mb-4 flex flex-wrap space-y-2 sm:space-x-2 sm:flex-nowrap">
          <div>

            <input
              type="text"
              placeholder="Enter name..."
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>

            <input
              type="text"
              placeholder="Enter phone number..."
              value={phoneNumberFilter}
              onChange={(e) => setPhoneNumberFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>

            <input
              type="text"
              placeholder="Enter shop name..."
              value={shopNameFilter}
              onChange={(e) => setShopNameFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
        </div>

        {/* Rest of the component */}
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
                      <td className="border px-4 py-2">{currentBills[0].products.length}</td>
                      <td className="border px-4 py-2">{product?.total}</td>
                      <td className="border px-4 py-2">{product?.get_discount}%</td>
                      <td className="border px-4 py-2">{product?.advance}</td>
                      <td className="border px-4 py-2">{product?.date}</td>
                      <td className={`border px-4 py-2 ${product?.newbalance ? "bg-danger" : ""}`}>
                        {product?.newbalance}
                      </td>
                      <td className="border hover:bg-black cursor-pointer font-extrabold text-warning px-4 py-2">
                        <Link to={`/bills/${product?._id}`}>Print</Link>
                      </td>
                      <td
                        className="border hover-bg-black cursor-pointer font-extrabold text-warning px-4 py-2"
                        onClick={() => handlebillEdit(product?._id)}
                      >
                        Pay
                      </td>
                      <td
                        onClick={() => handlecall(product?.phonenumber)}
                        className="border hover:bg-black cursor-pointer font-extrabold text-warning px-4 py-2"
                      >
                        Message
                      </td>
                      <td className="border px-4 py-2 hover:bg-black font-extrabold text-success">
                          <Link className="cursor-pointer" to={`/product/details/${product._id}`}>Details</Link>
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
                  {Array.from(
                    { length: Math.ceil(filteredBills.length / billsPerPage) },
                    (_, index) => (
                      <li key={index}>
                        <button
                          className={`px-3 py-1 rounded-full mx-1 font-semibold ${currentPage === index + 1 ? "bg-primary text-white" : "bg-white"
                            }`}
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>
          </>
        )}
      </div>
      <BillModal customarbill={customarbill} />
      <SentMessage setModelOpen={setModelOpen} modelOpen={modelOpen} phoneNumber={phoneNumber} />
    </DefaultLayout>
  );
}

export default BillsTable;
