import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // 1. Используем значение authorizationStatus из глобального состояния
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);

  // 2. Пока статус неизвестен — можно вернуть null или спиннер
  if (authorizationStatus === 'UNKNOWN') {
    return null;
  }

  // 3. Если авторизован — рендерим children, иначе редирект на /login
  return authorizationStatus === 'AUTH'
    ? children
    : <Navigate to="/login" />;
};

export default PrivateRoute;
