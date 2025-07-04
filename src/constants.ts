export const offers = [
  {
    id: 1,
    isPremium: true,
    price: 120,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    rating: 4,
    image: 'img/apartment-01.jpg',
  },
  {
    id: 2,
    isPremium: false,
    price: 80,
    title: 'Wood and stone place',
    type: 'Room',
    rating: 4,
    image: 'img/room.jpg',
  },
  {
    id: 3,
    isPremium: false,
    price: 132,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    rating: 5,
    image: 'img/apartment-02.jpg',
  },
  {
    id: 4,
    isPremium: true,
    price: 180,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    rating: 5,
    image: 'img/apartment-03.jpg',
  },
  {
    id: 5,
    isPremium: true,
    price: 80,
    title: 'Wood and stone place',
    type: 'Room',
    rating: 4,
    image: 'img/room.jpg',
  },
];

export const AppRoutes = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:offerId',
  NotFound: '*',
} as const;

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export enum StarsRating {
  OneStar = '20%',
  TwoStars = '40%',
  ThreeStars = '60%',
  FourStars = '80%',
  FiveStars = '100%',
}
