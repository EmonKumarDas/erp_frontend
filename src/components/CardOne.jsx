import React from 'react';
const CardOne = ({ title, amount }) => {

  return (
    <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>

      <div className='mt-4 text-center '>
        <div>
          <h4 className='text-title-md font-bold text-black dark:text-white'>
            {amount}
          </h4>
          <span className='font-bold'>{title}</span>
        </div>
      
      </div>
    </div>
  )
}

export default CardOne;
