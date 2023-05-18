import React, { useContext } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import { ApiContext } from '../../ApiProvider/ApiProvider';
import CircleLoader from '../../components/CircleLoader';
import { Link } from 'react-router-dom';

const AllCompany = () => {
    const { allcompany, loading } = useContext(ApiContext);
    return (
        <DefaultLayout>
            <Breadcrumb pageName='All Bills' />
            <div className="overflow-x-auto">
                <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className='border-b border-stroke py-4 dark:border-strokedark'>
                        <h3 className='font-medium text-black dark:text-white'>
                            All Products
                        </h3>
                    </div>
                    {
                        loading ? <CircleLoader></CircleLoader> : <div className="overflow-x-auto mt-2">
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 text-left">#</th>
                                        <th className="px-4 text-left">Company Name</th>
                                        <th className="px-4 text-left">Contact Number</th>
                                        <th className="px-4 text-left"></th>
                                        <th className="px-4 text-left"></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {allcompany.map((company, index) => (
                                        <tr
                                            key={company._id}


                                        >
                                            {/* <td className="border px-4 py-2">{product.barCode}</td> */}
                                            <td className="border px-4 py-2">{index + 1}</td>
                                            <td className="border px-4 py-2">{company.comapanyname}</td>
                                            <td className="border px-4 py-2">{company.contactnumber}</td>

                                            {
                                                loading ? <CircleLoader></CircleLoader> :
                                                    <button className="ml-2">
                                                        <td className="border hover:bg-black cursor-pointer font-extrabold text-danger px-4 py-2">Delete</td>
                                                    </button>
                                            }
                                            {
                                                loading ? <CircleLoader></CircleLoader> :
                                                    <button className="ml-2">
                                                        <td className="border hover:bg-black cursor-pointer font-extrabold text-warning px-4 py-2">Edit</td>
                                                    </button>
                                            }

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AllCompany;