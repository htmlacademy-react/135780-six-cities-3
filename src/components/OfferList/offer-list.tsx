import React, { useState } from 'react';
import OfferCard from '../OfferCard/offer-card';

type Offer = {
  id: number;
  isPremium: boolean;
  price: number;
  title: string;
  type: string;
  rating: number;
  image: string;
};

type OfferListProps = {
  offers: Offer[];
  className?: string;
};

const OfferList: React.FC<OfferListProps> = ({ offers, className = 'cities__places-list places__list tabs__content' }) => {
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);

  return (
    <div className={className}>
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => setActiveOfferId(offer.id)}
          onMouseLeave={() => setActiveOfferId(null)}
        >
          <OfferCard offer={offer} isActive={activeOfferId === offer.id} />
        </div>
      ))}
    </div>
  );
};

export default OfferList;
