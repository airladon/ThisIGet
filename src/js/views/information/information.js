// @flow

import React from 'react';
import ReactDOM from 'react-dom';
// import './privacy.scss';
import ViewInformation from '../../components/viewInformation';
import withLoginManager from '../../components/view';

const policyPage = (content: string) => {
  const id: HTMLElement | null = document.getElementById('information');

  const InformationView = withLoginManager(ViewInformation);
  if (id instanceof HTMLElement) {
    ReactDOM.render(
      <div>
         <InformationView content={content}/>
       </div>,
      id,
    );
  }
};

export default policyPage;
