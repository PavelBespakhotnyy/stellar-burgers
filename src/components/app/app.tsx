import { useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate
} from 'react-router-dom';
import {
  AppHeader,
  MainLayout,
  IngredientDetails,
  Modal,
  OrderInfo,
  AuthGuard
} from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { useDispatch } from '../../services/store';
import { fetchAllIngredients } from '../state-managers/ingredients-state';
import { AppDispatch } from 'src/services/store';
import { checkUserAuth } from '../state-managers/user-state';
import '../../index.css';
import styles from './app.module.css';
const MainApplication = () => {
  const router = useNavigate();
  const storeDispatch: AppDispatch = useDispatch();
  const currentLocation = useLocation();
  const feedRouteMatch = useMatch('/feed/:number');
  const profileOrdersRouteMatch = useMatch('/profile/orders/:number');
  const modalBackground = currentLocation.state?.background;
  const closeModalHandler = () => {
    router(-1);
  };
  useEffect(() => {
    storeDispatch(fetchAllIngredients());
  }, [storeDispatch]);
  useEffect(() => {
    storeDispatch(checkUserAuth());
  }, [storeDispatch]);
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={modalBackground || currentLocation}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <AuthGuard onlyUnAuth>
              <Login />
            </AuthGuard>
          }
        />
        <Route
          path='/register'
          element={
            <AuthGuard onlyUnAuth>
              <Register />
            </AuthGuard>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <AuthGuard>
              <ForgotPassword />
            </AuthGuard>
          }
        />
        <Route
          path='/reset-password'
          element={
            <AuthGuard>
              <ResetPassword />
            </AuthGuard>
          }
        />
        <Route
          path='/profile'
          element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <AuthGuard>
              <ProfileOrders />
            </AuthGuard>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <MainLayout title={`#${feedRouteMatch?.params.number}`}>
              <OrderInfo />
            </MainLayout>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <MainLayout title={`Детали ингредиента`}>
              <IngredientDetails />
            </MainLayout>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <AuthGuard>
              <OrderInfo />
            </AuthGuard>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {modalBackground && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${feedRouteMatch?.params.number}`}
                onClose={closeModalHandler}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeModalHandler}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <AuthGuard>
                <Modal
                  title={`#${profileOrdersRouteMatch?.params.number}`}
                  onClose={closeModalHandler}
                >
                  <OrderInfo />
                </Modal>
              </AuthGuard>
            }
          />
        </Routes>
      )}
    </div>
  );
};
export default MainApplication;
