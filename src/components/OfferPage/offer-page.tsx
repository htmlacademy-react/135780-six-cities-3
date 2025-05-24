import React from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../CommentForm/comment-form';

const OfferPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="page">
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/room.jpg" alt="Photo studio" />
              </div>
            </div>
            <p>Offer ID: {id}</p>
            <section className="offer__reviews reviews">
              <CommentForm />
            </section>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OfferPage;
