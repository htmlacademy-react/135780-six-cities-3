import Review from '../review/review';

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
  totalCommentsCount: number;
};

const MAX_COMMENTS = 10;


function sortByDate(reviews: ReviewData[]) {
  return [...reviews]
    .sort((firstReview, secondReview) => new Date(secondReview.date).getTime() - new Date(firstReview.date).getTime())
    .slice(0, MAX_COMMENTS);
}

function ReviewList ({ comments, totalCommentsCount }: ReviewListProps) {
  const sortedComments = sortByDate(comments);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Отзывы · <span className="reviews__amount">{totalCommentsCount}</span>
      </h2>
      <ul className="reviews__list">
        {sortedComments.map((comment) => (
          <Review key={comment.id} {...comment} />
        ))}
      </ul>
    </section>
  );
}

export default ReviewList;
