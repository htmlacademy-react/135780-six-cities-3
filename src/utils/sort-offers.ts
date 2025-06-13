import { OfferData } from '../components/OfferList/offer-list';

export type SortType = 'Popular' | 'PriceLowToHigh' | 'PriceHighToLow' | 'TopRatedFirst';

export function getSortedOffers(offers: OfferData[], sortType: SortType): OfferData[] {
  switch (sortType) {
    case 'PriceLowToHigh':
      return [...offers].sort((a, b) => a.price - b.price);
    case 'PriceHighToLow':
      return [...offers].sort((a, b) => b.price - a.price);
    case 'TopRatedFirst':
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
}
