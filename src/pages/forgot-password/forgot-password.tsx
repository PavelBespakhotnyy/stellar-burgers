import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';
export const ForgotPassword: FC = () => {
  const [userEmail, setUserEmail] = useState('');
  const [apiError, setApiError] = useState<Error | null>(null);
  const router = useNavigate();
  const processPasswordReset = (e: SyntheticEvent) => {
    e.preventDefault();
    setApiError(null);
    forgotPasswordApi({ email: userEmail })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        router('/reset-password', { replace: true });
      })
      .catch((err) => setApiError(err));
  };
  return (
    <ForgotPasswordUI
      errorText={apiError?.message}
      email={userEmail}
      setEmail={setUserEmail}
      handleSubmit={processPasswordReset}
    />
  );
};
