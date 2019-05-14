// @flow
// import Fig from 'figureone';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../../details';
import version from '../version';
// import TriangleAreaCollection from '../common/diagramCollectionTri';

// const { Transform } = Fig;

export default class QRAbstraction extends PopupBoxCollection {
  constructor(
    diagram: Object,
    // transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
    );
    this.hasTouchableElements = true;

    const modifiers = {};

    this.setTitle('Abstraction');
    this.setDescription([
      '|Abstraction| is the process of simplifying and generalizing something like an object or phenomenon.',
      'Making something more |simple| makes it easier to analyze. Making something more |general| means the analysis can be applied to other situations.',
      'Making something more simple and general, is similar to drawing out the essence of that thing. Accordingly, the word |abstract| comes from the Latin word |abstractus| which means "drawn away".',
    ], modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'top', ySize: 0, xSize: 0 });
    super.show();
  }
}

function attachQuickReference() {
  if (window.quickReference == null) {
    window.quickReference = {};
  }
  if (window.quickReference[details.details.uid] == null) {
    window.quickReference[details.details.uid] = {};
  }
  window.quickReference[details.details.uid][version.details.uid] = {
    Abstraction: QRAbstraction,
  };
}

attachQuickReference();
