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
}) => {

  const baseClass = className.trim().replace(' button', '');
  const activeClass = isActive ? `${baseClass}--active` : '';
  const buttonClass = [baseClass, activeClass, 'button'].filter(Boolean).join(' ');

  const iconClass = baseClass.replace('__bookmark-button', '__bookmark-icon');

  return (
    <button
      className={buttonClass}
      type="button"
      onClick={onClick}
    >
      <svg className={iconClass} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{children || 'To bookmarks'}</span>
    </button>
  );
};

export default FavoriteButton;
