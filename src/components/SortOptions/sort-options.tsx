import React, { useState } from 'react';

export type SortType = 'Popular' | 'PriceLowToHigh' | 'PriceHighToLow' | 'TopRatedFirst';

type SortOptionsProps = {
  activeSort: SortType;
  onSortChange: (sort: SortType) => void;
};

const sortLabels: Record<SortType, string> = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
};

const sortTypes: SortType[] = [
  'Popular',
  'PriceLowToHigh',
  'PriceHighToLow',
  'TopRatedFirst',
];

const SortOptions: React.FC<SortOptionsProps> = ({ activeSort, onSortChange }) => {
  const [opened, setOpened] = useState(false);

  const handleTypeClick = () => setOpened((prev) => !prev);

  const handleOptionClick = (type: SortType) => {
    onSortChange(type);
    setOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleTypeClick}
        style={{ cursor: 'pointer' }}
      >
        {sortLabels[activeSort]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${opened ? ' places__options--opened' : ''}`}>
        {opened &&
          sortTypes.map((type) => (
            <li
              key={type}
              className={`places__option${activeSort === type ? ' places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => handleOptionClick(type)}
            >
              {sortLabels[type]}
            </li>
          ))}
      </ul>
    </form>
  );
};

export default SortOptions;
