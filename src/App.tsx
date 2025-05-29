import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import MainPage from './components/MainPage/main-page';
import NotFoundPage from './components/NotFoundPage/not-found-page';
import FavoritesPage from './components/FavoritesPage/favorite-page';
import LoginPage from './components/LoginPage/login-page';
import OfferPage from './components/OfferPage/offer-page';
import PrivateRoute from './components/PrivateRoute/private-route';

type AppProps = {
  offers: typeof import('./mocks/offers').offers;
};

const App: React.FC<AppProps> = ({ offers }) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage offers={offers} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/favorites"
        element={
          <PrivateRoute isAuthorized={false}>
            <FavoritesPage offers={offers} />
          </PrivateRoute>
        }
      />
      <Route path="/offer/:id" element={<OfferPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
