import React from 'react';
import OfferList, { OfferData } from '../components/OfferList/offer-list';
import Header from '../components/Header/header';


type FavoritesPageProps = {
  offers: OfferData[];
};

const FavoritesPage: React.FC<FavoritesPageProps> = ({ offers }) => (
  <div className="page">
    <Header/>
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
