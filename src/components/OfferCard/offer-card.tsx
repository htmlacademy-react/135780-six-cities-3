import React from 'react';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavoriteOnServer } from '../../store/thunks';
import { selectAuthorizationStatus } from '../../store/selectors';
import type { AppDispatch } from '../../store';
import FavoriteButton from '../FavoriteButton/favorite-button';


type Offer = {
  id: string;
  isPremium: boolean;
  price: number;
  title: string;
  type: string;
  rating: number;
  previewImage: string;
  isFavorite: boolean;
};

type OfferCardProps = {
  offer: Offer;
  isActive?: boolean;
  onHover?: (id: string | null) => void;
  isFavorites?: boolean;
};

const OfferCard: React.FC<OfferCardProps> = ({ offer, isActive, onHover, isFavorites }) => {
  const { isPremium, price, title, type, rating, isFavorite } = offer;
  const ratingPercentage = `${Math.round(rating) * 20}%`;
  const detailUrl = generatePath(AppRoutes.Offer, { offerId: offer.id.toString() });
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const navigate = useNavigate();


  const handleBookmarkClick = () => {
    if (authorizationStatus !== 'AUTH') {
      navigate(AppRoutes.Login);
      return;
    }
    dispatch(toggleFavoriteOnServer({ offerId: offer.id, status: offer.isFavorite ? 0 : 1 }));
  };

  const cardClass = isFavorites ? 'favorites__card place-card' : `cities__card place-card${isActive ? ' place-card--active' : ''}`;
  const imageWrapperClass = isFavorites ? 'favorites__image-wrapper place-card__image-wrapper' : 'cities__image-wrapper place-card__image-wrapper';
  const infoClass = isFavorites ? 'favorites__card-info place-card__info' : 'place-card__info';
  const imageWidth = isFavorites ? 150 : 260;
  const imageHeight = isFavorites ? 110 : 200;

  return (
    <article
      className={cardClass}
      onMouseEnter={() => onHover?.(offer.id.toString())}
      onMouseLeave={() => onHover?.(null)}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClass}>
        <Link to={detailUrl}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={imageWidth}
            height={imageHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={infoClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            isActive={isFavorite}
            onClick={handleBookmarkClick}
            className="place-card__bookmark-button"
            iconWidth={18}
            iconHeight={19}
          >
            {isFavorites ? 'In bookmarks' : 'To bookmarks'}
          </FavoriteButton>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingPercentage }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={detailUrl}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default OfferCard;
