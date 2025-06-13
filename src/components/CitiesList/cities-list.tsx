import React from 'react';
import { Link } from 'react-router-dom';

type CitiesListProps = {
  cities: string[];
  currentCity: string;
  onCityClick: (city: string) => void;
};

const CitiesList: React.FC<CitiesListProps> = ({ cities, currentCity, onCityClick }) => (
  <ul className="locations__list tabs__list">
    {cities.map((city) => (
      <li className="locations__item" key={city}>
        <Link
          className={`locations__item-link tabs__item${city === currentCity ? ' tabs__item--active' : ''}`}
          to="/"
          onClick={() => onCityClick(city)}
        >
          <span>{city}</span>
        </Link>
      </li>
    ))}
  </ul>
);

export default CitiesList;
