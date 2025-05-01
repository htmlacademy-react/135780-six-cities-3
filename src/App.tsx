import React from 'react';
import MainPage from './components/MainPage/MainPage';
import { offers } from './constants';

const App: React.FC = () => (
  <MainPage offersCount={offers.length} />
);

export default App;
