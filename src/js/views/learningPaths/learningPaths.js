// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './learningPaths.scss';
import ViewLearningPaths from '../../components/viewLearningPaths';
import withLoginManager from '../../components/view';

const homePage = () => {
  const id: HTMLElement | null = document.getElementById('learning_paths');

  const View = withLoginManager(ViewLearningPaths);
  if (id instanceof HTMLElement) {
    ReactDOM.render(
      <div>
        <View/>
      </div>,
      id,
    );
  }
};

homePage();
