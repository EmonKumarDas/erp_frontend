import React, { useContext } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import { ApiContext } from '../../ApiProvider/ApiProvider';
import CircleLoader from '../../components/CircleLoader';

const AllCompany = () => {
    const { allcompany, loading } = useContext(ApiContext);
    const handleDelete = (id) => {

        // Show an alert to confirm the delete operation
        const isConfirmed = window.confirm("Are you sure you want to delete this company?");

        if (isConfirmed) {
            // Proceed with the delete operation if the user confirms
            fetch(`https://admin-backend-eight-mu.vercel.app/deleteCompany/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(result => {
                })
                .catch(error => {
                    // Handle any errors that occur during the delete operation
                    // For example, you can display an error message to the user
                });
        } else {
            // Do nothing if the user cancels the delete operation
        }
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName='All Companies' />
            <div className="overflow-x-auto">
                <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className='border-b border-stroke py-4 dark:border-strokedark'>
                        <h3 className='font-medium text-black dark:text-white'>
                            All Companies
                        </h3>
                    </div>
                    {
                        loading ? <CircleLoader></CircleLoader> :
                            <div className="overflow-x-auto mt-2">
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
                                                        <button onClick={() => { handleDelete(company?._id) }} className="ml-2">
                                                            <td className="border hover:bg-black cursor-pointer font-extrabold text-danger px-4 py-2">Delete</td>
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