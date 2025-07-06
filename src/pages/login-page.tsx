import React, { useState, useMemo, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/thunks';
import { selectAuthorizationStatus } from '../store/selectors';
import { Link, useNavigate, Navigate} from 'react-router-dom';
import { AppRoutes, cities } from '../constants';
import type { AppDispatch } from '../store';
import { setCity } from '../store/reducer';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const navigate = useNavigate();
  const randomCity = useMemo(() => cities[Math.floor(Math.random() * cities.length)], []);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [enterPressed, setEnterPressed] = useState(false);

  const handlePasswordInput = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword((event.target as HTMLInputElement).value);
  };

  const handlePasswordKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setEnterPressed(true);
    }
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const emailValue = (formData.get('email') as string).trim();
    const passwordValue = (formData.get('password') as string).trim();

    if (!emailValue || !passwordValue) {
      return;
    }

    dispatch(login({ email: emailValue, password: passwordValue }));
  };

  const handleCityClick = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(setCity(randomCity));
    navigate(AppRoutes.Root);
  };

  useEffect(() => {
    if (authorizationStatus === 'AUTH') {
      setTimeout(() => setShouldRedirect(true), 200);
    }
  }, [authorizationStatus]);

  useEffect(() => {
    if (enterPressed) {
      setEnterPressed(false);
      formRef.current?.requestSubmit();
    }
  }, [password, enterPressed]);

  if (shouldRedirect) {
    return <Navigate to={AppRoutes.Root} />;
  }

  return (
    <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              ref={formRef}
              className="login__form form"
              onSubmit={handleSubmit}
            >
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
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$"
                  onInput={handlePasswordInput}
                  onKeyDown={handlePasswordKeyDown}
                  title="Пароль должен содержать хотя бы одну латинскую букву и одну цифру"
                />
              </div>
              <button className="login__submit form__submit button" type="submit" disabled={isSubmitting}>Sign in</button>
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

