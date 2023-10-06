import React, { useContext } from 'react';
import CircleLoader from '../components/CircleLoader';
import { ApiContext } from '../ApiProvider/ApiProvider';

const EmployeDetails = ({ employee, loading }) => {
    const { getMonthName } = useContext(ApiContext);

    return (
        <div className='col-span-12 mt-5 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark'>
            {loading ? (
                <CircleLoader></CircleLoader>
            ) : (
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Salary</th>
                            <th>Others Bill</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee?.map((employ, index) => (
                            <tr
                                key={index}
                                className={
                                    index % 2 === 0
                                        ? 'bg-gray-3 dark:bg-meta-4'
                                        : 'bg-gray-5 dark:bg-primary'
                                }
                            >
                                <td>{employ?.date}</td>
                                <td>{employ?.pay} TK</td>
                                <td>{employ?.otherbill} TK</td>
                                <td>{employ?.otherbill + employ?.pay} TK</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EmployeDetails;
