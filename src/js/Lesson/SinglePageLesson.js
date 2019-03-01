// @flow
import Fig from 'figureone';
import SimpleLesson from './SimpleLesson';
import SinglePageLessonContent from './SinglePageLessonContent';
// import { PresentationLessonContent } from './PresentationLessonContent';

const { Diagram } = Fig;

class SinglePageLesson extends SimpleLesson {
  content: SinglePageLessonContent;
  diagram: Diagram | null;

  constructor(content: Object) {
    super(content);
    this.type = 'singlePage';
    this.diagram = null;
    // this.content = content;
  }

  // renderDiagrams() {
  //   const { diagram } = this;
  //   if (diagram) {
  //     diagram.animateNextFrame();
  //   }
  // }

  closeDiagram() {
    const { diagram } = this;
    if (diagram) {
      diagram.destroy();
    }
    this.diagram = null;
  }

  initialize() {
    this.closeDiagram();
    super.initialize();
    this.diagram = this.content.diagram;
    this.diagram.lesson = this;
  }
}

export default SinglePageLesson;
