import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { addConstructorItem } from '../state-managers/burger-state';
export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const currentLocation = useLocation();
    const storeDispatch = useDispatch();
    const addToConstructor = () => {
      storeDispatch(addConstructorItem(ingredient));
    };
    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: currentLocation }}
        handleAdd={addToConstructor}
      />
    );
  }
);
