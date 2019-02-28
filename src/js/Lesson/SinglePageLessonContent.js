// @flow
// import Fig from 'figureone';
// import * as React from 'react';
import SimpleLessonContent from './SimpleLessonContent';

class SinglePageLessonContent extends SimpleLessonContent {
  sections: Array<Object>;

  constructor(htmlId: string = 'lesson__content') {
    super(htmlId);
    // this.type = 'singlePageLesson';
    // this.htmlId = htmlId;
    // this.sections = [];
    // this.iconLink = '/';
    // this.iconLinkGrey = '/';
    // this.type = 'simple';
    // this.setTitle();
  }

  initialize() {
    this.sections.push(this.getContent());
    console.log(this.sections)
  }

  // setTitle() {
  //   this.title = '';
  // }

  // // eslint-disable-next-line class-methods-use-this, no-unused-vars
  // setContent() {
  // }
}

export default SinglePageLessonContent;
