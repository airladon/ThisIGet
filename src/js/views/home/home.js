// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './home.scss';
import ViewHome from '../../components/viewHome';
import withLoginManager from '../../components/view';

const homePage = () => {
  const id: HTMLElement | null = document.getElementById('home');

  const HomeView = withLoginManager(ViewHome, true);
  if (id instanceof HTMLElement) {
    ReactDOM.render(
      <div>
        <HomeView/>
      </div>,
      id,
    );
  }
};

homePage();
