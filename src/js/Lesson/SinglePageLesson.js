// @flow
// import Fig from 'figureone';
import SimpleLesson from './SimpleLesson';
import SinglePageLessonContent from './SinglePageLessonContent';
// import { PresentationLessonContent } from './PresentationLessonContent';
// import Diagram from '../diagram/Diagram';

// const { Diagram } = Fig;

class SinglePageLesson extends SimpleLesson {
  content: SinglePageLessonContent;

  constructor(content: Object) {
    super(content);
    this.type = 'singlePageLesson';
    // this.content = content;
  }

  initialize() {
    this.content.initialize();
  }
}

export default SinglePageLesson;
