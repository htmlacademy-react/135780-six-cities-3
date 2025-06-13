import React from 'react';
import './spinner.css';

const Spinner: React.FC = () => (
  <div className="spinner__wrapper">
    <div className="spinner" />
    <span className="spinner__text">Загрузка...</span>
  </div>
);

export default Spinner;
