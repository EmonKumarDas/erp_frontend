
import React, { useContext } from 'react';
import { ApiContext } from '../../ApiProvider/ApiProvider';


const SignIn = () => {
  const { handleLogin, loading } = useContext(ApiContext);

  const handleSubmit = (e) => {
    handleLogin(e);
  };

  return (
    <div className='rounded-sm border border-stroke shadow-default dark:border-strokedark bg-boxdark'>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='email'
            name="email"
            placeholder='Email'
            className='p-2 border rounded-sm'
            required
          />
          <input
            type='password'
            name="password"
            placeholder='Password'
            className='p-2 border rounded-sm'
            required
          />
          <button type='submit' className='p-2 bg-gray rounded-sm text-black'>
            {loading ? "Loading...." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
