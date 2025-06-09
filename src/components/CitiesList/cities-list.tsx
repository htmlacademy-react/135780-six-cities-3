import React from 'react';

type CitiesListProps = {
  cities: string[];
  currentCity: string;
  onCityClick: (city: string) => void;
};

const CitiesList: React.FC<CitiesListProps> = ({ cities, currentCity, onCityClick }) => (
  <ul className="locations__list tabs__list">
    {cities.map((city) => (
      <li className="locations__item" key={city}>
        <a
          className={`locations__item-link tabs__item${city === currentCity ? ' tabs__item--active' : ''}`}
          href="#"
          onClick={(evt) => {
            evt.preventDefault();
            onCityClick(city);
          }}
        >
          <span>{city}</span>
        </a>
      </li>
    ))}
  </ul>
);

export default CitiesList;
