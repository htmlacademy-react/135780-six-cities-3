import React from 'react';

type ReviewProps = {
  avatar: string;
  username: string;
  rating: number;
  text: string;
  date: string;
};

const Review: React.FC<ReviewProps> = ({ avatar, username, rating, text, date }) => {
  const ratingPercentage = `${Math.round(rating) * 20}%`;

  return (
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
          <div className="reviews__stars rating__stars">
            <span style={{ width: ratingPercentage }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{text}</p>
        <time className="reviews__time" dateTime={date}>
          {new Date(date).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </time>
      </div>
    </li>
  );
};

export default Review;
