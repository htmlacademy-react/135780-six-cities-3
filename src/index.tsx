import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffers, checkAuth, fetchFavorites } from './store/thunks';

store.dispatch(fetchOffers());
store.dispatch(checkAuth()).then(() => {
  if (store.getState().authorizationStatus === 'AUTH') {
    store.dispatch(fetchFavorites());
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
