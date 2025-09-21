import { FC, useEffect } from 'react';
import { useAppSelector, useDispatch } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import {
  getUserOrders,
  fetchUserOrdersHistory
} from '../../components/state-managers';
export const ProfileOrders: FC = () => {
  const userOrders: TOrder[] = useAppSelector(getUserOrders);
  const storeDispatch = useDispatch();
  useEffect(() => {
    storeDispatch(fetchUserOrdersHistory());
  }, [storeDispatch]);
  return <ProfileOrdersUI orders={userOrders} />;
};
