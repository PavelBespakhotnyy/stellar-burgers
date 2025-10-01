import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../state-managers/user-state';
export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const storeDispatch = useDispatch();
  const router = useNavigate();
  const performLogout = () => {
    storeDispatch(logoutUser());
    router('/');
  };
  return <ProfileMenuUI handleLogout={performLogout} pathname={pathname} />;
};
