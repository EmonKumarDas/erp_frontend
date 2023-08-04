import React, { useContext, useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumb';
import { useParams } from 'react-router-dom';
import EmployeDetails from './EmployeDetails';
import { ApiContext } from '../ApiProvider/ApiProvider';

const Profile = () => {
  const { loading, setLoading } = useContext(ApiContext);
  const { id } = useParams();
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:5000/getemploybille/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
    })
      .then(res => res.json())
      .then(result => {
        setEmployee(result)
        setLoading(true)
      })
  }, [])
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Profile' />

      <div className='overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
        <div className='px-4 pb-6 text-center lg:pb-8 xl:pb-11.5'>
          <div className='mt-4'>
            <h3 className='mb-1.5 text-2xl font-semibold text-black dark:text-white'>
              {employee[0]?.name}
            </h3>
            <p className='font-medium'>{
              employee[0]?.number
            }</p>
            <EmployeDetails employee={employee} loading={loading}></EmployeDetails>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Profile;
