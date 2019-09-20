// @flow
// import Fig from 'figureone';
// import SimpleFormatContent from './SimpleFormatContent';
// import { PresentationFormatContent } from './PresentationFormatContent';
// import Diagram from '../diagram/Diagram';

// const { Diagram } = Fig;

class SimpleFormat {
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

export default SimpleFormat;
