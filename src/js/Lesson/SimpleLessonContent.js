// @flow
// import Fig from 'figureone';
// import * as React from 'react';

class SimpleLessonContent {
  title: string;
  sections: Array<Object>;
  iconLink: string;
  iconLinkGrey: string;
  type: 'presentation' | 'simple';
  htmlId: string;

  constructor(htmlId: string = 'lesson__content') {
    this.htmlId = htmlId;
    this.sections = [];
    this.iconLink = '/';
    this.iconLinkGrey = '/';
    this.type = 'simple';
    this.setTitle();
  }

  initialize() {
    this.setContent(this.htmlId);
  }

  setTitle() {
    this.title = '';
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  setContent(htmlId: string) {
  }
}

export default SimpleLessonContent;
