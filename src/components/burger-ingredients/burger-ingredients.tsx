import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { getIngredientsSelector } from '../state-managers';
import { useSelector } from '../../services/store';
export const BurgerIngredients: FC = () => {
  const allIngredients = useSelector(getIngredientsSelector);
  const bunItems = allIngredients.filter((item) => item.type === 'bun');
  const mainItems = allIngredients.filter((item) => item.type === 'main');
  const sauceItems = allIngredients.filter((item) => item.type === 'sauce');
  const [activeTab, setActiveTab] = useState<TTabMode>('bun');
  const bunTitleRef = useRef<HTMLHeadingElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const sauceTitleRef = useRef<HTMLHeadingElement>(null);
  const [bunSectionRef, isBunInView] = useInView({
    threshold: 0
  });
  const [mainSectionRef, isMainInView] = useInView({
    threshold: 0
  });
  const [sauceSectionRef, isSauceInView] = useInView({
    threshold: 0
  });
  useEffect(() => {
    if (isBunInView) {
      setActiveTab('bun');
    } else if (isSauceInView) {
      setActiveTab('sauce');
    } else if (isMainInView) {
      setActiveTab('main');
    }
  }, [isBunInView, isMainInView, isSauceInView]);
  const handleTabClick = (tab: string) => {
    setActiveTab(tab as TTabMode);
    if (tab === 'bun')
      bunTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      mainTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      sauceTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <BurgerIngredientsUI
      currentTab={activeTab}
      buns={bunItems}
      mains={mainItems}
      sauces={sauceItems}
      titleBunRef={bunTitleRef}
      titleMainRef={mainTitleRef}
      titleSaucesRef={sauceTitleRef}
      bunsRef={bunSectionRef}
      mainsRef={mainSectionRef}
      saucesRef={sauceSectionRef}
      onTabClick={handleTabClick}
    />
  );
};
