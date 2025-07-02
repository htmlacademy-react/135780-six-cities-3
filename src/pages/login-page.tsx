import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/thunks';
import { selectAuthorizationStatus } from '../store/selectors';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes, cities } from '../constants';
import type { AppDispatch } from '../store';
import { setCity } from '../store/reducer';
import { useEffect } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const navigate = useNavigate();

  const randomCity = useMemo(() => cities[Math.floor(Math.random() * cities.length)], []);


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleCityClick = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(setCity(randomCity));
    navigate(AppRoutes.Root);
  };

  //с ним не проходит "Валидация логина и пароля шаг 44", но без него не проходит "При переключении страниц форма очищается" шаг 41
  useEffect(() => {
    if (authorizationStatus === 'AUTH') {
      navigate(AppRoutes.Root);
    }
  }, [authorizationStatus, navigate]);

  return (
    <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoutes.Root}
                onClick={handleCityClick}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;

