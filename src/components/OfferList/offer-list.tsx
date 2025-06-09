import React from 'react';
import OfferCard from '../OfferCard/offer-card';

export type OfferData = {
  id: string;
  isPremium: boolean;
  price: number;
  title: string;
  type: string;
  rating: number;
  image: string;
  city: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

type OfferListProps = {
  offers: OfferData[];
  onCardHover?: (id: string | null) => void;
  className?: string;
};

const OfferList: React.FC<OfferListProps> = ({ offers, onCardHover, className }) => (
  <div className={`offer-list ${className || ''}`}>
    {offers.map((offer) => (
      <OfferCard key={offer.id} offer={offer} onHover={onCardHover || (() => {})} />
    ))}
  </div>
);

export default OfferList;
