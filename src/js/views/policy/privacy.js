// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './privacy.scss';
import ViewPolicy from '../../components/viewPolicy';
import withLoginManager from '../../components/view';
import content from './privacy.md';

const aboutPage = () => {
  const id: HTMLElement | null = document.getElementById('about');

  const PolicyView = withLoginManager(ViewPolicy);
  if (id instanceof HTMLElement) {
    ReactDOM.render(
      <div>
         <PolicyView content={content}/>
       </div>,
      id,
    );
  }
};

export default aboutPage;
