import React from 'react';
import OfferCard from '../OfferCard/offer-card';

export type OfferData = {
   id: string;
  title: string;
  type: string;
  price: number;
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
};

const OfferList: React.FC<OfferListProps> = ({ offers, onCardHover, className }) => (
  <div className={`offer-list ${className || ''}`}>
    {offers.map((offer) => (
      <OfferCard key={offer.id} offer={{ ...offer, image: offer.previewImage }} onHover={onCardHover || (() => {})}/>
    ))}
  </div>
);

export default OfferList;
