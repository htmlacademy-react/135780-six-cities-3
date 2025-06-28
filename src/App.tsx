import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import MainPage from './pages/main-page';
import NotFoundPage from './pages/not-found-page';
import FavoritesPage from './pages/favorite-page';
import LoginPage from './pages/login-page';
import OfferPage from './pages/offer-page';
import PrivateRoute from './components/PrivateRoute/private-route';
import { AppRoutes } from './constants';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.Root} element={<MainPage />} />
      <Route path={AppRoutes.Login} element={<LoginPage />} />
      <Route
        path={AppRoutes.Favorites}
        element={
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route path={AppRoutes.Offer} element={<OfferPage />} />
      <Route path={AppRoutes.NotFound} element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
