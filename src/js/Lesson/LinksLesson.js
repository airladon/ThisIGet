// @flow
import SimpleLesson from './SimpleLesson';
// import Fig from 'figureone';
// import SimpleLessonContent from './SimpleLessonContent';
// import { PresentationLessonContent } from './PresentationLessonContent';
// import Diagram from '../diagram/Diagram';

// const { Diagram } = Fig;

class LinksLesson extends SimpleLesson {
  constructor(content: Object) {
    super(content);
    this.type = 'links';
  }
}

export default LinksLesson;
