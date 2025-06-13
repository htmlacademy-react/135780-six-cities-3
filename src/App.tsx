import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import MainPage from './Pages/main-page';
import NotFoundPage from './Pages/not-found-page';
import FavoritesPage from './Pages/favorite-page';
import LoginPage from './Pages/login-page';
import OfferPage from './Pages/offer-page';
import PrivateRoute from './components/PrivateRoute/private-route';
import { AppRoutes } from './constants';
import { offers as mockOffers } from './mocks/offers';

type AppProps = {
  offers: typeof mockOffers;
};

const App: React.FC<AppProps> = ({ offers }) => {
  // Преобразуем id объявлений из числа в строку, чтобы типы совпадали
  const stringOffers = offers.map((offer) => ({
    ...offer,
    id: offer.id.toString(),
  }));

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Root} element={<MainPage offers={stringOffers} />} />
        <Route path={AppRoutes.Login} element={<LoginPage />} />
        <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute isAuthorized={false}>
              <FavoritesPage offers={stringOffers} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoutes.Offer} element={<OfferPage />} />
        <Route path={AppRoutes.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
