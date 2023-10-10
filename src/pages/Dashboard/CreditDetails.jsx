import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumb";
import { useParams } from "react-router-dom";

const CreditDetails = () => {
  const { id } = useParams();
  const [bill, setBill] = useState({});

  useEffect(() => {
    fetch(`https://admin-backend-eight-mu.vercel.app/getBillById/${id}`,
    {
      method: 'GET',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    }
    )
      .then((res) => res.json())
      .then((result) => setBill(result));
  }, []);

  const renderProductRows = () => {
    if (bill.products) {
      return bill.products.map((product, index) => (
        <tr key={index}>
          <td className="border px-4 py-2">{product.productname}</td>
          <td className="border px-4 py-2">{product.PurchasePrice}</td>
          <td className="border px-4 py-2">{product.Discount}</td>
          <td className="border px-4 py-2">{product.quantity}</td>
          <td className="border px-4 py-2">{product.company}</td>
          <td className="border px-4 py-2">{product.watt}</td>
          <td className="border px-4 py-2">{product.TotalPrice}</td>
          <td className="border px-4 py-2">{product.DiscountAmount}</td>
          <td className="border px-4 py-2">{product.SellPrice}</td>
          <td className="border px-4 py-2">{product.total}</td>
        </tr>
      ));
    }
    return null;
  };

  const renderAdvanceByDateRows = () => {
    if (bill.pay_advance_by_date) {
      return bill.pay_advance_by_date.map((advance, index) => (
        <tr key={index}>
          <td className="border px-4 py-2">{advance.date}</td>
          <td className="border px-4 py-2">{advance.advance}</td>
        </tr>
      ));
    }
    return null;
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Credit details" />
      <div className="overflow-x-auto my-5">
        <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Credit details
            </h3>
          </div>
          <h4 className="font-medium text-black dark:text-white mt-4">
            Products
          </h4>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Purchase Price</th>
                <th className="px-4 py-2">Discount</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Company</th>
                <th className="px-4 py-2">Watt</th>
                <th className="px-4 py-2">Total Price</th>
                <th className="px-4 py-2">Discount Amount</th>
                <th className="px-4 py-2">Sell Price</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>{renderProductRows()}</tbody>
          </table>
          <h4 className="font-medium text-black dark:text-white mt-4">
            Advance Payments by Date
          </h4>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Advance</th>
              </tr>
            </thead>
            <tbody>{renderAdvanceByDateRows()}</tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreditDetails;
