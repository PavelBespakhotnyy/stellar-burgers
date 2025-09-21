import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useDispatch, useAppSelector } from '../../services/store';
import {
  fetchAllFeeds,
  getFeedLoading,
  getFeedOrders
} from '../../components/state-managers';
export const Feed: FC = () => {
  const storeDispatch = useDispatch();
  const isLoading = useAppSelector(getFeedLoading);
  const feedOrders: TOrder[] = useAppSelector(getFeedOrders);
  useEffect(() => {
    storeDispatch(fetchAllFeeds());
  }, [storeDispatch]);
  if (isLoading || !feedOrders.length) {
    return <Preloader />;
  }

  const refreshFeeds = () => {
    storeDispatch(fetchAllFeeds());
  };
  return <FeedUI orders={feedOrders} handleGetFeeds={refreshFeeds} />;
};
