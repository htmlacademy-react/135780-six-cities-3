import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants';

const Footer: React.FC = () => (
  <footer className="footer container">
    <Link className="footer__logo-link" to={AppRoutes.Root}>
      <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33" />
    </Link>
  </footer>
);

export default Footer;
