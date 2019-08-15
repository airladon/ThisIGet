// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './privacy.scss';
import ViewPolicy from '../../components/viewPolicy';
import withLoginManager from '../../components/view';

const policyPage = (content: string) => {
  const id: HTMLElement | null = document.getElementById('policy');

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

export default policyPage;
