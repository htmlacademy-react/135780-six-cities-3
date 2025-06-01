import React from 'react';
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

type NearOffersListProps = {
  offers: Offer[];
};

const NearOffersList: React.FC<NearOffersListProps> = ({ offers }) => (
  <div className="near-places__list places__list">
    {offers.map((offer) => (
      <div key={offer.id}>
        <OfferCard offer={offer} />
      </div>
    ))}
  </div>
);

export default NearOffersList;
