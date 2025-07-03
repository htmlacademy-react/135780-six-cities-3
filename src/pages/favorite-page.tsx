import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OfferList, { OfferData } from '../components/OfferList/offer-list';
import { AppDispatch } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import { setCity } from '../store/reducer';
import { AppRoutes } from '../constants';
import { fetchFavorites } from '../store/thunks';
import Spinner from '../components/Spinner/spinner';
import { selectFavorites, selectFavoritesLoading, selectFavoritesError } from '../store/selectors';


const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchFavorites()).unwrap();
    };
    fetchData();
  }, [dispatch]);

  const navigate = useNavigate();

  // Получаем только избранные офферы


  const offers: OfferData[] = useSelector(selectFavorites);
  const isLoading = useSelector(selectFavoritesLoading);
  const error = useSelector(selectFavoritesError);
  const isEmpty = offers.length === 0;

  // Группировка по городам
  const groupedOffersByCity = offers.reduce<Record<string, OfferData[]>>((groupedOffers, offer) => {
    const cityName = offer.city.name;
    if (!groupedOffers[cityName]) {
      groupedOffers[cityName] = [];
    }
    groupedOffers[cityName].push(offer);
    return groupedOffers;
  }, {});

  const handleCityClick = (city: string) => {
    dispatch(setCity(city));
    navigate(AppRoutes.Root);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
  }

  return (
    <div className={`page${isEmpty ? ' page--favorites-empty' : ''}`}>

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
                {Object.entries(groupedOffersByCity).map(([city, cityOffers]) => (
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
                    <OfferList key={offers.length} offers={cityOffers} className="favorites__places" isFavorites />

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
