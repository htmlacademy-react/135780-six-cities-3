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
  comments: ReviewData[];
  totalCommentsCount?: number;
};

const MAX_COMMENTS = 10;

function sortByDate(comments: ReviewData[]) {
  return [...comments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_COMMENTS);
}

const ReviewList: React.FC<ReviewListProps> = ({ comments, totalCommentsCount }) => {
  const sortedComments = sortByDate(comments);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Отзывы · <span className="reviews__amount">{totalCommentsCount ?? comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedComments.map((comment) => (
          <Review key={comment.id} {...comment} />
        ))}
      </ul>
    </section>
  );
};

export default ReviewList;
