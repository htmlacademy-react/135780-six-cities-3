import React from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  isAuthorized: boolean;
  children: JSX.Element;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthorized, children }) =>
  isAuthorized ? children : <Navigate to="/login" />;

export default PrivateRoute;
