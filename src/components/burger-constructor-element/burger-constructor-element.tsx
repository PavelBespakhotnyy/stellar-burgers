import { FC, memo } from 'react';
import { useDispatch } from '../../services/store';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  moveItemUp,
  moveItemDown,
  removeConstructorItem
} from '../state-managers';
export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const storeDispatch = useDispatch();
    const handleMoveDown = () => {
      storeDispatch(moveItemDown(index));
    };
    const handleMoveUp = () => {
      storeDispatch(moveItemUp(index));
    };
    const deleteItem = () => {
      storeDispatch(removeConstructorItem(ingredient.id));
    };
    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={deleteItem}
      />
    );
  }
);
