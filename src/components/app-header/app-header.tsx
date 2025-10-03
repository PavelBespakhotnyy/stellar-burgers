import { FC } from 'react';
import { useSelector } from '../../services/store';
import { getUser } from '../state-managers';
import { AppHeaderUI } from '@ui';
export const AppHeader: FC = () => {
  const currentUser = useSelector(getUser)?.name;
  return <AppHeaderUI userName={currentUser} />;
};
