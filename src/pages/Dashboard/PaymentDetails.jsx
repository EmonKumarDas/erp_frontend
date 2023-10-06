import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../ApiProvider/ApiProvider";
import CircleLoader from "../../components/CircleLoader";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumb";
import { useParams } from "react-router-dom";

function PaymentDetails() {
    const { id } = useParams();
    const [productData, setProduct] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/ProductsById/${id}`)
            .then((res) => res.json())
            .then((result) => setProduct(result));
    }, [id]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Product's Details" />
            <div className="overflow-x-auto mt-5">
                <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">Product's Details</h3>
                    </div>
                    <div className="container mx-auto p-4">

                        <h2 className="text-xl font-semibold mb-2">Products</h2>
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Product Name</th>
                                    <th className="px-4 py-2">Company Name</th>
                                    <th className="px-4 py-2">Purchase Price</th>
                                    <th className="px-4 py-2">Quantity</th>
                                    <th className="px-4 py-2">Amount</th>
                             
                                </tr>
                            </thead>
                            <tbody>
                                {productData?.products?.map((product) => (
                                    <tr key={product.id}>
                                        <td className="border px-4 py-2">{product.productname}</td>
                                        <td className="border px-4 py-2">{product.companyName}</td>
                                        <td className="border px-4 py-2">{product.PurchasePrice}</td>
                                        <td className="border px-4 py-2">{product.quantity}</td>
                                        <td className="border px-4 py-2">{product.amount}</td>
                                    
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Display Payamount Table */}
                        <h2 className="text-xl font-semibold mt-4 mb-2">Payamount</h2>
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>

                                    <th className="px-4 py-2">Advance</th>
                                    <th className="px-4 py-2">Payment Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productData?.payamount?.map((payment) => (
                                    <tr key={payment.month}>

                                        <td className="border px-4 py-2">{payment.advance}</td>
                                        <td className="border px-4 py-2">{payment.get_date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </DefaultLayout>

    );
}

export default PaymentDetails;
