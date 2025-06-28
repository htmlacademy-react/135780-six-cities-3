import React from 'react';
import OfferList, { OfferData } from '../components/OfferList/offer-list';
import Map from '../components/map/map';
import { useSelector, useDispatch } from 'react-redux';
import { selectOffersByCity, selectCity, selectOffersLoading, selectOffersError} from '../store/selectors';
import CitiesList from '../components/CitiesList/cities-list';
import { setCity } from '../store/reducer';
import SortOptions from '../components/SortOptions/sort-options';
import Spinner from '../components/Spinner/spinner';
import { getSortedOffers, SortType } from '../utils/sort-offers';
import Header from '../components/Header/header';
import { cities } from '../constants';
import MainEmpty from '../components/MainEmpty/main-empty';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const currentCity = useSelector(selectCity);
  const offersLoading = useSelector(selectOffersLoading);
  const offersError = useSelector(selectOffersError);
  const offers: OfferData[] = useSelector(selectOffersByCity);
  const [activeOfferId, setActiveOfferId] = React.useState<string | null>(null);
  const [sortType, setSortType] = React.useState<SortType>('Popular');

  const sortedOffers = getSortedOffers(offers, sortType);

  if (offersLoading) {
    return <Spinner />;
  }

  if (offersError) {
    return <p style={{color: 'red'}}>{offersError}</p>;
  }

  if (offers.length === 0) {
    return (
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index page__main--index-empty">
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
            <MainEmpty city={currentCity} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header/>

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
