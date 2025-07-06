import React from 'react';
import OfferCard from '../offercard/offer-card';

export type OfferData = {
   id: string;
  title: string;
  type: string;
  price: number;
  images: string[];
  goods: string[];
  description: string;
  bedrooms: number;
  maxAdults: number;
  host: {
    name: string;
  avatarUrl: string;
  isPro: boolean;
  };
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
 location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

type OfferListProps = {
  offers: OfferData[];
  onCardHover?: (id: string | null) => void;
  className?: string;
  isFavorites?: boolean;
  isNearPlaces?: boolean;
};

const OfferList: React.FC<OfferListProps> = ({ offers, onCardHover, className, isFavorites, isNearPlaces }) => (
  <div className={`offer-list ${className || ''}`}>
    {offers.map((offer) => (
      <OfferCard
        key={offer.id}
        offer={offer}
        onHover={onCardHover}
        isFavorites={isFavorites}
        isNearPlaces={isNearPlaces}
      />
    ))}
  </div>
);

export default OfferList;
