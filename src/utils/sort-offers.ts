import { OfferData } from '../components/offer-list/offer-list';

export type SortType = 'Popular' | 'PriceLowToHigh' | 'PriceHighToLow' | 'TopRatedFirst';

export function getSortedOffers(offerList: OfferData[], selectedSortType: SortType): OfferData[] {
  switch (selectedSortType) {
    case 'PriceLowToHigh':
      return [...offerList].sort((firstOffer, secondOffer) => firstOffer.price - secondOffer.price);
    case 'PriceHighToLow':
      return [...offerList].sort((firstOffer, secondOffer) => secondOffer.price - firstOffer.price);
    case 'TopRatedFirst':
      return [...offerList].sort((firstOffer, secondOffer) => secondOffer.rating - firstOffer.rating);
    default:
      return offerList;
  }
}
