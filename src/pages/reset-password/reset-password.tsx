import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPasswordApi } from '@api';
import { ResetPasswordUI } from '@ui-pages';
export const ResetPassword: FC = () => {
  const router = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [apiError, setApiError] = useState<Error | null>(null);
  const processPasswordReset = (e: SyntheticEvent) => {
    e.preventDefault();
    setApiError(null);
    resetPasswordApi({ password: newPassword, token: resetToken })
      .then(() => {
        localStorage.removeItem('resetPassword');
        router('/login');
      })
      .catch((err) => setApiError(err));
  };
  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      router('/forgot-password', { replace: true });
    }
  }, [router]);
  return (
    <ResetPasswordUI
      errorText={apiError?.message}
      password={newPassword}
      token={resetToken}
      setPassword={setNewPassword}
      setToken={setResetToken}
      handleSubmit={processPasswordReset}
    />
  );
};
