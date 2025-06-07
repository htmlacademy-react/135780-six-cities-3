import React from 'react';
import Review from './review';

export type ReviewData = {
  id: string;
  avatar: string;
  username: string;
  rating: number;
  text: string;
  date: string;
};

type ReviewListProps = {
  reviews: ReviewData[];
};

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} {...review} />
      ))}
    </ul>
  </section>
);

export default ReviewList;
