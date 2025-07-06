import React from 'react';
import OfferCard from '../offercard/offer-card';
import { OfferData } from '../offerlist/offer-list';

type NearOfferListProps = {
  offers: OfferData[];
  onCardHover?: (id: string | null) => void;
  className?: string;
};

const NearOfferList: React.FC<NearOfferListProps> = ({ offers, onCardHover, className }) => (
  <div className={`near-offers-list ${className || ''}`}>
    {offers.map((offer) => (
      <OfferCard key={offer.id} offer={offer} onHover={onCardHover || (() => {})} />
    ))}
  </div>
);

export default NearOfferList;
