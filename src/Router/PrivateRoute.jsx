import React, { useContext } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { userContext } from '../pages/Authentication/AuthProvider';
import CircleLoader from '../../src/components/CircleLoader';

const PrivateRoute = ({ children }) => {

    const { user, loading,logout } = useContext(userContext);
    
    const location = useLocation();
    if (loading) {
        return <CircleLoader></CircleLoader>;
    }

    if (!user) {
        return <Navigate to='/auth/signin' state={{ from: location }} replace></Navigate>
    }
    return (children);

};

export default PrivateRoute;