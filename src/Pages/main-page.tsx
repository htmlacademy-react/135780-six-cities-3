import React from 'react';
import OfferList, { OfferData } from '../components/OfferList/offer-list';
import { Link } from 'react-router-dom';
import Map from '../components/map/map';
import { AppRoutes } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { selectOffersByCity, selectCity, selectOffersLoading, selectOffersError, selectAuthorizationStatus, selectUser } from '../store/selectors';
import CitiesList from '../components/CitiesList/cities-list';
import { setCity } from '../store/action';
import SortOptions, { SortType } from '../components/SortOptions/sort-options';
import Spinner from '../components/Spinner/spinner';


const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const currentCity = useSelector(selectCity);
  const offersLoading = useSelector(selectOffersLoading);
  const offersError = useSelector(selectOffersError);
  const offers: OfferData[] = useSelector(selectOffersByCity);
  const [activeOfferId, setActiveOfferId] = React.useState<string | null>(null);
  const [sortType, setSortType] = React.useState<SortType>('Popular');
  const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const user = useSelector(selectUser) as { avatarUrl: string; email: string } | null;
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('six-cities-token');
    // dispatch(logout());
  };

  function getSortedOffers(offersToSort: OfferData[], sort: SortType): OfferData[] {
    switch (sort) {
      case 'PriceLowToHigh':
        return [...offersToSort].sort((a, b) => a.price - b.price);
      case 'PriceHighToLow':
        return [...offersToSort].sort((a, b) => b.price - a.price);
      case 'TopRatedFirst':
        return [...offersToSort].sort((a, b) => b.rating - a.rating);
      default:
        return offersToSort;
    }
  }
  const sortedOffers = getSortedOffers(offers, sortType);

  if (offersLoading) {
    return <Spinner />;
  }

  if (offersError) {
    return <p style={{color: 'red'}}>{offersError}</p>;
  }

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
                {authorizationStatus === 'AUTH' && user ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Login}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img src={user.avatarUrl} alt="User avatar" style={{ borderRadius: '50%', width: 30, height: 30 }} />
                        </div>
                        <span className="header__user-name user__name">{user.email}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to={AppRoutes.Root} onClick={handleLogout}>
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to="/login">
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
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
              <b className="places__found">{sortedOffers.length} places to stay in {currentCity}</b>
              <SortOptions activeSort={sortType} onSortChange={setSortType} />
              <OfferList offers={sortedOffers} onCardHover={setActiveOfferId} className="cities__places-list" />
            </section>
            <div className="cities__right-section">
              <Map offers={sortedOffers} activeOfferId={activeOfferId}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default MainPage;

