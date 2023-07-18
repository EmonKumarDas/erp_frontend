import React, { useContext, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';


function PrintInstant() {

    var billString = localStorage.getItem('mergedData');
    var bill = JSON.parse(billString);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Bill Data",
        onAfterPrint: () => {
            alert("Print Successful");
            localStorage.removeItem('billData');
            localStorage.removeItem('mergedData');
            window.location.replace('/bill')
        }
    });

    return (
        <div className="bg-white rounded-lg shadow-lg w-[90vw] m-auto my-5">
            <div ref={componentRef} >
                <div className="flex justify-between">
                    <div className='p-4'>
                        <h1 className="text-black-2 text-3xl font-bold mb-2">{bill.shopname}</h1>
                        <p className="text-black-2 text-sm">All kinds of electric goods whole saler and retailer</p>
                        <p className="text-black-2 text-sm mt-1">119/24, Foyez Electric Market, Nandankanan, Chittagong</p>
                        <p className="text-black-2 text-sm">Mobile: 01846378948</p>
                        <p className="text-black-2 text-sm mt-1">Date: {bill.date}</p>
                    </div>
                    <div className=''>
                        <h2 className="text-white px-6 rounded-l-md my-3 bg-graydark text-xl font-bold">Bill</h2>
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-center">

                        <input type="text" defaultValue={bill.name} readOnly className="border border-gray-300 p-2 rounded-md w-full" />
                    </div>
                    <div className="flex justify-between items-center mt-2">

                        <input type="text" defaultValue={bill.phonenumber} readOnly className="border border-gray-300 p-2 rounded-md w-full" />
                    </div>
                    <div className="flex justify-between items-center mt-2">

                        <input type="text" defaultValue={bill.location} readOnly className="border border-gray-300 p-2 rounded-md w-full" />
                    </div>
                </div>

                <div className="">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-yellow-600 text-black-2">
                                <th className="py-2 px-4 text-left">#</th>
                                <th className="py-2 px-4 text-left">Product Name</th>
                                <th className="py-2 px-4 text-left">Quantity</th>
                                <th className="py-2 px-4 text-left">Watt</th>
                                <th className="py-2 px-4 text-left">Taka</th>
                            </tr>
                        </thead>
                        <tbody>

                            {bill?.products?.map((product, index) => (
                                <tr key={product.id}>
                                    <td className="py-2 text-black-2 px-4">{index + 1}</td>
                                    <td className="py-2 text-black-2 px-4">{product?.productname}</td>
                                    <td className="py-2 text-black-2 px-4">{product?.quantity}</td>
                                    <td className="py-2 text-black-2 px-4">{product?.watt}</td>
                                    <td className="py-2 text-black-2 px-4">{product?.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4" className="text-right font-bold text-black-2 py-2 px-4">Total:</td>
                                <td className="py-2 text-black-2 font-bold px-4">{bill?.total}</td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="text-right font-bold text-black-2 py-2 px-4">Advance:</td>
                                <td className="py-2 text-black-2 font-bold px-4"><input type="text" className="p-2 rounded-md w-24" readOnly defaultValue={bill?.advance} /></td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="text-right font-bold text-black-2 py-2 px-4">Discount:</td>
                                <td className="py-2 text-black-2 font-bold px-4"><input type="text" className="p-2 rounded-md w-24" readOnly defaultValue={bill?.get_discount} /></td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="text-right font-bold text-black-2 py-2 px-4">Remaining Tk:</td>
                                <td className="py-2 text-black-2 font-bold px-4">{bill?.discountedTotal}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div>
                </div>

            </div>
            <button onClick={handlePrint} className='hover:bg-[#161830c9] w-full text-center bg-black p-5 mt-3 text-white font-bold text-xl'>Print</button>
        </div>

    );
}

export default PrintInstant;


