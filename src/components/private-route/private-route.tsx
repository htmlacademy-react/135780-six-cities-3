import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AppRoutes } from '../../constants';

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);
  if (authorizationStatus === 'UNKNOWN') {
    return null;
  }
  return authorizationStatus === 'AUTH'
    ? children
    : <Navigate to={AppRoutes.Login} />;
};

export default PrivateRoute;
