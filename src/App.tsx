import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import MainPage from './Pages/main-page';
import NotFoundPage from './Pages/not-found-page';
import FavoritesPage from './Pages/favorite-page';
import LoginPage from './Pages/login-page';
import OfferPage from './Pages/offer-page';
import PrivateRoute from './components/PrivateRoute/private-route';
import { AppRoutes } from './constants';


type AppProps = {
  offers: typeof import('./mocks/offers').offers;
};

const App: React.FC<AppProps> = ({ offers }) => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.Root} element={<MainPage offers={offers} />} />
      <Route path={AppRoutes.Login} element={<LoginPage />} />
      <Route
        path={AppRoutes.Favorites}
        element={
          <PrivateRoute isAuthorized={false}>
            <FavoritesPage offers={offers} />
          </PrivateRoute>
        }
      />
      <Route path={AppRoutes.Offer} element={<OfferPage />} />
      <Route path={AppRoutes.NotFound} element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
