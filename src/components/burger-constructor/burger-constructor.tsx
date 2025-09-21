import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorItems,
  getOrderModalData,
  getOrderRequest,
  getIsAuthenticated,
  createBurgerOrder,
  clearOrderData
} from '../state-managers';
export const BurgerConstructor: FC = () => {
  const router = useNavigate();
  const storeDispatch = useDispatch();
  const selectedItems = useSelector(getConstructorItems);
  const orderLoading = useSelector(getOrderRequest);
  const orderData = useSelector(getOrderModalData);
  const userAuthenticated = useSelector(getIsAuthenticated);
  const handleOrderClick = () => {
    if (!userAuthenticated) {
      return router('/login');
    }
    if (!selectedItems.bun || orderLoading) return;
    const orderIds = [
      selectedItems.bun._id,
      ...selectedItems.ingredients.map((item) => item._id),
      selectedItems.bun._id
    ];
    storeDispatch(createBurgerOrder(orderIds));
  };
  const handleCloseModal = () => {
    storeDispatch(clearOrderData());
    router('/');
  };
  const totalPrice = useMemo(
    () =>
      (selectedItems.bun ? selectedItems.bun.price * 2 : 0) +
      selectedItems.ingredients.reduce(
        (sum: number, item: TConstructorIngredient) => sum + item.price,
        0
      ),
    [selectedItems]
  );
  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderLoading}
      constructorItems={selectedItems}
      orderModalData={orderData}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseModal}
    />
  );
};
