import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { getIngredientsSelector } from '../state-managers';
import { useAppSelector } from '../../services/store';
const MAX_INGREDIENTS_DISPLAY = 6;
export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const currentLocation = useLocation();
  const allIngredients: TIngredient[] = useAppSelector(getIngredientsSelector);
  const processedOrderData = useMemo(() => {
    if (!allIngredients.length) return null;
    const orderIngredients = order.ingredients.reduce(
      (acc: TIngredient[], itemId: string) => {
        const foundIngredient = allIngredients.find(
          (ing) => ing._id === itemId
        );
        if (foundIngredient) return [...acc, foundIngredient];
        return acc;
      },
      []
    );
    const orderTotal = orderIngredients.reduce(
      (acc, item) => acc + item.price,
      0
    );
    const visibleIngredients = orderIngredients.slice(
      0,
      MAX_INGREDIENTS_DISPLAY
    );
    const hiddenCount =
      orderIngredients.length > MAX_INGREDIENTS_DISPLAY
        ? orderIngredients.length - MAX_INGREDIENTS_DISPLAY
        : 0;
    const orderDate = new Date(order.createdAt);
    return {
      ...order,
      ingredientsInfo: orderIngredients,
      ingredientsToShow: visibleIngredients,
      remains: hiddenCount,
      total: orderTotal,
      date: orderDate
    };
  }, [order, allIngredients]);
  if (!processedOrderData) return null;
  return (
    <OrderCardUI
      orderInfo={processedOrderData}
      maxIngredients={MAX_INGREDIENTS_DISPLAY}
      locationState={{ background: currentLocation }}
    />
  );
});
