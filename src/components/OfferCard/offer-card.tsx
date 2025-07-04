import React from 'react';
import { Link, generatePath } from 'react-router-dom';
import { AppRoutes } from '../../constants';

type Offer = {
  id: string;
  isPremium: boolean;
  price: number;
  title: string;
  type: string;
  rating: number;
  previewImage: string;
};

type OfferCardProps = {
  offer: Offer;
  isActive?: boolean;
  onHover: (id: string | null) => void;
};

const OfferCard: React.FC<OfferCardProps> = ({ offer, isActive, onHover }) => {
  const { isPremium, price, title, type, rating } = offer;
  const ratingPercentage = `${Math.round(rating) * 20}%`;
  const detailUrl = generatePath(AppRoutes.Offer, { offerId: offer.id.toString() });

  return (
    <article
      className={`cities__card place-card${isActive ? ' place-card--active' : ''}`}
      onMouseEnter={() => onHover(offer.id.toString())}
      onMouseLeave={() => onHover(null)}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={detailUrl}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
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
