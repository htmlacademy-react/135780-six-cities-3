import React from 'react';
import Header from '../Header/header';
import CitiesList from '../CitiesList/cities-list';
import { cities } from '../../constants';

type MainEmptyProps = {
  city: string;
  onCityClick?: (city: string) => void;
};

const MainEmpty: React.FC<MainEmptyProps> = ({ city, onCityClick }) => (
  <div className="page page--gray page--main">
    <Header />
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList
            cities={cities}
            currentCity={city}
            onCityClick={onCityClick}
          />
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">
                We could not find any property available at the moment in {city}
              </p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    </main>
  </div>
);

export default MainEmpty;
