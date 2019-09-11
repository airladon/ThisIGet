// @flow
import SimpleFormat from './SimpleFormat';
// import Fig from 'figureone';
// import SimpleFormatContent from './SimpleFormatContent';
// import { PresentationFormatContent } from './PresentationFormatContent';
// import Diagram from '../diagram/Diagram';

// const { Diagram } = Fig;

class LinksFormat extends SimpleFormat {
  constructor(content: Object) {
    super(content);
    this.type = 'links';
  }
}

export default LinksFormat;
