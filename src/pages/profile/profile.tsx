import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { ProfileUI } from '@ui-pages';
import { TUser } from '@utils-types';
import {
  getLoginUserRequest,
  getUser,
  updateUser
} from '../../components/state-managers';
export const Profile: FC = () => {
  const storeDispatch = useDispatch();
  const currentUser = useSelector(getUser) as TUser;
  const isProcessing = useSelector(getLoginUserRequest);
  const [userForm, setUserForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    password: ''
  });
  useEffect(() => {
    setUserForm((prevForm) => ({
      ...prevForm,
      name: currentUser?.name || '',
      email: currentUser?.email || ''
    }));
  }, [currentUser]);
  const hasFormChanges =
    userForm.name !== (currentUser?.name || '') ||
    userForm.email !== (currentUser?.email || '') ||
    !!userForm.password;
  const processFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    storeDispatch(
      updateUser({
        name: userForm.name,
        email: userForm.email,
        password: userForm.password
      })
    );
  };
  const resetForm = (e: SyntheticEvent) => {
    e.preventDefault();
    setUserForm({
      name: currentUser.name,
      email: currentUser.email,
      password: ''
    });
  };
  const updateFormField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value
    }));
  };
  if (isProcessing) {
    return <Preloader />;
  }
  return (
    <ProfileUI
      formValue={userForm}
      isFormChanged={hasFormChanges}
      handleCancel={resetForm}
      handleSubmit={processFormSubmit}
      handleInputChange={updateFormField}
    />
  );
};
