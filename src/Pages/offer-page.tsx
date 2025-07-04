import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm/comment-form';
import ReviewList, { ReviewData } from '../components/Review/review-list';
import Map from '../components/map/map';
import OfferList from '../components/OfferList/offer-list';

const dummyReviews: ReviewData[] = [
  {
    id: '1',
    avatar: 'img/avatar-max.jpg',
    username: 'Max',
    rating: 4.8,
    text: 'A quiet and charming place in Amsterdam.',
    date: '2019-04-24',
  },
  {
    id: '2',
    avatar: 'img/avatar-angelina.jpg',
    username: 'Angelina',
    rating: 5,
    text: 'Luxurious apartment with modern amenities.',
    date: '2020-07-15',
  },
];

// Тестовые данные для объявлений неподалёку.
const nearOffers = [
  {
    id: '101',
    isPremium: false,
    isFavorite: false,
    price: 120,
    title: 'Уютная квартира неподалёку 1',
    type: 'Apartment',
    rating: 4.5,
    image: 'img/apartment-01.jpg',
    previewImage: 'img/apartment-01.jpg',
    city: {
      name: 'Paris',
      location: { latitude: 52.3909553943508, longitude: 4.85309666406198, zoom: 8 }
    },
    location: { latitude: 52.3909553943508, longitude: 4.85309666406198, zoom: 8 },
  },
  {
    id: '102',
    isPremium: true,
    isFavorite: true,
    price: 180,
    title: 'Стильный лофт неподалёку',
    type: 'Loft',
    rating: 5,
    image: 'img/apartment-02.jpg',
    previewImage: 'img/apartment-02.jpg',
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.369553943508, longitude: 4.85309666406198, zoom: 8 }
    },
    location: { latitude: 52.369553943508, longitude: 4.85309666406198, zoom: 8 },
  },
  {
    id: '103',
    isPremium: false,
    isFavorite: false,
    price: 90,
    title: 'Комната неподалёку',
    type: 'Room',
    rating: 4.2,
    image: 'img/apartment-small-04.jpg',
    previewImage: 'img/apartment-small-04.jpg',
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.3909553943508, longitude: 4.929309666406198, zoom: 8 }
    },
    location: { latitude: 52.3909553943508, longitude: 4.929309666406198, zoom: 8 },
  },
];

const OfferPage: React.FC = () => {
  const { id } = useParams();
  // Поднимаем состояние для активного предложения. Тип приводим к строке.
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  return (
    <div className="page">
      <main className="page__main page__main--offer">
        {/* Основная информация об объявлении */}
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/room.jpg" alt="Photo studio" />
              </div>
            </div>
            <p>Offer ID: {id}</p>
            {/* Блок с отзывами */}
            <div className="offer__container container">
              <section className="offer__reviews reviews">
                <ReviewList reviews={dummyReviews} />
                <CommentForm />
              </section>
            </div>
          </div>
          {/* Блок с картой, где отображаются объявления неподалёку */}
          <section className="offer__map-container container">
            <Map offers={nearOffers} activeOfferId={activeOfferId} />
          </section>
        </section>
        {/* Новый блок «Other places in the neighbourhood» */}
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList offers={nearOffers} onCardHover={setActiveOfferId} className="cities__places-list" />
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;
