import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { setOffers } from './store/action';
import { offers as mockOffers } from './mocks/offers';

// Инициализация стора тестовыми данными
store.dispatch(setOffers(mockOffers.map((offer) => ({
  ...offer,
  id: offer.id.toString(),
}))));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={mockOffers} />
    </Provider>
  </React.StrictMode>
);
