// @flow
import Fig from 'figureone';
import SimpleFormat from './SimpleFormat';
import { SinglePageFormatContent } from './SinglePageFormatContent';
// import { PresentationFormatContent } from './PresentationFormatContent';

const { Diagram } = Fig;

class SinglePageFormat extends SimpleFormat {
  content: SinglePageFormatContent;
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

export default SinglePageFormat;
