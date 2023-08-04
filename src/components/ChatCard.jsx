import React, { useContext, useState } from 'react'

import DefaultLayout from '../layout/DefaultLayout'
import { ApiContext } from '../ApiProvider/ApiProvider'
import Modal from '../Employ Management/Modal'
import CircleLoader from './CircleLoader'
import { Link } from 'react-router-dom'
import { userContext } from '../pages/Authentication/AuthProvider'


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
            employees?.map((employ) => (
              <div>
                <a

                  className='flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4'
                >


                  <div className='flex flex-1 items-center justify-between'>
                    <div>
                      <h5 className='font-medium'>{employ?.name ? employ?.name : employ?.email}</h5>
                      <p>
                        <span className='text-sm'>{employ?.number}</span>
                      </p>
                    </div>
                  </div>
                  {
                    employ?.email === "em@gmail.com" ?
                     <button disabled className=' bg-meta-3 text-white px-4 py-2 my-2 rounded font-bold'>Admin</button>
                      : <>
                        <button onClick={() => handlePayClick(employ._id)} className='bg-meta-3 text-white px-4 py-2 my-2 rounded font-bold'>PAY</button>

                        <Link to={`/details/${employ.number}`}>
                          <button className='bg-meta-6 text-white px-4 py-2 my-2 rounded font-bold'>VIEW</button>
                        </Link >
                      </>
                  }
                </a>
              </div>
            ))
        }
        <Modal employData={employData} />
      </div>
    </DefaultLayout>
  )
}

export default ChatCard;
