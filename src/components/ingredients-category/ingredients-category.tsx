import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { getConstructorItems } from '../state-managers';
import { useAppSelector } from '../../services/store';
export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const constructorData = useAppSelector(getConstructorItems);
  const itemCounters = useMemo(() => {
    const { bun, ingredients } = constructorData;
    const counterMap: { [key: string]: number } = {};
    ingredients.forEach((ingredient: TIngredient) => {
      if (!counterMap[ingredient._id]) counterMap[ingredient._id] = 0;
      counterMap[ingredient._id]++;
    });
    if (bun) counterMap[bun._id] = 2;
    return counterMap;
  }, [constructorData]);
  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={itemCounters}
      ref={ref}
    />
  );
});
