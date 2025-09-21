import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useDispatch } from '../../services/store';
import {
  fetchAllFeeds,
  getFeedLoading,
  getFeedOrders
} from '../../components/state-managers';
export const Feed: FC = () => {
  const storeDispatch = useDispatch();
  const isLoading = useSelector(getFeedLoading);
  const feedOrders: TOrder[] = useSelector(getFeedOrders);
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
