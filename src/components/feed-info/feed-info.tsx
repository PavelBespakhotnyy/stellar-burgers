import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { getFeedOrders, getTotal, getTotalToday } from '../state-managers';
import { useSelector } from '../../services/store';
const extractOrderNumbers = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((order) => order.status === status)
    .map((order) => order.number)
    .slice(0, 20);
export const FeedInfo: FC = () => {
  const allOrders: TOrder[] = useSelector(getFeedOrders);
  const totalOrders = useSelector(getTotal);
  const todayOrders = useSelector(getTotalToday);
  const feedStatistics = {
    orders: allOrders,
    total: totalOrders,
    totalToday: todayOrders
  };
  const completedOrders = extractOrderNumbers(allOrders, 'done');
  const inProgressOrders = extractOrderNumbers(allOrders, 'pending');
  return (
    <FeedInfoUI
      readyOrders={completedOrders}
      pendingOrders={inProgressOrders}
      feed={feedStatistics}
    />
  );
};
