import React, { useContext, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import { ApiContext } from '../ApiProvider/ApiProvider'
import Modal from '../Employ Management/Modal'
import CircleLoader from './CircleLoader'
import { Link } from 'react-router-dom'

const ChatCard = () => {
  const { employees, setIsModalOpen, loading } = useContext(ApiContext);
  const [employData, setEmployData] = useState([]);

  const handlePayClick = (id) => {
    setIsModalOpen(true);
    const employ = employees.find((employ) => employ._id === id);
    setEmployData(employ)
  };

  return (
    <DefaultLayout>
      <div className='col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark'>
        <h4 className='mb-6 px-7.5 text-xl font-semibold text-black dark:text-white'>
          Employees
        </h4>

        {
          loading ? <CircleLoader></CircleLoader> :
          <table className='table-auto w-full border-collapse border border-stroke rounded-sm'>
            <thead className='bg-meta-4 text-white'>
              <tr>
                <th className='px-4 py-2'>Name</th>
                <th className='px-4 py-2'>Number</th>
                <th className='px-4 py-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((employ) => (
                <tr key={employ._id} className='border border-stroke'>
                  <td className='px-4 py-2'>{employ?.name ? employ?.name : employ?.email}</td>
                  <td className='px-4 py-2'>{employ?.number}</td>
                  <td className='px-4 py-2'>
                    {
                      employ?.email === "shah@gmail.com" ?
                      <button disabled className='bg-meta-3 text-white px-4 py-2 my-2 rounded font-bold'>Admin</button>
                      : <>
                        <button onClick={() => handlePayClick(employ._id)} className='bg-meta-3 text-white px-4 py-2 my-2 rounded font-bold'>PAY</button>

                        <Link to={`/details/${employ.number}`}>
                          <button className='bg-meta-6 text-white px-4 py-2 my-2 mx-2 rounded font-bold'>VIEW</button>
                        </Link >
                      </>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
        <Modal employData={employData} />
      </div>
    </DefaultLayout>
  )
}

export default ChatCard;
