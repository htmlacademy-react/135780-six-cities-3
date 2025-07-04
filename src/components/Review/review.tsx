import React from 'react';
import { getStarsRating } from '../../utils/stars-rating';

type ReviewProps = {
  avatar: string;
  username: string;
  text: string;
  date: string;
  rating: number;
};

const Review: React.FC<ReviewProps> = ({ avatar, username, text, date, rating }) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={avatar}
          width="54"
          height="54"
          alt="Review avatar"
        />
      </div>
      <span className="reviews__user-name">{username}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <span style={{ width: getStarsRating(rating) }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      <p className="reviews__text">{text}</p>
      <time className="reviews__time" dateTime={date}>
        {new Date(date).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
      </time>
    </div>
  </li>
);

export default Review;
