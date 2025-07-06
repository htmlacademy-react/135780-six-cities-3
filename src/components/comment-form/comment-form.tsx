import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../store/thunks';
import type { AppDispatch, RootState } from '../../store';


const ratingTitles: Record<number, string> = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};

type CommentFormProps = {
  offerId: string;
};

export const ReviewLength = {
  Min: 50,
  Max: 300,
} as const;

const CommentForm: React.FC<CommentFormProps> = ({ offerId }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const isPosting = useSelector((state: RootState) => state.isPostingComment);
  const postError = useSelector((state: RootState) => state.postCommentError);

  const dispatch = useDispatch<AppDispatch>();


  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    if (!offerId) {
      return;
    }
    try {
      await dispatch(
        postComment({ offerId, data: { comment, rating } })
      ).unwrap();
      setComment('');
      setRating(0);
    } catch (_) {
      // Ошибка уже обработана в thunk
    }
  };

  return (
    <form
      className="reviews__form form"
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              checked={rating === star}
              onChange={handleRatingChange}
              disabled={isPosting}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={ratingTitles[star]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        minLength={ReviewLength.Min}
        disabled={isPosting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={comment.length < ReviewLength.Min || comment.length > ReviewLength.Max || rating === 0 || isPosting}
        >
          Submit
        </button>
      </div>
      {postError && <div className="form__error">{postError}</div>}
    </form>
  );
};

export default CommentForm;
