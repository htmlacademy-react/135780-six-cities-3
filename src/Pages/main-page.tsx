import React from 'react';
import OfferList from '../components/OfferList/offer-list';
import { Link } from 'react-router-dom';
import Map from '../components/map/map';
import { AppRoutes } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { selectOffersByCity, selectCity } from '../store/selectors';
import CitiesList from '../components/CitiesList/cities-list';
import { setCity } from '../store/action';


const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const currentCity = useSelector(selectCity);
  const offers = useSelector(selectOffersByCity);
  const [activeOfferId, setActiveOfferId] = React.useState<string | null>(null);
  const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoutes.Root}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoutes.Root}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={cities}
              currentCity={currentCity}
              onCityClick={(city) => dispatch(setCity(city))}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {currentCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OfferList offers={offers} onCardHover={setActiveOfferId} className="cities__places-list" />
            </section>
            <div className="cities__right-section">
              <Map offers={offers} activeOfferId={activeOfferId}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default MainPage;

