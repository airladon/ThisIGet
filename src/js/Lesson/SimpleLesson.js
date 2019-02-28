// @flow
// import Fig from 'figureone';
import { LessonContentSinglePage } from './LessonContentSinglePage';
// import Diagram from '../diagram/Diagram';

// const { Diagram } = Fig;

class SimpleLesson {
  content: LessonContentSinglePage;

  constructor(content: Object) {
    this.content = content;
  }

  initialize() {
    this.content.initialize();
  }
}

export default SimpleLesson;
