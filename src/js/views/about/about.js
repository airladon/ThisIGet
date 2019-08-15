// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './about.scss';
import ViewAbout from '../../components/viewAbout';
import withLoginManager from '../../components/view';
import about from './about.md';

const aboutPage = () => {
  const id: HTMLElement | null = document.getElementById('about');

  const AboutView = withLoginManager(ViewAbout);
  if (id instanceof HTMLElement) {
    ReactDOM.render(
      <div>
         <AboutView content={about}/>
       </div>,
      id,
    );
  }
};

export default aboutPage;
