import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import { getUser } from '../state-managers';
import { AppHeaderUI } from '@ui';
export const AppHeader: FC = () => {
  const currentUser = useAppSelector(getUser)?.name;
  return <AppHeaderUI userName={currentUser} />;
};
