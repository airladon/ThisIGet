// @flow
// import Fig from 'figureone';
import lessonLayout from './layout';
import { attachQuickReference } from '../../../../../../js/tools/misc';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';

const lessonUID = require.resolve('../../details').split('/').slice(-2, -1)[0];
const versionUID = require.resolve('./version').split('/').slice(-2, -1)[0];

export default class QRAbstraction extends PopupBoxCollection {
  constructor(
    diagram: Object,
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
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'top', ySize: 0, xSize: 0 });
    super.show();
  }
}

attachQuickReference(lessonUID, versionUID, {
  Abstraction: QRAbstraction,
});