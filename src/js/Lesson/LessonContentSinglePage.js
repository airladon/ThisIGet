// @flow
import Fig from 'figureone';
import * as React from 'react';
// const {
//   Transform,
// } = Fig;

const { applyModifiers } = Fig.tools.html;

class LessonContentSinglePage {
  title: string;
  sections: Array<React.Element<'div'>>;
  diagramHtmlId: string;
  iconLink: string;
  iconLinkGrey: string;
  type: string;
  // animationEnd: string;
  // questions

  constructor(htmlId: string = 'lesson_container') {
    this.sections = [];
    this.iconLink = '/';
    this.iconLinkGrey = '/';
    this.type = 'singlePage';
    this.setTitle();
  }

  initialize() {
    this.setContent();
  }

  setTitle() {
    this.title = '';
  }

  // eslint-disable-next-line class-methods-use-this
  setContent() {
  }
}

export {
  LessonContentSinglePage, applyModifiers,
};
