// @flow
// import Fig from 'figureone';
import diagramLayout from './layout';
import { attachQuickReference } from '../../../../../../js/tools/misc';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../common/DiagramCollectionPopup';
import details from '../../details';
import version from './version';

const topicUID = details.uid;
const versionUID = version.uid;

export default class QRAbstraction extends PopupBoxCollection {
  constructor(
    diagram: Object,
  ) {
    const layout = diagramLayout();
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
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0 });
    super.show();
  }
}

attachQuickReference(details.path, topicUID, versionUID, {
  Abstraction: QRAbstraction,
});
