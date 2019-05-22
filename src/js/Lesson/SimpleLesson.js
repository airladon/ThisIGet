// @flow
// import Fig from 'figureone';
// import SimpleLessonContent from './SimpleLessonContent';
// import { PresentationLessonContent } from './PresentationLessonContent';
// import Diagram from '../diagram/Diagram';

// const { Diagram } = Fig;

class SimpleLesson {
  content: Object;
  type: 'simple' | 'singlePage' | 'presentation' | 'links';

  constructor(content: Object) {
    this.content = content;
    this.type = 'simple';
  }

  initialize() {
    this.content.initialize();
  }
}

export default SimpleLesson;
