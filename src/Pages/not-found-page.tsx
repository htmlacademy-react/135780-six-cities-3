import { AppRoutes } from '../constants';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <div className="page page--gray page--not-found">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoutes.Root}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
        </div>
      </div>
    </header>

    <main className="page__main page__main--not-found">
      <div className="container">
        <section className="not-found">
          <h1 className="not-found__title">404 - Page Not Found</h1>
          <p className="not-found__description">The page you are looking for does not exist.</p>
          <Link className="not-found__link" to={AppRoutes.Root}>Go back to the main page</Link>
        </section>
      </div>
    </main>
  </div>
);

export default NotFoundPage;
