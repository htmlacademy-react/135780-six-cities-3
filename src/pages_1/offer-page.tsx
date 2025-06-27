import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm/comment-form';
import ReviewList from '../components/Review/review-list';
import Map from '../components/map/map';
import OfferList from '../components/OfferList/offer-list';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffer, fetchNearOffers, fetchComments } from '../store/thunks';
import { RootState, AppDispatch } from '../store';
import Header from '../components/Header/header';
import { Navigate } from 'react-router-dom';
import { resetOffer } from '../store/reducer';
import { AppRoutes } from '../constants';
import Spinner from '../components/Spinner/spinner';


const OfferPage: React.FC = () => {
  const { offerId } = useParams<{ offerId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);


  useEffect(() => {
    dispatch(resetOffer());
    if (offerId) {
      dispatch(fetchOffer(offerId));
      dispatch(fetchNearOffers(offerId));
      dispatch(fetchComments(offerId));
    }
  }, [offerId, dispatch]);


  const offer = useSelector((state: RootState) => state.currentOffer);
  const offerLoading = useSelector((state: RootState) => state.currentOfferLoading);
  const offerError = useSelector((state: RootState) => state.currentOfferError);
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);
  const nearOffers = useSelector((state: RootState) => state.nearOffers);
  const comments = useSelector((state: RootState) => state.comments);

  if (offerLoading) {
    return <Spinner />;
  }
  if (offerError) {
    return <Navigate to={AppRoutes.NotFound} replace />;
  }
  if (!offer) {
    return <div>Нет данных</div>;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images?.slice(0, 6).map((img, i) => (
                <div className="offer__image-wrapper" key={img}>
                  <img className="offer__image" src={img} alt={`Photo ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button className={`offer__bookmark-button button${offer.isFavorite ? ' offer__bookmark-button--active' : ''}`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.rating * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">Whats inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>{good}</li>
                  ))}
                </ul>
              </div>

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>

                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                  <div className="offer__description">
                    <p className="offer__text">{offer.description}</p>
                  </div>
                </div>
              </div>

              <section className="offer__reviews reviews">
                <ReviewList
                  reviews={comments.map((item) => ({
                    id: item.id,
                    avatar: item.user.avatarUrl,
                    username: item.user.name,
                    rating: item.rating,
                    text: item.comment,
                    date: item.date,
                  }))}
                />
                {authorizationStatus === 'AUTH' && <CommentForm offerId={offer.id} />}
              </section>
            </div>
          </div>

          <section className="offer__map-container container">
            <Map offers={[offer, ...nearOffers.slice(0, 3)]} activeOfferId={activeOfferId} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList
              offers={nearOffers.slice(0, 3)}
              onCardHover={setActiveOfferId}
              className="near-places__list places__list"
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;
