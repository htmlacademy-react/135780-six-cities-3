import { StarsRating } from '../constants';

export function getStarsRating(rating: number): StarsRating {
  const rounded = Math.round(rating);
  switch (rounded) {
    case 1: return StarsRating.OneStar;
    case 2: return StarsRating.TwoStars;
    case 3: return StarsRating.ThreeStars;
    case 4: return StarsRating.FourStars;
    case 5: return StarsRating.FiveStars;
    default: return StarsRating.FiveStars;
  }
}
