import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentForm from '../components/CommentForm/comment-form';
import ReviewList from '../components/Review/review-list';
import Map from '../components/map/map';
import OfferList from '../components/OfferList/offer-list';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffer, fetchNearOffers, fetchComments, toggleFavoriteOnServer } from '../store/thunks';
import { AppDispatch } from '../store';
import { resetOffer } from '../store/reducer';
import { AppRoutes } from '../constants';
import NotFoundPage from './not-found-page';
import Spinner from '../components/Spinner/spinner';
import { selectAuthorizationStatus, selectCurrentOffer, selectCurrentOfferLoading, selectNearOffers, selectComments, } from '../store/selectors';
import FavoriteButton from '../components/FavoriteButton/favorite-button';


const OfferPage: React.FC = () => {
  const { offerId } = useParams<{ offerId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const navigate = useNavigate();
  const authorizationStatus = useSelector(selectAuthorizationStatus);


  useEffect(() => {
    dispatch(resetOffer());
    if (offerId) {
      dispatch(fetchOffer(offerId));
      dispatch(fetchNearOffers(offerId));
      dispatch(fetchComments(offerId));
    }
  }, [offerId, dispatch]);


  const offer = useSelector(selectCurrentOffer);
  const offerLoading = useSelector(selectCurrentOfferLoading);
  const nearOffers = useSelector(selectNearOffers);
  const comments = useSelector(selectComments);
  const nearbyOffers = nearOffers.slice(0, 3);

  const sortedComments = [...comments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);
  const handleFavoriteButtonClick = () => {
    if (authorizationStatus !== 'AUTH') {
      navigate(AppRoutes.Login);
      return;
    }
    if (!offer) {
      return;
    }
    dispatch(
      toggleFavoriteOnServer({
        offerId: offer.id,
        status: offer.isFavorite ? 0 : 1,
      })
    );
  };

  if (offerLoading) {
    return <Spinner />;
  }
  if (!offer) {
    return <NotFoundPage />;
  }

  return (
    <div className="page">

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images?.slice(0, 6).map((img, i) => (
                <div className="offer__image-wrapper" key={img}>
                  <img className="offer__image" src={img} alt={`${offer.title} — photo ${i + 1}`} />
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
                <FavoriteButton
                  isActive={offer.isFavorite}
                  onClick={handleFavoriteButtonClick}
                  className="offer__bookmark-button button"
                >
    To bookmarks
                </FavoriteButton>
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
                  reviews={sortedComments.map((item) => ({
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
              offers={nearbyOffers}
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
