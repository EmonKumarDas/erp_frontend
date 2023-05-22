import React, { useContext, useState } from 'react'
import UserFive from '../images/user/user-05.png'
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
            employees?.map((employ) => (
              <div>
                <a

                  className='flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4'
                >
                  <div className='relative h-14 w-14 rounded-full'>
                    <img src={UserFive} alt='User' />
                    <span className='absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-meta-6'></span>
                  </div>

                  <div className='flex flex-1 items-center justify-between'>
                    <div>
                      <h5 className='font-medium'>{employ?.name}</h5>
                      <p>
                        <span className='text-sm'>{employ?.number}</span>
                        {/* <span className='text-xs'> . Sep 20</span> */}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => handlePayClick(employ._id)} className='bg-meta-3 text-white px-4 py-2 my-2 rounded font-bold'>PAY</button>
                  <Link to={`/details/${employ.number}`}>
                  <button  className='bg-meta-6 text-white px-4 py-2 my-2 rounded font-bold'>VIEW</button>
                  </Link>
                  <button className='bg-meta-5 text-white px-4 py-2 my-2 rounded font-bold'>EDIT</button>
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
