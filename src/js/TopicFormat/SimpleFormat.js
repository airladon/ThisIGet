// @flow
import Fig from 'figureone';
// import SimpleFormatContent from './SimpleFormatContent';
// import { PresentationFormatContent } from './PresentationFormatContent';
const { FunctionMap } = Fig;

// const { Diagram } = Fig;

class SimpleFormat {
  content: Object;
  type: 'simple' | 'singlePage' | 'presentation' | 'links';
  fnMap: FunctionMap;

  constructor(content: Object) {
    this.content = content;
    this.type = 'simple';
    this.fnMap = new FunctionMap();
  }

  initialize() {
    this.content.initialize();
  }
}

export default SimpleFormat;
