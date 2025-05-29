import React from 'react';
import OfferList from '../OfferList/offer-list';
import { Link } from 'react-router-dom';

type Offer = {
  id: number;
  isPremium: boolean;
  price: number;
  title: string;
  type: string;
  rating: number;
  image: string;
};

type FavoritesPageProps = {
  offers: Offer[];
};

const FavoritesPage: React.FC<FavoritesPageProps> = ({ offers }) => (
  <div className="page">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                </a>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  <span className="header__signout">Sign out</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <OfferList offers={offers} className="favorites__places" />
        </section>
      </div>
    </main>
  </div>
);

export default FavoritesPage;
