import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OfferList, { OfferData } from '../components/OfferList/offer-list';
import Header from '../components/Header/header';
import { RootState } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import { setCity } from '../store/reducer';
import { AppRoutes } from '../constants';

const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Получаем только избранные офферы
  const offers: OfferData[] = useSelector((state: RootState) =>
    state.offers.filter((offer: OfferData) => offer.isFavorite)
  );
  const isEmpty = offers.length === 0;

  // Группировка по городам
  const groupedOffers = offers.reduce<Record<string, OfferData[]>>((acc, offer) => {
    const city = offer.city.name;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(offer);
    return acc;
  }, {});

  const handleCityClick = (city: string) => {
    dispatch(setCity(city));
    navigate(AppRoutes.Root);
  };

  return (
    <div className={`page${isEmpty ? ' page--favorites-empty' : ''}`}>
      <Header />
      <main className={`page__main page__main--favorites${isEmpty ? ' page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {isEmpty ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(groupedOffers).map(([city, cityOffers]) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link
                          className="locations__item-link"
                          to={AppRoutes.Root}
                          onClick={(e) => {
                            e.preventDefault();
                            handleCityClick(city);
                          }}
                        >
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <OfferList offers={cityOffers} className="favorites__places" isFavorites />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoutes.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};

export default FavoritesPage;
