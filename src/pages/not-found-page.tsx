import { AppRoutes } from '../constants';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetOffer } from '../store/reducer';
import type { AppDispatch } from '../store';

const NotFoundPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(resetOffer());
  }, [dispatch]);

  return (
    <div className="page page--gray page--not-found">


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
};

export default NotFoundPage;
