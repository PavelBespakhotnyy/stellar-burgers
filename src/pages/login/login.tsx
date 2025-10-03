import { FC, SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { getIsAuthenticated, loginUser } from '../../components/state-managers';
export const Login: FC = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const storeDispatch = useDispatch();
  const userIsAuthenticated = useSelector(getIsAuthenticated);
  const processLogin = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!userEmail || !userPassword) {
      return;
    }
    storeDispatch(loginUser({ email: userEmail, password: userPassword }));
  };
  if (userIsAuthenticated) {
    return <Navigate to={'/'} />;
  }
  return (
    <LoginUI
      errorText=''
      email={userEmail}
      setEmail={setUserEmail}
      password={userPassword}
      setPassword={setUserPassword}
      handleSubmit={processLogin}
    />
  );
};
