// @flow
// import Fig from 'figureone';
import * as React from 'react';
import SimpleLessonContent from './SimpleLessonContent';

class SinglePageLessonContent extends SimpleLessonContent {
  // $FlowFixMe
  sections: Array<Array<string | React.Element<'div'>>>;
  diagram: Object;
  diagramHtmlId: string;
  content: Array<string | React.Element<'div'>>
  modifiers: Object;

  constructor(htmlId: string = 'lesson__content') {
    super(htmlId);
    this.diagramHtmlId = `${htmlId}_diagram`;
    this.content = [];
    this.modifiers = {};
  }

  initialize() {
    this.setDiagram(this.diagramHtmlId);
    this.diagram.resize();
    this.setElementContent();
    this.setContent();
    if (typeof this.content === 'string') {
      this.content = [this.content];
    }
    this.sections.push(this.content);
  }

  // eslint-disable-next-line class-methods-use-this
  setElementContent() {
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  setDiagram(diagramHtmlId: string) {
  }

  // setTitle() {
  //   this.title = '';
  // }

  // // eslint-disable-next-line class-methods-use-this, no-unused-vars
  // setContent() {
  // }
}

export default SinglePageLessonContent;
