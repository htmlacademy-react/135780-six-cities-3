import React from 'react';

type FavoriteButtonProps = {
  isActive: boolean;
  onClick: () => void;
  className?: string;
  iconWidth?: number;
  iconHeight?: number;
  children?: React.ReactNode;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isActive,
  onClick,
  className = '',
  iconWidth = 31,
  iconHeight = 33,
  children,
}) => (
  <button
    className={`button${isActive ? ' place-card__bookmark-button--active' : ''} ${className}`}
    type="button"
    onClick={onClick}
  >
    <svg className="offer__bookmark-icon" width={iconWidth} height={iconHeight}>
      <use xlinkHref="#icon-bookmark"></use>
    </svg>
    <span className="visually-hidden">{children || 'To bookmarks'}</span>
  </button>
);

export default FavoriteButton;
