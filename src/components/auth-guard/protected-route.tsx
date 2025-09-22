import { getIsAuthChecked, getUser } from '../state-managers';
import { useAppSelector } from '../../services/store';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};
export const AuthGuard = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
  const isAuthChecked = useAppSelector(getIsAuthChecked);
  const user = useAppSelector(getUser);
  const location = useLocation();
  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }
  return children;
};
