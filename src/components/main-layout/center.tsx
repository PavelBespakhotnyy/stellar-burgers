import { FC, memo } from 'react';
import { TCenter } from './type';
import { CenterUI } from '../ui/main-layout';
export const MainLayout: FC<TCenter> = memo(({ title, children }) => (
  <CenterUI title={title} children={children} />
));
