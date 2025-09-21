import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { getIngredientsSelector } from '../state-managers';
export const IngredientDetails: FC = () => {
  const allIngredients = useSelector(getIngredientsSelector);
  const { id } = useParams();
  const selectedIngredient = allIngredients.find((item) => item._id === id);
  if (!selectedIngredient) {
    return <Preloader />;
  }
  return <IngredientDetailsUI ingredientData={selectedIngredient} />;
};
