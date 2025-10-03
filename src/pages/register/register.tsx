import { FC, SyntheticEvent, useState } from 'react';
import { Preloader } from '@ui';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  getLoginUserRequest,
  registerUser
} from '../../components/state-managers';
export const Register: FC = () => {
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const storeDispatch = useDispatch();
  const isProcessing = useSelector(getLoginUserRequest);
  const processRegistration = (e: SyntheticEvent) => {
    e.preventDefault();
    storeDispatch(
      registerUser({ name, email: userEmail, password: userPassword })
    );
  };
  if (isProcessing) {
    return <Preloader />;
  }
  return (
    <RegisterUI
      errorText=''
      email={userEmail}
      userName={name}
      password={userPassword}
      setEmail={setUserEmail}
      setPassword={setUserPassword}
      setUserName={setName}
      handleSubmit={processRegistration}
    />
  );
};
