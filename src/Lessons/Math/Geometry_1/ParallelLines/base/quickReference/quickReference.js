// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../../details';
import version from '../version';
import CommonCollection from '../common/diagramCollectionCommon';

const { Transform, Rect } = Fig;
// const {
//   click,
//   highlight,
//   clickWord,
// } = Fig.tools.html;

export default class QRBoilerplate extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
      transform,
      'collection',
      CommonCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {};
    this.setTitle('');
    this.setDescription('Lines are |parallel| if they have the |same rotation| and |do not touch|. Therefore, the lines cannot be on top of each other, and if extended to an infinite length, would never cross.', modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'top', ySize: 0.5 });
    super.show();
    const coll = this._collection;
    coll.showAll();
    coll._line1.setScenario('center');
    coll._line2.setScenario('center');
    coll._line1.setLength(3);
    coll._line2.setLength(3);
    this.transformToQRWindow(coll, new Rect(-2, -0.6, 4, 1.6));
    this.diagram.animateNextFrame();
  }
}

function attachQuickReference1() {
  if (window.quickReference == null) {
    window.quickReference = {};
  }
  if (window.quickReference[details.details.uid] == null) {
    window.quickReference[details.details.uid] = {};
  }
  window.quickReference[details.details.uid][version.details.uid] = {
    Main: QRBoilerplate,
    // QR2: QRBoilerplate2,
  };
}

attachQuickReference1();

