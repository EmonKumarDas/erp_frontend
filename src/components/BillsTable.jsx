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
    const handlebillEdit = (id) => {
        setIsModalOpen(true);
        const customarBill = customarbills.find((customar) => customar._id === id);
        setCustomarbill(customarBill)

    }
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
                <th className="px-4 text-left">Advance</th>
                <th className="px-4 text-left">Date</th>
                <th className="px-4 text-left">Remaining</th>
                <th className="px-4 text-left"></th>
                <th className="px-4 text-left"></th>
                <th className="px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {customarbills.map((product, index) => (
                <tr
                  key={product?.id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{product?.shopname}</td>
                  <td className="border px-4 py-2">{product?.name}</td>
                  <td className="border px-4 py-2">{product?.phonenumber}</td>
                  <td className="border px-4 py-2">{product?.advance}</td>
                  <td className="border px-4 py-2">{product?.date}</td>
                  <td className={`border px-4 py-2 ${product?.newbalance ? "bg-danger" : ""}`}>{product?.newbalance}</td>
                  <td className="border hover:bg-black cursor-pointer font-extrabold text-warning px-4 py-2">
                    <Link to={`/bills/${product?._id}`}>View</Link>
                  </td>
                  <td className="border hover:bg-black cursor-pointer font-extrabold text-warning px-4 py-2" onClick={() => handlebillEdit(product?._id)}>Edit</td>
                  <td className="border hover:bg-black cursor-pointer font-extrabold text-warning px-4 py-2">Call</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    <BillModal customarbill={customarbill}></BillModal>
  </div>
</DefaultLayout>

    );
}

export default BillsTable;
