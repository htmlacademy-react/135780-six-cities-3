import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthorizationStatus, selectUser } from '../../store/selectors';
import { logout } from '../../store/reducer';
import { AppRoutes } from '../../constants';


const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const user = useSelector(selectUser);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('six-cities-token');
    dispatch(logout());
    navigate(AppRoutes.Login);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoutes.Root}>
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === 'AUTH' && user ? (
                <>
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img src={user.avatarUrl} alt="User avatar" style={{ borderRadius: '50%', width: 30, height: 30 }} />
                      </div>
                      <span className="header__user-name user__name">{user.email}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <button className="header__nav-link" onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <span className="header__signout">Sign out</span>
                    </button>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Login}>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
