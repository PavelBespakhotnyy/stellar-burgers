import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import {
  getIngredientsSelector,
  getCurrentOrder,
  fetchUserOrderByNumber
} from '../state-managers';
export const OrderInfo: FC = () => {
  const { number } = useParams();
  const storeDispatch = useDispatch();
  const currentOrder = useSelector(getCurrentOrder);
  const allIngredients: TIngredient[] = useSelector(getIngredientsSelector);
  useEffect(() => {
    storeDispatch(fetchUserOrderByNumber(Number(number)));
  }, [storeDispatch, number]);
  const processedOrderData = useMemo(() => {
    if (!currentOrder || !allIngredients.length) return null;
    const orderDate = new Date(currentOrder.createdAt);
    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };
    const ingredientsWithCount = currentOrder.ingredients.reduce(
      (acc: TIngredientsWithCount, itemId) => {
        if (!acc[itemId]) {
          const foundIngredient = allIngredients.find(
            (ing) => ing._id === itemId
          );
          if (foundIngredient) {
            acc[itemId] = {
              ...foundIngredient,
              count: 1
            };
          }
        } else {
          acc[itemId].count++;
        }
        return acc;
      },
      {}
    );
    const orderTotal = Object.values(ingredientsWithCount).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    return {
      ...currentOrder,
      ingredientsInfo: ingredientsWithCount,
      date: orderDate,
      total: orderTotal
    };
  }, [currentOrder, allIngredients]);
  if (!processedOrderData) {
    return <Preloader />;
  }
  return <OrderInfoUI orderInfo={processedOrderData} />;
};
