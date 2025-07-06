import React from 'react';
import OfferList, { OfferData } from '../components/offerlist/offer-list';
import Map from '../components/map/map';
import { useSelector, useDispatch } from 'react-redux';
import { selectOffersByCity, selectCity, selectOffersLoading, selectOffersError} from '../store/selectors';
import CitiesList from '../components/citieslist/cities-list';
import { setCity } from '../store/reducer';
import SortOptions from '../components/sortoptions/sort-options';
import Spinner from '../components/spinner/spinner';
import { getSortedOffers, SortType } from '../utils/sort-offers';
import { cities } from '../constants';
import MainEmpty from '../components/mainempty/main-empty';
import type { AppDispatch } from '../store';

const MainPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
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
      <MainEmpty
        city={currentCity}
        onCityClick={(city) => dispatch(setCity(city))}
      />
    );
  }

  return (
    <div className="page page--gray page--main">
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
              <b className="places__found">
                {sortedOffers.length} {sortedOffers.length === 1 ? 'place' : 'places'} to stay in {currentCity}
              </b>              <SortOptions activeSort={sortType} onSortChange={setSortType} />
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
